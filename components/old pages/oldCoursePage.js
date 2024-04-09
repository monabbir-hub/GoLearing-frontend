// import { useRouter } from 'next/router'
// import React from 'react'
// import RightSide from '../../components/Layouts/RightSide'
// import SideBar from '../../components/Layouts/SideBar'
// import Footer from '../../components/_App/Footer'
// import Navbar from '../../components/_App/Navbar'
// const CourseDetails = () => {
//   const router = useRouter()

//   return (
//     <div>
//       <Navbar />
//       <main
//         className='p-md-5 p-2 mx-auto'
//         style={{ maxWidth: '1600px', minHeight: '25rem' }}
//       >
//         <div className='row'>
//           <div className='col-xl-3  col-lg-4 col-12  order-2 mt-3' id='sidebar'>
//             <SideBar id={router?.query?.id} />
//           </div>
//           <div className='col-xl-9  col-lg-8 col-12  order-1 '>
//             <RightSide />
//             {/* {content_type === 'lecture' && <Videos id={v_id} />}
//             {content_type === 'resource' && <Resource id={id} />}
//             {content_type === 'quiz' && <Quiz />} */}
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   )
// }

// export default CourseDetails
