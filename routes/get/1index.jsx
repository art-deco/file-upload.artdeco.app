/**
 * @type {import('../../').Middleware}
 */
export default async function index(ctx, next) {
  ctx.body = 'test'
  await next()
}

export const aliases = ['/']