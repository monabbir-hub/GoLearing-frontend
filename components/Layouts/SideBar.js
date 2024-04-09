import React, { useEffect, useState } from 'react'
import { Accordion, Spinner } from 'react-bootstrap'
import { http2 } from '../../lib/axios'
import { useCourseDetails } from '../../providers/CourseDetails'
import { FullCourseTreeEndNew } from '../../utils/EndPoints'
import Lesson from './sidebar/Subs'

export default function SideBar({ id }) {
  const [content, setContent] = useState({})
  const [filterInModule, setFilterInModule] = useState('')
  const [loading, setLoading] = useState(false)
  const dataForNextAndPrevious = useCourseDetails()
  const [previousContent, setPreviousContent] = useState({})

  useEffect(() => {
    if (!id) {
      return null
    }
    async function fetchCourse() {
      setLoading(true)
      try {
        // https://go-learning-backend.herokuapp.com/full_course/get_full_course_tree?course_id=61e3d5206df533d104fe801c
        // `https://go-learning-backend.herokuapp.com/full_course/get_full_course_tree?course_id=${id}`
        const data = await http2.get(
          `${FullCourseTreeEndNew}?course_id=${id}`,
          {
            headers: {
              'x-access-token': localStorage.getItem('x-access-token'),
            },
          }
        )

        let val = data.data

        dataForNextAndPrevious.setCourseDetails(val)

        regenerateData(val)
        setContent(val)
        setPreviousContent(val)

        setLoading(false)
      } catch (error) {}
    }
    fetchCourse()
  }, [id])

  const regenerateData = (data) => {
    let dataArr = []

    for (let i of data?.module) {
      for (let j of i?.subs) {
        if (j?.contents.length) {
          for (let k of j?.contents) {
            dataArr.push(k)
          }
        }
      }
      if (data?.module[data?.module.length - 1] === i) {
        dataForNextAndPrevious.setDataForNextAndPrevious(dataArr)
      }
    }

    // dataForNextAndPrevious
  }

  // active sidebar code

  // const [theActiveKey, setTheActiveKey] = useState(null)

  // useEffect(() => {
  //   findParentModuleId()
  // }, [dataForNextAndPrevious])

  // const findParentModuleId = () => {
  //   let d = dataForNextAndPrevious?.courseDetails?.module?.find((d) =>
  //     d?.subs.find(
  //       (s) => s?._id === dataForNextAndPrevious?.activeBar?.module_id
  //     )
  //   )

  // }

  useEffect(() => {
    if (filterInModule.length > 0) {
      generateNewSideBar()
      // if (content?.module.length === 0) {
      //   setContent(previousContent)
      // }
    } else {
      setContent(previousContent)
    }
    // filterInModule.length > 0
    //   ? generateNewSideBar()
    //   : setContent(previousContent)
  }, [filterInModule])

  const generateNewSideBar = () => {
    // setContent(previousContent)

    let sideBarModuleArr = []

    for (let i of previousContent?.module) {
      for (let j of i?.subs) {
        if (j?.contents.length) {
          for (let k of j?.contents) {
            if (k.title.toLowerCase().includes(filterInModule.toLowerCase())) {
              sideBarModuleArr.push(i)
            }
          }
        }
      }

      if (previousContent?.module[previousContent?.module.length - 1] === i) {
        let newArr = sideBarModuleArr.filter(
          (value, idx) => sideBarModuleArr.indexOf(value) === idx
        )

        setContent({ ...previousContent, module: newArr })
      }
    }
  }

  return (
    <>
      {loading && (
        <h5>
          Sidebar is loading <Spinner animation='border' size='sm' />{' '}
        </h5>
      )}

      <div className='my-3'>
        <input
          type='text'
          className='form-control'
          placeholder='search content name to find module'
          value={filterInModule}
          onChange={(e) => {
            setFilterInModule(e.target.value)
          }}
          style={{ border: '1px solid #dfdfdf' }}
        />
      </div>
      {content?.module?.length > 0 &&
        content?.module?.map((item, index) => {
          return (
            <Accordion
              key={item?._id}
              className='h-auto w-auto '
              style={{ border: 'none' }}
              // defaultActiveKey={
              //   dataForNextAndPrevious?.courseDetails?.module?.find((d) =>
              //     d?.subs.find(
              //       (s) =>
              //         s?._id === dataForNextAndPrevious?.activeBar?.module_id
              //     )
              //   )?._id
              // }
            >
              <Accordion.Item
                eventKey={item._id}
                style={{
                  borderBottom: content?.module?.length - 1 !== index && 'none',
                  borderRadius: '0px',
                }}
              >
                <Accordion.Header style={{ border: 'none' }}>
                  {item.title}
                </Accordion.Header>
                <Accordion.Body
                  className='p-0'
                  style={{
                    border: 'none',
                    borderBottom: content?.module.length - 1 == index && 'none',
                  }}
                >
                  {item.subs.length > 0 && !filterInModule ? (
                    <Lesson
                      subs={item?.subs}
                      contents={item?.contents}
                      id={item?._id}
                      access={content?.have_full_access}
                    />
                  ) : (
                    <Lesson
                      subs={item?.subs
                        ?.filter((item) =>
                          item.contents.find((c) =>
                            String(c.title)
                              .toLowerCase()
                              .includes(filterInModule.toLowerCase())
                          )
                        )
                        .map((sub) => ({
                          ...sub,
                          contents: sub.contents.filter((c) =>
                            String(c.title)
                              .toLowerCase()
                              .includes(filterInModule.toLowerCase())
                          ),
                        }))}
                      contents={item?.contents}
                      id={item?._id}
                      access={content?.have_full_access}
                    />
                  )}
                  {/* <Lesson subs={item.subs} contents={item.contents} /> */}
                  {/* {item.contents.length > 0 && (
                    <Content contents={item.contents} />
                  )} */}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          )
        })}
    </>
  )
}
