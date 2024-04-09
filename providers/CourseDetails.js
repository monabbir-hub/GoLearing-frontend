import React, { createContext, useContext, useState } from 'react';

const CourseContext = createContext({
  courseDetails: {},
  setCourseDetails: () => {},
  activeBar: {},
  setActiveBar: () => {},
})

const CourseDetailsProvider = ({ children }) => {
  const [courseDetails, setCourseDetails] = useState({})
  const [activeBar, setActiveBar] = useState({})
  const [dataForNextAndPrevious, setDataForNextAndPrevious] = useState()

  return (
    <CourseContext.Provider
      value={{
        courseDetails,
        setCourseDetails,
        activeBar,
        setActiveBar,
        dataForNextAndPrevious,
        setDataForNextAndPrevious,
      }}
    >
      {children}
    </CourseContext.Provider>
  )
}
export default CourseDetailsProvider
export const useCourseDetails = () => useContext(CourseContext)
