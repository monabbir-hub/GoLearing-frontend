import React, { useEffect } from 'react'
import { TiArrowBack, TiArrowForward } from 'react-icons/ti'
import { useCourseDetails } from '../../providers/CourseDetails'
import Quiz from './Quiz'
import Resource from './Resource'
import Videos from './Videos'

const RightSide = () => {
  const bar = useCourseDetails()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [bar])
  // const handleNext = () => {
  //   const arr = bar?.dataForNextAndPrevious
  //   for (let i = 0; i <= arr.length; i++) {
  //     if (arr[i]?._id === bar?.activeBar?._id) {

  //       if (
  //         arr[i + 1]?.public_to_access === true ||
  //         bar?.courseDetails?.have_full_access === true
  //       ) {
  //         bar.setActiveBar(arr[i + 1])

  //       }
  //     }
  //   }
  // }

  // const handlePrevious = () => {
  //   const arr = bar?.dataForNextAndPrevious
  //   for (let i = 0; i <= arr.length; i++) {
  //     if (arr[i]?._id === bar?.activeBar?._id) {

  //       if (
  //         arr[i - 1]?.public_to_access === true ||
  //         bar?.courseDetails?.have_full_access === true
  //       ) {
  //         bar.setActiveBar(arr[i - 1])

  //       }

  //     }
  //   }
  // }
  const handleClick = (type) => {
    const arr = bar?.dataForNextAndPrevious
    for (let i = 0; i <= arr.length; i++) {
      if (arr[i]?._id === bar?.activeBar?._id) {
        if (
          type === 'previous' &&
          (arr[i - 1]?.public_to_access === true ||
            bar?.courseDetails?.have_full_access === true)
        ) {
          bar.setActiveBar(arr[i - 1])
        } else if (
          type === 'next' &&
          (arr[i + 1]?.public_to_access === true ||
            bar?.courseDetails?.have_full_access === true)
        ) {
          bar.setActiveBar(arr[i + 1])
        }
      }
    }
  }

  return (
    <div>
      {bar?.activeBar?._id && (
        <div className='d-flex justify-content-between align-items-center mb-5'>
          <button
            className='px-4 custom-btn d-flex justify-content-center align-items-center '
            style={{ width: '9rem' }}
            onClick={() => handleClick('previous')}
          >
            <TiArrowBack style={{ height: '1.5rem', width: '1.5rem' }} />
            <span className='ms-1'>Previous</span>
          </button>
          <button
            className='px-4 custom-btn  d-flex justify-content-center align-items-center'
            style={{ width: '9rem' }}
            onClick={() => handleClick('next')}
          >
            <span className='me-1'>Next</span>
            <TiArrowForward style={{ height: '1.5rem', width: '1.5rem' }} />
          </button>
        </div>
      )}
      {bar?.activeBar?.content_type === 'lecture' ? (
        <Videos />
      ) : bar?.activeBar?.content_type === 'resource' ? (
        <Resource />
      ) : bar?.activeBar?.content_type === 'quiz' ? ( //updated from quiz_attempt to quiz
        <Quiz />
      ) : bar?.activeBar?.content_type === 'quiz_attempt' ? (
        <Quiz />
      ) : (
        <h3 className='text-muted text-center my-5'>please select a content</h3>
      )}
    </div>
  )
}

export default RightSide
