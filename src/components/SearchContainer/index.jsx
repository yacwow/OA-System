import React, { useState } from 'react'
import iconMap from '../iconMap'
import './index.less'
import {useDispatch} from 'umi'

export default function index({ children}) {
  const dispatch=useDispatch()
  const [closeStatus,setCloseStatus]=useState(false);
  //clear the from
  const clearForm=()=>{
    dispatch({type:'common/clearForm',payload:{isClearForm:true}})
    // console.log('clear');
  }
  const content = (className) => {
    let name=className?className:'';
    return (<div className={`filter-wrapper ${name}`}>
      <div className='filter-title-wrapper'>
        <span>filter</span>
        <span className="c-r" onClick={clearForm}>{iconMap.reload}</span>
      </div>
      {closeStatus ? (<div className="filter-form-wrapper opacity">{children}</div>) 
      : (<div className="filter-form-wrapper">{children}</div>)}

      <div className="close-tip" onClick={() => setCloseStatus(!closeStatus)}>
        {closeStatus ? iconMap.right : iconMap.left}
      </div>
    </div>)
  }
  return (
    closeStatus?content("close"):content()
  )
}
