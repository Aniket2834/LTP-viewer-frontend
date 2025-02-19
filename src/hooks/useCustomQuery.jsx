import React, { useState } from 'react'
import axios from 'axios'

//get base URL from .env file
const base = import.meta.env.VITE_BASEURL

const axiosInstance = axios.create({
  baseURL: base || '',
  timeout: 10000
})

//Request interceptor for adding the bearer token
axiosInstance.interceptors.request.use(
  async request => {
    const token = localStorage.getItem('encoded_token')
    if (token !== null) {
      request.headers = {
        ...request.headers,
        authorization: `Bearer ${token}`
      }
    }
    return request
  },
  error => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    const originalConfig = error.config
    if (
      originalConfig.url !== '/api/auth/signin' &&
      originalConfig.url !== '/api/auth/publictoken' &&
      error.response
    ) {
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true

        // refresh token api call
        try {
          const refToken = localStorage.getItem('public_token')
          const res = await axios.post(`${baseURL}/api/auth/publictoken`, {
            public_token: refToken
          })
          const dd = res.data.data
          //set refresh token data to localstorage
          localStorage.setItem('encoded_token', `${dd?.encoded_token}`)
          localStorage.setItem('public_token', `${dd?.public_token}`)
        } catch (e) {
          //handle error if refresh token is time out
          localStorage.removeItem('encoded_token')
          window.location.replace('/signin')
          return Promise.reject(e)
        }
      }
    }
    // Handle other errors here
    return Promise.reject(error)
  }
)


const useCustomQuery = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSuccess, setSuccess] = useState(false)
  const [isError, setError] = useState(false)
  const [headers, setHeaders] = useState(null)

  const sendRequest = async (method, url, data, headerstype) => {
    setErrorMessage('')
    setSuccessMessage('')
    setError(false)
    setLoading(true)
    setSuccess(false)
    setData(null)

    const config = {
      method,
      url,
      data,
      headers: {
        'Content-Type': headerstype || 'application/json'
      }
    }
    try {
      const resp = await axiosInstance(config)
      const data = resp?.data.data
      setData(data)
      setSuccessMessage(resp.data.message)
      setError(false)
      setLoading(false)
      setSuccess(true)
    } catch (error) {
      setError(true)
      setSuccessMessage('')
      setSuccess(false)
      setLoading(false)
      if (error.response) {
        setErrorMessage(error.response.data.message)
      } else if (error.request) {
        setErrorMessage(error.request.message)
      } else {
        setErrorMessage(error.message)
      }
    }
  }

  return {
    loading,
    data,
    successMessage,
    errorMessage,
    isSuccess,
    isError,
    sendRequest
  }
}

export default useCustomQuery
