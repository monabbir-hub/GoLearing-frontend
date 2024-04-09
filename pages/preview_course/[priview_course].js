import { useRouter } from 'next/router'
import React from 'react'
// import CourseLayout from '../../components/Layouts/CourseLayout'

export default function PreviewCourse() {
  const router = useRouter()

  let id = router.query.preview_course

  return <div>{/* <CourseLayout id={id} /> */}</div>
}
