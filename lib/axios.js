import axios from 'axios'

const { NEXT_PUBLIC_API_URI } = process.env
export const http = axios.create({
  baseURL: NEXT_PUBLIC_API_URI,
})

http.interceptors.request.use(
  function (config) {
    let user_token =  localStorage.getItem('x-access-token');
    let admin_token = localStorage.getItem('go-learning-admin');
    return {
      ...config,
      headers: {
        ...config.headers,
        'x-access-token':admin_token?admin_token:user_token,
      },
    }
  },
  function (error) {
    return Promise.reject(error)
  }
)

export const http2 = axios.create({
  baseURL: NEXT_PUBLIC_API_URI,
})

http2.interceptors.request.use(
  function (config) {
    return {
      ...config,
      headers: {
        ...config.headers,
        'x-access-token': localStorage.getItem('x-access-token'),
      },
    }
  },
  function (error) {
    return Promise.reject(error)
  }
)
