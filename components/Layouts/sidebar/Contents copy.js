import React from 'react'
import { Accordion, ListGroup } from 'react-bootstrap'
import Link from 'next/link'
import ContentDetails from './ContentDetails'
export default function Content({ contents }) {
  return (
    <>
      {contents.map((item, index) => {
        return (
          <ListGroup key={index}>
            <ListGroup.Item>
              <Link href='#'>
                <a>{item.content_type}</a>
              </Link>
            </ListGroup.Item>
          </ListGroup>
        )
      })}
    </>
  )
}
