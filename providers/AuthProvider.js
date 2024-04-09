import axios from 'axios'
import React, { createContext, useContext, useState } from 'react'
import { AdminProfileEnd, GetStudentProfileEnd } from '../utils/EndPoints'

const AuthContext = createContext({
  user: {},
  setUser: () => {},
  admin: { role: [] },
  setAdmin: () => {},
  previousPath: '',
  setPreviousPath: () => {},
})

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const [admin, setAdmin] = useState({
    role: [],
  })
  const [previousPath, setPreviousPath] = useState('')

  const [initializing, setInitializing] = useState(true)
  // const [browserToken, setBrowserToken] = useState('')

  const login = React.useCallback((u) => {
    setUser(u)
  }, [])

  const adminLogin = React.useCallback((u) => {
    setAdmin(u)
  }, [])

  const initializePreviousPath = React.useCallback((u) => {
    setPreviousPath(u)
  }, [])

  React.useEffect(() => {
    let token = localStorage.getItem('x-access-token')
    // if (!token) {
    //   token = localStorage.getItem('browserToken')
    // }
    if (token) {

      getUserInfo(token)

    } else {
      setUser({})
    }
  }, [])

  React.useEffect(() => {
    const adminToken = localStorage.getItem('go-learning-admin')
    if (adminToken) {
      getAdminInfo(adminToken).finally(() => {
        setInitializing(false)
      })
    } else {
      setAdmin({})
      setInitializing(false)
    }
  }, [])

  const getAdminInfo = async (token) => {
    try {
      const response = await axios.get(AdminProfileEnd, {
        headers: {
          'x-access-token': token,
        },
      })
      if (response.status === 200) {
        setAdmin(response.data.data)
        return Promise.resolve()
      } else {
        return Promise.reject(new Error(response?.data?.msg))
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const getUserInfo = async (token) => {
    try {
      const response = await axios.get(GetStudentProfileEnd, {
        headers: {
          'x-access-token': token,
        },
      })

      if (response.status === 200) {
        setUser(response.data.data)
      } else {
        console.log(response?.data?.msg);
      }
    } catch (error) {
    } finally {
      setInitializing(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: login,
        getUserInfo: getUserInfo,
        admin,
        setAdmin: adminLogin,
        initializing,
        previousPath,
        setPreviousPath: initializePreviousPath,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider
export const useAuth = () => useContext(AuthContext)
