import React from 'react'
import dynamic from 'next/dynamic'
import { GetStaticEnd } from '../../utils/EndPoints'
import axios from 'axios'
import Link from 'next/link'
import { useStatic } from '../../providers/StaticProvider'
import { useQuery } from 'react-query'
import { API } from '../../api'
const OwlCarousel = dynamic(import('react-owl-carousel3'))

const options = {
  loop: true,
  nav: false,
  dots: true,
  autoplayHoverPause: true,
  autoplay: true,
  margin: 30,
  navText: [
    "<i class='bx bx-chevron-left'></i>",
    "<i class='bx bx-chevron-right'></i>",
  ],
  responsive: {
    0: {
      items: 1,
    },
    576: {
      items: 1,
    },
    768: {
      items: 1,
    },
    1200: {
      items: 1,
    },
  },
}

const AnnouncementSlider = () => {
  const [display, setDisplay] = React.useState(false)
  const { data: miscData } = useQuery(
    [API.MISC.GET_STATIC.name],
    API.MISC.GET_STATIC
  )

  const staticData = useStatic()
  React.useEffect(() => {
    setDisplay(true)
  }, [])

  if (!miscData?.data?.announcement?.length) return null
  return (
    <div className='feedback-area bg-fffaf3 ptb-100'>
      <h1 className='text-dark fw-bold text-center pb-5'>Announcement</h1>

      <div className='container'>
        {display ? (
          <OwlCarousel
            className='feedback-slides-two owl-carousel owl-theme'
            {...options}
          >
            {miscData?.data?.announcement?.filter(Boolean).map((d, idx) => (
              <div key={idx}>
                <a href={d?.link} target='_blank'>
                  <div
                    className='single-feedback-box'
                    style={{ cursor: 'pointer' }}
                  >
                    <p>{d?.text}</p>
                    <div className='client-info d-flex align-items-center'>
                      <img
                        src={d?.photo || '/images/user1.jpg'}
                        className='rounded-circle'
                        alt='image'
                      />
                      <div className='title'>
                        <h3>{d?.title}</h3>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </OwlCarousel>
        ) : (
          ''
        )}
      </div>

      {/* <div className='divider2'></div> */}
      <div className='divider3'></div>
      <div className='shape2'>
        <img src='/images/shape2.png' alt='image' />
      </div>
      {/* <div className='shape3'>
        <img src='/images/shape3.png' alt='image' />
      </div> */}
      <div className='shape4'>
        <img src='/images/shape4.png' alt='image' />
      </div>
      {/* <div className="shape9">
                <img src="/images/shape8.svg" alt="image" />
            </div> */}
    </div>
  )
}

export default AnnouncementSlider
