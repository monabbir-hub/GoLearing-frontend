import axios from 'axios'
import React, { createContext, useContext, useState } from 'react'
import { GetStaticEnd } from '../utils/EndPoints'

const StaticContext = createContext({
  data: {},
  setData: () => {},
})

const StaticProvider = ({ children }) => {
  const [data, setData] = useState({})

  const staticData = React.useCallback((u) => {
    setData(u)
  }, [])

  React.useEffect(() => {
    getStaticData()
  }, [])

  const getStaticData = async () => {
    try {
      const res = await axios.get(GetStaticEnd, {
        headers: {
          'x-access-token': localStorage.getItem('x-access-token'),
        },
      })

      if (res.status === 200) {
        setData(res?.data)
      }
    } catch (error) {}
  }

  return (
    <StaticContext.Provider
      value={{
        data,
        setData: staticData,
      }}
    >
      {children}
    </StaticContext.Provider>
  )
}
export default StaticProvider
export const useStatic = () => useContext(StaticContext)
