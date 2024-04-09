import 'react-accessible-accordion/dist/fancy-example.css'
import 'react-image-lightbox/style.css'
import 'react-tabs/style/react-tabs.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import Layout from '../components/_App/Layout'
import '../node_modules/react-modal-video/css/modal-video.min.css'
import Providers from '../providers'
import AuthProvider from '../providers/AuthProvider'
import CourseDetailsProvider from '../providers/CourseDetails'
import StaticProvider from '../providers/StaticProvider'
import '../styles/admin/index.scss'
import '../styles/animate.min.css'
import '../styles/bootstrap.min.css'
import '../styles/boxicons.min.css'
import '../styles/custom/custom.scss'
import '../styles/flaticon.css'
import '../styles/global.scss'
import '../styles/meanmenu.min.css'
import '../styles/responsive.css'
import '../styles/style.css'

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <StaticProvider>
        <CourseDetailsProvider>
          <Layout>
            <ToastContainer
              position='bottom-right'
              autoClose={1000}
              hideProgressBar
            />
            <Providers>
              <Component {...pageProps} />
            </Providers>
          </Layout>
        </CourseDetailsProvider>
      </StaticProvider>
    </AuthProvider>
  )
}

export default MyApp
