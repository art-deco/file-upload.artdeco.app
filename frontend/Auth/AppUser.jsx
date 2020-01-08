import GitHub from '../social/GitHub'
import User from './User'

/**
 * @param {Object} props
 * @param {Auth} props.auth
 */
const AppUser = ({ error, loading, auth, onSignOut, host }) => {
  if (error)
    return (<div>Error: {error}</div>)
  if (loading)
    return (<div>Loading...</div>)
  // if (!auth.user)
  const loggedIn = auth.linkedin_user || auth.github_user
  return (<div>
    {!loggedIn && <span style="display:block">Please sign in / sign up.</span>}

    <User auth={auth} onSignout={onSignOut} host={host}/>

    {!auth.github_user && <GitHub host={host} />}

  </div>)
}

// {!auth.linkedin_user && <LinkedIn host={host}/>}
//     {!auth.linkedin_user && ' '}

export default AppUser