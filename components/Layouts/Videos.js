import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import ReactPlayer from 'react-player'
import { http2 } from '../../lib/axios'
import { useCourseDetails } from '../../providers/CourseDetails'
import { GetLectureEndNew } from '../../utils/EndPoints'

export default function Videos() {
  const activeBar = useCourseDetails()

  const [lecture, setLecture] = useState([
    {
      link: '',
    },
  ])
  const [videoLink, setVideoLink] = useState('')

  const [spinner, setSpinner] = useState(false)
  const playerRef = React.useRef()

  useEffect(() => {
    const token = localStorage.getItem('x-access-token')
    getLecture(token)
  }, [activeBar])

  const getLecture = async (token) => {
    setSpinner(true)
    try {
      await http2
        .get(GetLectureEndNew + `?_id=${activeBar?.activeBar?._id}`, {
          headers: {
            'x-access-token': token,
          },
        })
        .then((d) => {
          setLecture(d?.data?.data[0])
          setVideoLink(d?.data?.data[0].link)
          setSpinner(false)
        })
    } catch (error) {
      setSpinner(false)
    }
  }

  function createMarkup() {
    return { __html: lecture?.description }
  }

  const handleTimeStamp = (time) => {
    const min = time.split(':')[0]
    const sec = time.split(':')[1]

    if (lecture?.link.includes('vimeo')) {
      playerRef.current?.seekTo(parseInt(min) * 60 + parseInt(sec), 'seconds')
    } else {
      const newLink = lecture?.link + `?t=${parseInt(min) * 60 + parseInt(sec)}`
      setVideoLink(newLink)
    }
  }

  return (
    <>
      {spinner && (
        <div className='text-center my-md-5 my-3'>
          <Spinner animation='border' />
        </div>
      )}

      {!spinner && (
        <div>
          <h1 className='fw-bold mb-3'>{lecture?.title}</h1>
          {lecture?.link && (
            // <Vimeo
            //   video={`${lecture?.link}`}
            //   autoplay
            //   speed
            //   dnt={true}
            //   style={{ width: '100%' }}
            // />

            <div>
              <div
                style={{
                  height: '5rem',
                  width: '100%',
                  backgroundColor: 'transparent',
                  position: 'relative',
                  top: '5rem',
                  zIndex: '50',
                }}
              ></div>
              <ReactPlayer
                ref={playerRef}
                url={videoLink}
                playing={true}
                // onReady={onReady}
                controls={true}
                // playing={true}
                // light={true}
                width={'100%'}
                height='30rem'
              />
            </div>
          )}
          <h1 className='fw-bold mt-5'>Video Description</h1>
          <div
            dangerouslySetInnerHTML={createMarkup()}
            style={{
              whiteSpace: 'wrap',
              overflow: 'visible',
              textOverflow: 'ellipsis',
              wordBreak: 'break-all',
            }}
          />
          {/* <ReadOnly dataa={lecture?.description} /> */}

          <h1 className='fw-bold mt-4'>Time Stamps</h1>
          <ul className=''>
            {lecture?.time_stamp?.map((stamp, idx) => (
              <li
                key={idx}
                className='stamp-li-item d-inline mb-5'
                onClick={() => handleTimeStamp(stamp?.time)}
              >
                <span>{stamp?.time}</span> {'   -   '}
                <span>{stamp?.title}</span> <br />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
