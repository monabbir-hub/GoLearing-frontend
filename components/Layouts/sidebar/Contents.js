import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { BiVideo } from 'react-icons/bi'
import { BsQuestionCircle } from 'react-icons/bs'
import { IoMdPaper } from 'react-icons/io'
import { useCourseDetails } from '../../../providers/CourseDetails'

export default function Content({ contents, id, access }) {
  const activeBar = useCourseDetails()

  const handleClick = (content) => {
    // toast.success('Content is loading...')
    activeBar.setActiveBar(content)
  }
  return (
    <>
      {contents.map((item, index) => {
        return (
          <div key={index}>
            <ListGroup
              style={{
                border: 'none',
                borderRadius: '0px',
              }}
            >
              <ListGroup.Item
                style={{
                  cursor: 'pointer',
                  borderTop: 'none',
                  borderRight: 'none',
                  borderLeft: 'none',
                  borderRadius: '0px',
                  borderBottom: contents.length - 1 == index && 'none',
                  padding: '16px 20px',
                  backgroundColor:
                    activeBar?.activeBar?._id === item?._id && '#f4f4f4',
                  transition: 'backgroundColor, 1s ease',
                }}
              >
                <a className=' d-flex justify-content-between align-items-center'>
                  {access === false && item?.public_to_access === false ? (
                    <>
                      {item?.content_type === 'lecture' ? (
                        <BiVideo />
                      ) : item?.content_type === 'resource' ? (
                        <IoMdPaper />
                      ) : (
                        <BsQuestionCircle />
                      )}
                      <span
                        className='ms-2'
                        style={{ cursor: 'not-allowed', width: '100%' }}
                      >
                        {item.title}
                      </span>
                      <span className='status locked'>
                        <i className='flaticon-password'></i>
                      </span>
                    </>
                  ) : (
                    <span
                      style={{ width: '100%' }}
                      onClick={() => handleClick(item)}
                    >
                      {item?.content_type === 'lecture' ? (
                        <BiVideo className='me-2' />
                      ) : item?.content_type === 'resource' ? (
                        <IoMdPaper className='me-2' />
                      ) : (
                        <BsQuestionCircle className='me-2' />
                      )}
                      {item.title}
                    </span>
                  )}
                </a>
              </ListGroup.Item>
            </ListGroup>
          </div>
        )
      })}
    </>
  )
}
