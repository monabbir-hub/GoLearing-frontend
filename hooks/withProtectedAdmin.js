import { useRouter } from 'next/router'
import { useAuth } from '../providers/AuthProvider'

const withProtectedAdmin = (Component) => {
  const Auth = () => {
    // Login data added to props via redux-store (or use react context for example)
    const auth = useAuth()
    const { replace } = useRouter()

    // If user is not logged in, return login component
    if (!auth?.admin?._id) {
      return replace('/admin')
    }

    // If user is logged in, return original component
    return <Component />
  }

  return Auth
}

export default withProtectedAdmin
