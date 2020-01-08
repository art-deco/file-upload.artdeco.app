import idio from '@idio/idio'
import render from '@depack/render'
import initRoutes, { watchRoutes } from '@idio/router'
import cleanStack from '@artdeco/clean-stack'
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
  port, appName, watch = !PROD,
}) {
  const { app, url, middleware, router } = await idio({
    cors: {
      use: true,
      origin: PROD && [FRONT_END, HOST, 'http://localhost:5001'],
      credentials: true,
    },
    compress: { use: true },
    form: {},
    frontend: {
      use: true,
    },
    static: { use: PROD, root: 'docs' },
    session: { keys: [SESSION_KEY] },

    async jsonErrors(ctx, next) {
      try {
        await next()
      } catch (err) {
        if (err.message.startsWith('!')) {
          ctx.body = { error: err.message.replace('!', '') }
          console.log(err.message)
        } else {
          ctx.body = { error: 'internal server error' }
          err.stack = cleanStack(err.stack, {
            // ignoredModules: ['koa-compose', 'koa-router', 'koa-session'],
          })
          app.emit('error', err)
        }
      }
    },
  }, { port })

  Object.assign(app.context, {
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

  const w = await initRoutes(router, 'routes', {
    middleware,
  })
  if (watch) watchRoutes(w)
  app.use(router.routes())
  return { app, url }
}