import React from 'react'
import { Accordion, ListGroup } from 'react-bootstrap'
import Link from 'next/link'
export default function ContentDetails({ contents }) {
  return (
    <>
      <ListGroup>
        <ListGroup.Item>
          <Link href='#'>
            <a>Video Lecture</a>
          </Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link href='#'>
            <a>Quiz</a>
          </Link>
        </ListGroup.Item>
      </ListGroup>
    </>
  )
}
