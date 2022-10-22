import React from 'react'
import './index.less'
import classnames from 'classnames'
export default function index ({isShow,part=false}) {
  const loadingStyle=part?{
    position:'absolute',
    left:'50%',
    top:'50%',
    height:'100%',
    width:'100%',
    transform:'translate(-50%,-50%)'
  }:{}
  return (
    <div style={{...loadingStyle}} className={classnames('loader', 'fullScreen',{hidden:!isShow})}>
        <div className="wrapper">
            <div className="inner"></div>
            <div className="text">loading</div>
        </div>
    </div>
  )
}
