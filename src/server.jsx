import idio from '@idio/idio'
import { sync } from 'uid-safe'
import render from '@depack/render'
import { unlinkSync, createReadStream } from 'fs'
import initRoutes, { watchRoutes } from '@idio/router'
import github from '@idio/github'
import cleanStack from '@artdeco/clean-stack'
import { join } from 'path'
import DefaultLayout from '../layout'

const {
  NODE_ENV,
  HOST = 'https://file-upload.artdeco.app',
  FRONT_END = 'https://file-upload.artdeco.app',
  STATIC = 'https://art-deco.github.io/file-upload.artdeco.app',
  CLOSURE, // for /comments page
  SESSION_KEY,
} = process.env
const PROD = NODE_ENV == 'production'

/**
 * Starts the server.
 */
export default async function Server({
  port, appName, watch = !PROD, GITHUB_ID, GITHUB_SECRET,
}) {
  const { app, url, middleware, router } = await idio({
    cors: {
      use: true,
      origin: PROD && [FRONT_END, HOST],
      credentials: true,
    },
    compress: { use: true },
    form: {
      dest: 'upload',
    },
    frontend: { use: true },
    static: [{ use: PROD || CLOSURE, root: 'docs' }, {
      use: true,
      root: 'upload',
    }],
    session: { keys: [SESSION_KEY] },
    forms: {
      middlewareConstructor() {
        return async (ctx, next) => {
          const f = middleware.form.any()
          await f(ctx, next)
        }
      },
    },
    csrf: { middlewareConstructor() {
      return async (ctx, next) => {
        const { session } = ctx
        if (!session) throw new Error('!Session does not exist.')
        const { csrf } = session
        if (!csrf) {
          ctx.body = { error: '!Not signed in' }
          ctx.status = 400
          return
        }
        const { csrf: c } = ctx.request.body
        if (csrf != c) {
          ctx.body = { error: '!Invalid csrf token.' }
          ctx.status = 401
          return
        }
        await next()
      }
    } },

    async jsonErrors(ctx, next) {
      try {
        await next()
      } catch (err) {
        if (err.message.startsWith('!')) {
          ctx.body = { error: err.message.replace('!', '') }
          console.log(err.message)
        } else {
          ctx.body = { error: 'internal server error' }
          err.stack = cleanStack(err.stack)
          app.emit('error', err)
        }
      }
    },
  }, { port })

  Object.assign(app.context, {
    PROD,
    prod: PROD,
    HOST: PROD ? HOST : url,
    STATIC_HOST: PROD ? STATIC : url,
    CLOSURE: PROD || CLOSURE,
    appName,
    render: (vnode, props = {}, Layout = DefaultLayout) => {
      return render(<Layout {...props}>
        {vnode}
      </Layout>, {
        addDoctype: true,
        pretty: true,
      })
    },
  })

  if (CLOSURE)
    console.log('Testing Closure bundle: %s', 'docs/index.js')

  router.post('/upload',
    middleware.session,
    (ctx, next) => {
      if (!ctx.session.github_user) throw new Error('!Authorisation required.')
      return next()
    },
    (ctx, next) => middleware.form.single('image')(ctx, next),
    async (ctx) => {
      ctx.body = {
        photoId: sync(18),
        success: 1,
        result: `/upload/${ctx.file.filename}`,
      }
    })
  // demo: remove pictures after serving once
  router.get('/upload/:filename', (ctx) => {
    const file = join('upload', ctx.params.filename)
    ctx.body = createReadStream(file)
    ctx.body.on('end', () => {
      unlinkSync(file)
    })
  })

  router.post('/save',
    (ctx, next) => middleware.form.none()(ctx, next),
    (ctx) => {
      ctx.body = { data: ctx.request.body.photos }
    })

  const w = await initRoutes(router, 'routes', {
    middleware,
  })

  github(app, {
    session: middleware.session,
    client_id: GITHUB_ID,
    client_secret: GITHUB_SECRET,
    /**
     * @param {import('..').Context} ctx
     */
    async finish(ctx, token, scope, user) {
      ctx.session.github_token = token
      if (!user.login) throw new Error('Login is missing.')

      const u = {
        login: user.login,
        name: user.name,
        avatar_url: user.avatar_url,
        html_url: user.html_url,
      }
      ctx.session.github_user = u

      if (!ctx.session.csrf) ctx.session.csrf = sync(18)
      await ctx.session.manuallyCommit()
      ctx.redirect('/callback')
    },
  })

  if (watch) watchRoutes(w)
  app.use(router.routes())
  return { app, url }
}