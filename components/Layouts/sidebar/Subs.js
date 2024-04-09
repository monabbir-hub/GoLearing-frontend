import React, { useEffect, useState } from 'react'
import { Accordion, ListGroup } from 'react-bootstrap'
import Link from 'next/link'
import Content from './Contents'
import { useCourseDetails } from '../../../providers/CourseDetails'
export default function Lesson({ subs, id, access }) {
  const activeBar = useCourseDetails()

  return (
    <>
      {subs.length > 0 &&
        subs.map((item, index) => {
          return (
            <Accordion
              key={item?._id}
              className='p-0 my-1'
              style={{ border: 'none', borderRadius: '0px' }}
              // activeKey={activeBar?.activeBar?.module_id}
            >
              <Accordion.Item
                eventKey={item._id}
                style={{
                  borderTop: 'none',
                  borderRight: 'none',
                  borderLeft: 'none',
                  borderRadius: '0px',
                  borderBottom: subs.length - 1 == index && 'none',
                }}
              >
                <Accordion.Header
                  style={{ border: 'none', borderRadius: '0px' }}
                >
                  {item.title}
                </Accordion.Header>
                <Accordion.Body
                  className='p-0'
                  style={{ border: 'none', borderRadius: '0px' }}
                >
                  {item.contents.length > 0 && (
                    <Content access={access} contents={item.contents} id={id} />
                  )}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          )
        })}
    </>
  )
}
