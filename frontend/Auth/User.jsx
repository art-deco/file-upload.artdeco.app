import { getUserData } from './lib'

const signOut = async (host, csrf, cb) => {
  const formData = new FormData()
  formData.append('csrf', csrf)

  try {
    const res = await fetch(`${host}/signout`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })
    const { error } = await res.json()
    if (error) cb(error)
    else cb()
  } catch (err) {
    cb(err.message)
  }
}

/**
 * @param {Object} opts
 * @param {Auth} opts.auth
 */
const User = ( { auth, onSignout = () => {}, host }) => {
  const { linkedin_user, github_user, csrf } = auth
  if (!linkedin_user && !github_user) return null

  const { picture, name } = getUserData(auth)

  return (<div>
    <img src={picture} width="50"/>
    Hello, {name}!{' '}
    <a href="#" onClick={(e) => {
      e.preventDefault()
      signOut(host, csrf, (err) => {
        if (err) alert(`Could not sign out: ${err}. Please refresh the page and try again. Alternatively, clear your cookies.`)
        else onSignout()
      })
      return false
    }}>Sign Out</a>
  </div>)
}

export default User

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../..').Auth} Auth
 */
