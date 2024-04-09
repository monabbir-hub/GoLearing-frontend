import React from 'react'
import EditUserProfile from '../../components/EditUserProfile'
import Footer from '../../components/_App/Footer'
import Navbar from '../../components/_App/Navbar'
import withProtected from '../../hooks/withProtected'

const EditProfile = () => {
  return (
    <div>
      <Navbar />
      <div className='container my-5'>
        <EditUserProfile />
      </div>
      <Footer />
    </div>
  )
}

export default withProtected(EditProfile)
