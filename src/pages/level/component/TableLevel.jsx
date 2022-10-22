
import {EditableCell,EditableRow} from './editable'
import { Button, Form, Input, Popconfirm, Table,message } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {useSelector,useDispatch} from 'umi'
import iconMap from '@/components/iconMap';
import Inside from './inside';
import {updateLevelDetail} from '@/service/interface/level'
export default function TableLevel({levelList,openDetailDialog}) {
    // const {levelList} =useSelector(state=>state.level)
    const {userInfo}=useSelector(state=>state.user)
    const dispatch=useDispatch()
    // console.log(levelList)
    useEffect(()=>{
      _initial()
    },[])

    const _initial=(size=10)=>{
      dispatch({type:'level/_initialLevelListAndTotal',payload:{size:size}})
    }
    const handleSave = async (payload) => {
      const res=await updateLevelDetail(payload);
      message.success('success update')
      // console.log(res)
      _initial()
      /** PAYLOAD传入以下三个
       *         _id: record._id,
      updateVal: editData[dataIndex],
      type: dataIndex,
       */
      // console.log('in',row,)
  };


      return (<>
      <Inside openDetailDialog={openDetailDialog} userInfo={userInfo} dataSource={levelList} handleSave={handleSave}></Inside>
      </>)
      
}
