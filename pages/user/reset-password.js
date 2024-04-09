import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import { Spinner } from 'react-bootstrap'
import Footer from '../../components/_App/Footer'
import Navbar from '../../components/_App/Navbar'
import { ForgotPassGotOtp, SetForgotPassEnd } from '../../utils/EndPoints'
import Toast from '../../utils/Toast'

const ResetPassword = () => {
  const [email, setEmail] = React.useState('')
  const [showSentOtpBlock, setShowSentOTpBlock] = React.useState(true)
  const [spinner, setSpinner] = React.useState(false)
  const [updateSpinner, setUpdateSpinner] = React.useState(false)

  const [newPass, setNewPass] = React.useState({
    otp: '',
    password: '',
  })

  const router = useRouter()

  const sentForgotOTP = async (e) => {
    e.preventDefault()
    setSpinner(true)
    try {
      const res = await axios.put(ForgotPassGotOtp, {
        email: email,
      })
      if (res?.status === 200) {
        Toast('success', 'Success! Please Check your email.')
        setShowSentOTpBlock(false)
        setSpinner(false)
      } else
        throw new Error(res?.data?.msg || res?.data?.msg || 'Try again later')
    } catch (error) {
      Toast('err', error?.response?.data?.msg || 'Try again later')
      setSpinner(false)
    }
  }

  const requestForSetNewPass = async (e) => {
    e.preventDefault()
    setUpdateSpinner(true)
    try {
      const res = await axios.put(SetForgotPassEnd, {
        email: email,
        otp: newPass?.otp,
        password: newPass?.password,
      })
      if (res?.status === 200) {
        Toast('success', 'Success! Password Updated')
        setUpdateSpinner(false)
        setNewPass({
          otp: '',
          password: '',
        })
        setEmail('')
        router.push('/profile-authentication')
      } else
        throw new Error(res?.data?.msg || res?.data?.msg || 'Try again later')
    } catch (error) {
      Toast('err', error?.response?.data?.msg || 'Try again later')
      setUpdateSpinner(false)
    }
  }

  return (
    <React.Fragment>
      <Navbar />

      <div className='ptb-100'>
        <div className='container'>
          <div className='border-box'>
            <h3 className='fw-bold mb-3'>Reset Password</h3>
            {showSentOtpBlock ? (
              <form onSubmit={sentForgotOTP}>
                <div className='form-group'>
                  <label>Enter Email</label>
                  <input
                    type='email'
                    className='form-control'
                    value={email}
                    id='email'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button
                  type='submit'
                  className='default-btn mt-10 d-flex justify-content-center align-items-center'
                >
                  Send OTP {spinner && <Spinner animation='border' size='sm' />}
                </button>
              </form>
            ) : (
              <form onSubmit={requestForSetNewPass}>
                <div className='form-group'>
                  <label>OTP</label>
                  <input
                    type='text'
                    className='form-control'
                    value={newPass?.otp}
                    onChange={(e) =>
                      setNewPass({ ...newPass, otp: e.target.value })
                    }
                  />
                </div>

                <div className='form-group'>
                  <label>Reset Password</label>
                  <input
                    type='password'
                    className='form-control'
                    value={newPass?.password}
                    onChange={(e) =>
                      setNewPass({ ...newPass, password: e.target.value })
                    }
                  />
                </div>

                <button
                  type='submit'
                  className='fw-bold px-5 btn btn-danger mt-10 d-flex justify-content-center align-items-center'
                >
                  Update{' '}
                  {updateSpinner && <Spinner animation='border' size='sm' />}
                  <span></span>
                </button>
              </form>
            )}
            {!showSentOtpBlock && (
              <button
                className='fw-bold px-5 btn btn-danger mt-10 d-flex justify-content-center align-items-center'
                onClick={(e) => sentForgotOTP(e)}
              >
                Re-request for new otp
                <span></span>
              </button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </React.Fragment>
  )
}

export default ResetPassword
