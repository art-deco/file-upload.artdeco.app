import idio from '@idio/idio'
import { sync } from 'uid-safe'
import render from '@depack/render'
import { unlinkSync, createReadStream } from 'fs'
import initRoutes, { watchRoutes } from '@idio/router'
import github from '@idio/github'
import cleanStack from '@artdeco/clean-stack'
import { join, parse } from 'path'
import DefaultLayout from '../layout'

const {
  NODE_ENV,
  HOST = 'https://file-upload.artdeco.app',
  FRONT_END = 'https://file-upload.artdeco.app',
  STATIC = 'https://art-deco.github.io/file-upload.artdeco.app',
  NEOLUDDITE,
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
  /* start example */
  const { app, url, middleware, router } = await idio({
    neoluddite: {
      key: NEOLUDDITE,
      env: process.env.NODE_ENV,
      app: appName,
    },
    cors: {
      origin: PROD && [FRONT_END, HOST],
      credentials: true,
    },
    compress: { use: true },
    form: {
      dest: 'upload',
    },
    frontend: { use: !PROD },
    static: [{ use: CLOSURE, root: 'docs' }, {
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
    csrfCheck: {},
    async jsonErrors(ctx, next) {
      try {
        await next()
      } catch (err) {
        if (err.statusCode && err.statusCode >= 400 && err.statusCode <= 500) {
          err.message = err.message.replace(/^([^!])/, '!$1')
        }
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
  /* end example */

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
    middleware.csrfCheck,
    async (ctx) => {
      const { ext } = parse(ctx.file.originalname)
      ctx.body = {
        photoId: sync(18),
        success: 1,
        result: `/upload/${ctx.file.filename}${ext}`,
      }
    })
  // demo: remove pictures after serving once
  router.get('/upload/:filename', (ctx) => {
    let { filename } = ctx.params
    const { name, ext } = parse(filename)
    const file = join('upload', name)
    ctx.type = ext
    ctx.body = createReadStream(file)
    ctx.body.on('end', () => {
      unlinkSync(file)
    })
  })
  router.post('/save',
    middleware.session,
    (ctx, next) => middleware.form.none()(ctx, next),
    middleware.csrfCheck,
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

      ctx.session.csrf = sync(18)
      await ctx.session.manuallyCommit()
      ctx.redirect('/callback')
    },
  })

  if (watch) watchRoutes(w)
  app.use(router.routes())
  return { app, url }
}