import ProfileAuthentication from '../pages/profile-authentication'
import { useAuth } from '../providers/AuthProvider'

const withProtected = (Component) => {
  const Auth = () => {
    // Login data added to props via redux-store (or use react context for example)
    const auth = useAuth()

    // If user is not logged in, return login component
    if (!auth?.user?._id) {
      return <ProfileAuthentication />
    }

    // If user is logged in, return original component
    return <Component />
  }

  // Copy getInitial props so it will run as well
  // if (Component.getInitialProps) {
  //   Auth.getInitialProps = Component.getInitialProps
  // }

  return Auth
}

export default withProtected
