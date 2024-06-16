/* eslint-disable no-unused-vars */
import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../common/Header'

const BookingSuccess = () => {
    const location = useLocation()
    const message = location.state?.message
    const error = location.state?.error
  return (
    <div className='container'>
    <Header title="Đặt phòng thành công"/>
    {message ? (
        <div>
        <h3 className='text-success'>Đặt phòng thành công !</h3>
        <p className="text-success">{message}</p>
        </div>
    ):(
        <div>
        <h3 className='text-danger'>Lỗi đặt phòng !</h3>
        <p className='text-success'>{error}</p>
        </div>
    )}
    </div>
  )
}

export default BookingSuccess