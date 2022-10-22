import React, { useEffect } from 'react'
import ViolationChart from './component/ViolationChart'
import ViolationTable from './component/ViolationTable'
import { useDispatch, useSelector } from 'react-redux'
import './css/index.less'
export default function index() {
  const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch({
  //     type: 'attendance/initialData'
  //   })
  // }, [])
  const { charList, tableList } = useSelector(state => state.attendance)
  console.log(charList)
  const { userInfo } = useSelector(state => state.user)

  return (
    <div className='attendance-container'>
      {<div className="list-container">
        {userInfo.identity === 1 && charList?.map((item, index) => {
          return (<ViolationChart key={index} {...item}></ViolationChart>)
        })}</div>
      }
      <div className="list-container" style={{ width: userInfo.identity === 1 ? "49.8%" : '100%' }}>
        {tableList?.map((item, index) => {
          return (<ViolationTable key={index} {...item}></ViolationTable>)
        })}
      </div>
    </div>
  )
}
