// import { parseCookies } from 'nookies'
import axios from 'axios'
import Link from 'next/link'
import React from 'react'

const SingleCourses = ({ videos }) => {
  const [videoId, setVideoId] = React.useState(
    videos.length ? videos[0].video_url : ''
  )

  return (
    <React.Fragment>
      <div className='ptb-100'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-3'>
              <div className='course-video-list'>
                {videos.length ? (
                  videos.map((video) => (
                    <div key={video.id}>
                      <Link
                        href='/my-courses/[videos]/[id]'
                        as={`/my-courses/${video.course.id}/${video.id}`}
                      >
                        <a
                          onClick={(e) => {
                            e.preventDefault()
                            setVideoId(video.video_url)
                          }}
                        >
                          <img
                            src={video.course.profilePhoto}
                            alt={video.course.title}
                          />
                          <h4>{video.name}</h4>
                        </a>
                      </Link>
                    </div>
                  ))
                ) : (
                  <h3>No Videos</h3>
                )}
              </div>
            </div>

            <div className='col-lg-9'>
              <div className='course-video-iframe'>
                <video key={videoId} controls>
                  <source src={videoId} type='video/mp4' />
                  <source src='/images/courses/courses5.jpg' type='video/ogg' />
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

SingleCourses.getInitialProps = async (ctx) => {
  const { token } = parseCookies(ctx)
  if (!token) {
    return { videos: [] }
  }

  const { id } = ctx.query

  const payload = {
    headers: { Authorization: token },
    params: { courseId: id },
  }

  const url = `${process?.env}/api/v1/courses/enrolled/videos`
  const response = await axios.get(url, payload)

  return response.data
}

export default SingleCourses
