import React, { useState } from 'react'
import { createContext } from 'react'

const MyContext = createContext()

//React context for storing access token
const DataContext = ({ children }) => {
  const [token, setToken] = useState(() => {
    const token = localStorage.getItem('encoded_token')
    return token
  })
  const [userRole, setUserRole] = useState(() => {
    const userRole = localStorage.getItem('userRole')
    return userRole
  })
  const [empNo, setEmpNo] = useState('')
  const [positionStreamData, setPositionStreamData] = useState({})
  const states = {
    token,
    setToken,
    userRole,
    setUserRole,
    empNo,
    setEmpNo,
    positionStreamData,
    setPositionStreamData
  }

  return <MyContext.Provider value={states}>{children}</MyContext.Provider>
}

export { DataContext, MyContext }
