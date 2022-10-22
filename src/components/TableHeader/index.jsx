import React, { useEffect } from 'react';
import { Button, Pagination, message, Modal } from 'antd';
import iconMap from '../iconMap';
// import classNames from 'classNames';
import { useSelector, useDispatch } from 'umi';
import './index.less';
import { destroyStaff } from '@/service/interface/staff'
import {deleteLevel} from '@/service/interface/level'
export default function index({
  page,
  size,
  total,
  changeCurrentPage,
  openAddDialog,
  type=''
}) {
  const { collapse, ids } = useSelector((state) => state.common);
  const { userInfo } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const deleteItems = () => {
    if (!ids.length) {
      return message.error('No Select Item')
    }
    Modal.confirm({
      title: 'Check',
      content: 'are you sure to delete?',
      onOk: _deleteItems
    })
  }
  const _deleteItems = async () => {
    dispatch({ type: 'common/clearForm', payload: { isClearForm: true } })
    // console.log(type)
    if(type==='level'){
      // console.log('in')
      const{code,msg}=await deleteLevel({ids})
      changeCurrentPage(1)
      return;
    }
    const { code, msg } = await destroyStaff({ ids })
    if (code) return;
    message.success('success delete');
    dispatch({
      type: 'common/saveSelectIds',
      payload: {
        ids: [],
      },
    });
    changeCurrentPage(1);
  }
  // console.log(collapse);
  return (collapse ? (
    <div className={'table-header-container big-style'} >
      {userInfo.identity === 1 && <div>
        <Button className="mr-10" size="small" shape="round" icon={iconMap.add} onClick={openAddDialog}>
          Create
        </Button>
        <Button danger size="small" shape="round" icon={iconMap.del} onClick={deleteItems}>
          Delete
        </Button>
      </div>}
      <div className="pagination-container">
        <Pagination
          simple
          // defaultCurrent={page}
          // current={page}
          pageSize={size}
          total={total}
          onChange={(page) => {
            // console.log(page)
            changeCurrentPage(page)}}
        />
        <span>Total{total} </span>
      </div>
    </div>
  ) : (
    <div className='table-header-container' >
      {userInfo.identity === 1 && <div>
        <Button className="mr-10" size="small" shape="round" icon={iconMap.add}>
          Create
        </Button>
        <Button danger size="small" shape="round" icon={iconMap.del} onclick={deleteItems}>
          Delete
        </Button>
      </div>}
      <div className="pagination-container">
        <Pagination
          simple
          defaultCurrent={page}
          current={page}
          pageSize={size}
          total={total}
          onChange={(page) =>{console.log(page); changeCurrentPage(page)} }
        />
        <span>Total{total} </span>
      </div>
    </div>
  ));
};



