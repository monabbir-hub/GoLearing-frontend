import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAuth } from '../../providers/AuthProvider'
import { GetStudentProfileEnd, TokenizeSignIn } from '../../utils/EndPoints'
import getBrowserToken from '../../utils/getBrowserToken'
import Toast from '../../utils/Toast'

const Tokenize = () => {
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    const setup = async () => {
      if (router?.query?.id !== undefined) {
        tokenizeSignIn(router?.query?.id)
      }
    }
    setup()
  }, [router?.query?.id])

  const tokenizeSignIn = async (oneTimeToken) => {
    let browserToken
    let tokenFromLocalStorage = localStorage.getItem('browserToken')

    try {
      browserToken = await getBrowserToken()
    } catch (error) {
      if (
        browserToken === null ||
        browserToken === undefined ||
        !browserToken
      ) {
        if (
          tokenFromLocalStorage === null ||
          tokenFromLocalStorage === undefined
        ) {
          browserToken = await makeid()
          localStorage.setItem('browserToken', browserToken)
        }
      }
    }

    try {
      const res = await axios.post(TokenizeSignIn, {
        onetime_token: oneTimeToken,
        fingerprint_token: browserToken || tokenFromLocalStorage,
      })
      if (res.status == 200) {
        const token = res?.data['x-access-token']
        localStorage.setItem('x-access-token', token)
        getUserInfo(token)
        router.push('/')
      } else {
        throw new Error(response?.data?.msg)
      }
    } catch (error) {
      Toast(
        'err',
        error.response?.data?.msg || 'Something went wrong, Please try again'
      )
      router.push('/profile-authentication')
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
        auth.setUser(response.data.data)
        Toast('success', 'Successfully Logged In')
      } else throw new Error(response?.data?.msg)
    } catch (error) {
      Toast(
        'err',
        error.response?.data?.msg || 'Something went wrong, Please try again'
      )
      router.push('/profile-authentication')
    }
  }
  return <div></div>
}

export default Tokenize
