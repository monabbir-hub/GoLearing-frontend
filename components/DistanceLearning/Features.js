import React from 'react'
import Link from 'next/link'

const Features = () => {
  return (
    <div className='boxes-area bg-f5f7fa'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-4 col-sm-6 col-md-6'>
            <div
              className='single-box-item '
              style={{ backgroundColor: '#ebebeb' }}
            >
              <div className='icon'>
                <i className='flaticon-brain-process'></i>
                <img src='/images/icon-shape.png' alt='image' />
              </div>
              <h3>Achieve Your Dreams</h3>
              <p>
                Lorem ipsum dolor sit amet, consecteur adipiscing elit, sed do
                eiusmod tempor.
              </p>

              {/* <Link href="/membership-levels">
                                <a className="link-btn">Start Now!</a>
                            </Link> */}
            </div>
          </div>

          <div className='col-lg-4 col-sm-6 col-md-6'>
            <div
              className='single-box-item'
              style={{ backgroundColor: '#ebebeb' }}
            >
              <div className='icon'>
                <i className='flaticon-computer'></i>
                <img src='/images/icon-shape.png' alt='image' />
              </div>
              <h3>Go at Your Full Pace</h3>
              <p>
                Lorem ipsum dolor sit amet, consecteur adipiscing elit, sed do
                eiusmod tempor.
              </p>

              {/* <Link href="/membership-levels">
                                <a className="link-btn">Start Now!</a>
                            </Link> */}
            </div>
          </div>

          <div className='col-lg-4 col-md-6 col-sm-6 offset-lg-0 offset-md-3 offset-sm-3'>
            <div
              className='single-box-item'
              style={{ backgroundColor: '#ebebeb' }}
            >
              <div className='icon'>
                <i className='flaticon-shield-1'></i>
                <img src='/images/icon-shape.png' alt='image' />
              </div>
              <h3>Learn from Experts</h3>
              <p>
                Lorem ipsum dolor sit amet, consecteur adipiscing elit, sed do
                eiusmod tempor.
              </p>

              {/* <Link href="/membership-levels">
                                <a className="link-btn">Start Now!</a>
                            </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Features
