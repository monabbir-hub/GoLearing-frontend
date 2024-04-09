import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { FcGoogle } from 'react-icons/fc'
import Swal from 'sweetalert2'
import { useAuth } from '../../providers/AuthProvider'
import {
  GetStudentProfileEnd,
  StudentSignInEnd,
  StudentSignInWithGoogle,
} from '../../utils/EndPoints'
import getBrowserToken from '../../utils/getBrowserToken'
import Toast from '../../utils/Toast'

const LoginForm = () => {
  const router = useRouter()

  // useEffect(() => {
  //   const foo = isFacebookApp()

  //   if (foo) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Please open in Google Chrome or any web browser',
  //       text: `Please click on the three dots on your screen and then click on "Open in Browser"`,
  //       showConfirmButton: false,
  //       allowOutsideClick: foo ? false : true,
  //     })
  //   }
  // }, [])

  async function makeid() {
    var text = ''
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < 37; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length))

    return text
  }

  function isFacebookApp() {
    var ua = navigator.userAgent || navigator.vendor || window.opera
    return ua.indexOf('FBAN') > -1 || ua.indexOf('FBAV') > -1
  }

  const [authValue, setAuthValue] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [spinner, setSpinner] = useState(false)
  const auth = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (authValue.email === '') {
      Toast('err', 'Please enter your email')
      return
    }
    if (authValue.password === '') {
      Toast('err', 'Please enter your password')
      return
    }
    setSpinner(true)

    let browserToken = localStorage.getItem('browserToken')
    try {
      if (!browserToken) {
        browserToken = await getBrowserToken()
        localStorage.setItem('browserToken', browserToken)
      } else throw new Error()
    } catch (error) {
      if (
        browserToken === null ||
        browserToken === undefined ||
        !browserToken
      ) {
        browserToken = await makeid()
        localStorage.setItem('browserToken', browserToken)
      }
    }

    try {
      const response = await axios.post(StudentSignInEnd, {
        email: authValue.email,
        password: authValue.password,
        fingerprint_token: browserToken,
      })

      if (response.status === 200) {
        getUserInfo(response?.data['x-access-token'])
        localStorage.setItem(
          'x-access-token',
          response?.data['x-access-token']
        )

        Toast('success', 'Successfully logged in');
        setAuthValue({
          email: '',
          password: '',
          rememberMe: false,
        })
        setSpinner(false);
        if (router?.pathname === '/profile-authentication') {
          if (auth?.previousPath !== '') {
            router.back()
          } else {
            auth.setPreviousPath(router.pathname)
            router.push('/')
          }
        } else router.replace(router?.pathname)
      } else {
        throw new Error(
          response?.data?.msg || ' Something went wrong! Try again later.'
        )
      }
    } catch (error) {
      // localStorage.removeItem('browserToken')

      setSpinner(false)
      Toast(
        'err',
        error.response?.data?.msg || 'Something went wrong! Try again later.'
      )
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
      } else{
        //throw new Error(response?.data?.msg);

      }
    } catch (error) {
      Toast('err', error.response?.data?.msg)
    }
  }

  return (
    <div className='login-form'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label> Email</label>
          <input
            type='text'
            className='form-control'
            placeholder='enter your email'
            value={authValue?.email}
            onChange={(e) =>
              setAuthValue({ ...authValue, email: e.target.value })
            }
          />
        </div>

        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            className='form-control'
            placeholder='Password'
            value={authValue?.password}
            onChange={(e) =>
              setAuthValue({ ...authValue, password: e.target.value })
            }
          />
        </div>

        <div className='row align-items-center'>
          {/* <div className='col-lg-6 col-md-6 col-sm-6 remember-me-wrap'>
            <p>
              <input
                type='checkbox'
                id='test2'
                value={authValue.rememberMe}
                onChange={() =>
                  setAuthValue({
                    ...authValue,
                    rememberMe: !authValue?.rememberMe,
                  })
                }
              />
              <label htmlFor='test2'>Remember me</label>
            </p>
          </div> */}

          <div className=' lost-your-password-wrap'>
            <Link href='/user/reset-password'>
              <a className='lost-your-password'>Lost your password?</a>
            </Link>
          </div>
        </div>

        <button
          type='submit'
          // disabled={adBlock ? true : false}
          // style={{ cursor: adBlock ? 'not-allowed' : 'pointer' }}
        >
          Log In {spinner && <Spinner animation='border' size='sm' />}
        </button>

        <a
          className='w-100 mt-3 custom-login-btn'
          href={StudentSignInWithGoogle}
          // disabled={adBlock ? true : false}
          // style={{
          //   pointerEvents: adBlock ? 'none' : 'auto',
          //   cursor: adBlock ? 'not-allowed' : 'pointer',
          // }}
        >
          {' '}
          <FcGoogle
            style={{ height: '2rem', width: '2rem', marginRight: '5px' }}
          />
          Log in with Google
        </a>

        {/* <a
          className='w-100 my-2 custom-login-btn'
          href={StudentSignInWithFacebook}
        >
          <IoLogoFacebook
            style={{ height: '2rem', width: '2rem', marginRight: '5px' }}
          />
          Log in with Facebook{' '}
        </a> */}
      </form>

      {/* <p className='text-center mt-2 mb-0'>
        <strong>OR</strong>{' '}
      </p> */}
    </div>
  )
}

export default LoginForm
