import { useRouter } from 'next/router'
import React from 'react'
// import CourseLayout from '../../components/Layouts/CourseLayout'

export default function index() {
  const router = useRouter()

  const v_id = router.query.v_id
  const id = router.query.id
  const content_type = router.query.content_type

  return (
    <div>
      {/* <CourseLayout id={id} v_id={v_id} content_type={content_type} /> */}
    </div>
  )
}
