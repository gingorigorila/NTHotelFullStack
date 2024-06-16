/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { DateRangePicker } from "react-date-range"

const DateSlider = ({onDateChange,onFilterChange}) => {
    const [rangeDate,setRangeDate]=useState({
        startDate:undefined,
        endDate:undefined,
        key:"selection"
    })
    const handleSelect=(range)=>{
        setRangeDate(range.selection)
        onDateChange(range.selection.startDate,range.selection.endDate)
        onFilterChange(range.selection.startDate,range.selection.endDate)
    }
    const handleClearFilter = ()=>{
        setRangeDate({
            startDate:undefined,
            endDate:undefined,
            key:"selection"
        })
        onDateChange(null,null)
        onFilterChange(null,null)
    }
  return (
    <>
    <h5>Tìm đơn đặt phòng theo ngày</h5>
    <DateRangePicker ranges={[rangeDate]} onChange={handleSelect} className="mb-4"/>
    <button className='btn btn-primary' onClick={handleClearFilter}>Xóa</button>    
    </>
  )
}

export default DateSlider