/**
 * /api/analyzeStaff 接口好像有问题，model的数据为直接写入的，非后端获取.  等后端可以了，就打开useEffect和model里面的effects
 */
import React, { useEffect } from 'react'
import StaffAmount from './component/StaffAmount'
import './css/index.less'
import { useSelector, useDispatch } from 'dva'
import StaffEnrolled from './component/StaffEnrolled'
import Pie from './component/Pie'
import AgeColumn from './component/AgeColumn'
import Column from './component/Column'
import {analyzeStaff} from '../../service/interface/employeeAnalyze'
import {getAttendanceTable} from '../../service/interface/attendance'

export default function index() {
  const {amountDataList,staffData,pieList,columnList,marriageData,constellationData} = useSelector(state => state.staff)
// console.log(amountDataList,staffData,pieList,columnList,marriageData,constellationData);
  const res = amountDataList?.map((item, index) => {
    return <StaffAmount key={index} {...item} />
  })
  // analyzeStaff().then(res=>console.log(res))
  // getAttendanceTable().then(res=>console.log(res))
  // const dispatch = useDispatch()
  // useEffect(() => {
   
  //   dispatch({
  //     type: 'staff/initialData'
  //   })
  // }, [])
  return (
    <div className='dashboard-container'>
      {res}
      {pieList?.map((item,index)=>{
        return (<Pie key={index} {...item}></Pie>)
      })}
      <Pie {...marriageData} isEmpty={true}></Pie>
      <StaffEnrolled {...staffData}></StaffEnrolled>
      {pieList?<AgeColumn {...pieList}/>:<></>}
      <Pie {...constellationData} isArea={true}></Pie>
      {columnList?.map((item,index)=>{
        return (<Column {...item} key={index}/>)
      })}
    </div>
  )
}
