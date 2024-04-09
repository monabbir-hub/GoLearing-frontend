import React from 'react'
import { BsArrowDownCircle } from 'react-icons/bs'
import { useCourseDetails } from '../../providers/CourseDetails'

export default function Resource() {
  const activeBar = useCourseDetails()
  const resources = activeBar?.activeBar

  function createMarkup() {
    return { __html: resources?.description }
  }

  return (
    <div className='ptb-100'>
      <h1 className='fw-bold mb-3'>{resources?.title}</h1>
      <h4 className='fw-bold mb-3'>Resource Description</h4>
      <p
        className='mb-5'
        dangerouslySetInnerHTML={createMarkup()}
        style={{
          whiteSpace: 'wrap',
          overflow: 'visible',
          textOverflow: 'ellipsis',
          wordBreak: 'break-all',
        }}
      />
      {/* <ReadOnly className='mb-5' dataa={resources?.description} /> */}

      <h4 className='fw-bold my-3'>Files</h4>
      <div>
        {resources?.link.map((r, idx) => (
          <a
            key={idx}
            href={r?.link}
            target='_blank'
            className=' my-2 px-5 py-3 d-flex justify-content-between align-items-center'
            style={{
              backgroundColor: '#FAFAFA',
              borderRadius: '4px',
              maxWidth: '30rem',
              border: '1px solid #DDDDDD',
            }}
          >
            <strong>{r?.name}</strong>{' '}
            <BsArrowDownCircle style={{ width: '25px', height: '25px' }} />
          </a>
        ))}
      </div>
    </div>
  )
}
