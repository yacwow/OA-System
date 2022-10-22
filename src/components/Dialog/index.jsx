import React from 'react'
import {Modal} from 'antd'
import {useDispatch} from 'umi'

export default function Dialog({title,dialogStatus,render,setDialogStatus,width=600,className=''}) {
  // const dispatch=useDispatch()
  // const handleCancel=()=>{
  //   console.log('ininininin')
  //   dispatch({
  //     type: 'department/saveDepartmentDetail',
  //     payload: { departmentDetail:[] },
  //   });
  //   setDialogStatus(false)
  // }
  return (
    <Modal width={width} destroyOnClose={true}
    className={className}
    centered={true} title={title}
    visible={dialogStatus}
    onCancel={()=>{setDialogStatus(false)}}
    footer={null}>
        {render()}
    </Modal>
  )
}
