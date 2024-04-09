import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { FcGoogle } from 'react-icons/fc'
import {
  GetStudentProfileEnd,
  StudentSignInWithGoogle,
  StudentSignUpEnd,
} from '../../utils/EndPoints'
import Toast from '../../utils/Toast'
import {useAuth} from "../../providers/AuthProvider";

const RegisterForm = () => {
  const router = useRouter()

  const [authValue, setAuthValue] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [spinner, setSpinner] = useState(false)
  const auth = useAuth()
  // const [adBlock, setAdBlock] = useState(false)
  // let adBlockEnabled = false

  // useEffect(() => {
  //   detectAdBlock()
  // }, [])

  // async function detectAdBlock() {
  //   const googleAdUrl =
  //     'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
  //   try {
  //     await fetch(new Request(googleAdUrl)).catch((_) => {
  //       setAdBlock(true)
  //       adBlockEnabled = true
  //     })
  //   } catch (e) {
  //     setAdBlock(true)
  //     adBlockEnabled = true
  //   } finally {
  //     adBlockEnabled &&
  //       Swal.fire({
  //         icon: 'error',
  //         title: ' Ad Blocker! ',
  //         text: 'Please stop Ad Blocker and reload page again to authenticate.',
  //         showConfirmButton: false,
  //         allowOutsideClick: true,
  //       })
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (authValue.name === '') {
      Toast('err', 'Please enter your name to sign up')
      return
    }
    if (authValue.email === '') {
      Toast('err', 'Please enter your email to sign up')
      return
    }
    if (authValue?.password === '') {
      Toast('err', 'Please enter your password to sign up')
      return
    }
    if (authValue?.password.length < 5) {
      Toast('err', 'Minimum password length is 5 characters')
      return
    }

    setSpinner(true)
    try {
      const response = await axios.post(StudentSignUpEnd, {
        name: authValue?.name,
        email: authValue?.email,
        password: authValue?.password,
      })

      if (response.status === 200) {
     
        Toast('success', 'Successfully Signed Up. Login to continue');
        setSpinner(false);
        /*
        localStorage.setItem(
            'x-access-token',
            response?.data['x-access-token']
        )
        */



        setAuthValue({
          name: '',
          email: '',
          password: '',
        })


        //router.push('/')
        router.replace(router?.pathname)

      } else {
        throw new Error(
          response?.data?.msg || ' Something went wrong! Try again later.'
        )
      }
    } catch (error) {

      setSpinner(false)
      Toast(
        'err',
        error.response?.data?.msg || 'Something went wrong! Try again later.'
      )
      setAuthValue({
        name: '',
        email: '',
        password: '',
      })
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
    <div className='register-form'>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Name</label>
          <input
            type='text'
            className='form-control'
            placeholder='Display Name'
            value={authValue?.name}
            onChange={(e) =>
              setAuthValue({ ...authValue, name: e.target.value })
            }
          />
        </div>

        <div className='form-group'>
          <label>Email</label>
          <input
            type='email'
            className='form-control'
            placeholder=' Email'
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

        <p className='description'>
          The password should be at least five characters long. To make it
          stronger, use upper and lower case letters, numbers, and symbols like
          ! " ? $ % ^ & )
        </p>

        <button
          type='submit'
          // disabled={adBlock ? true : false}
          // style={{ cursor: adBlock ? 'not-allowed' : 'pointer' }}
        >
          Register {spinner && <Spinner animation='border' size='sm' />}
        </button>
      </form>
      <a
        className='w-100 mt-3 custom-login-btn'
        href={StudentSignInWithGoogle}
        // style={{
        //   pointerEvents: adBlock ? 'none' : 'auto',
        //   cursor: adBlock ? 'not-allowed' : 'pointer',
        // }}
      >
        {' '}
        <FcGoogle
          style={{ height: '2rem', width: '2rem', marginRight: '5px' }}
        />
        Sign up with Google
      </a>
      {/* <a
        className='w-100 my-2 custom-login-btn'
        href={StudentSignInWithFacebook}
      >
        <IoLogoFacebook
          style={{ height: '2rem', width: '2rem', marginRight: '5px' }}
        />
        Sign up with Facebook{' '}
      </a> */}
    </div>
  )
}

export default RegisterForm
