/** @type {import('../../').Middleware} */
export default (ctx) => {
  const { github_user, csrf } = ctx.session
  ctx.body = /** @type {Auth} */ ({
    github_user: github_user ? {
      login: github_user.login,
      name: github_user.name,
      avatar_url: github_user.avatar_url,
      html_url: github_user.html_url,
    }: undefined,
    csrf,
  })
}

export const middleware = ['cors', 'session']

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../').Auth} Auth
 */