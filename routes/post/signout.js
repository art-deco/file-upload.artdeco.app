/**
 * @type {import('../../').Middleware}
 */
export default (ctx) => {
  ctx.session = null
  ctx.body = { ok: 1 }
}

export const middleware = (route) =>
  ['cors', 'session', 'forms', 'csrfCheck', route]