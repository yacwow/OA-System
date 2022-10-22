import React, { useState } from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'umi';
import iconMap from '@/components/iconMap';
import Tree from './component/Tree';
import Dialog from '@/components/Dialog';
import FormComponent from './component/FormComponent/';

const department = () => {
  const { collapse } = useSelector((state) => state.common);
  const [modalTitle, setModalTitle] = useState('create department');
  const [modalType, setModalType] = useState('update');
  // const [dialogStatus, setDialogStatus] = useState(false);
  const { showModalDialog } = useSelector(state => state.department)
  const dispatch = useDispatch();
  const setDialogStatus = (status) => {
    dispatch({
      type: 'department/saveDepartmentDetail',
      payload: { showModalDialog: status },
    });
  }
  // console.log(showModalDialog)
  //- 新增部门弹窗打开
  const openDialog = () => {
    setModalType('add');
    dispatch({
      type: 'department/saveDepartmentDetail',
      payload: { department: null },
    });
    setDialogStatus(true);
    setModalTitle('create department');
    
  };

  //- 点击树状图获取部门详情
  const getDepartmentDetail = (_id, name) => {

    setModalTitle(name);
    setModalType('update');
    dispatch({
      type: 'department/_getDepartmentDetail',
      payload: { _id },
    });
    // setDialogStatus(true);
  };

  //- 指定弹窗头部内容生成
  const modalTitleComponent = (
    <div className="department-modal-title">
      <span className="ft-b">{modalTitle}</span>
      {modalType === 'update' && (
        <span className="delete-icon">{iconMap.del}</span>
      )}
    </div>
  );

  return (
    <div className="department-container">
      {/* 头部内容 */}
      {collapse ? (<Button
        className='create-department-btn small'
        size="small"
        shape="round"
        icon={iconMap.add}
        onClick={openDialog}
      >
        create
      </Button>) : (<Button
        className='create-department-btn'
        size="small"
        shape="round"
        icon={iconMap.add}
        onClick={openDialog}
      >
        create
      </Button>)}
      <Tree getDepartmentDetail={getDepartmentDetail} />
      {/* 新增部门与部门详情对话框 */}
      {showModalDialog && <Dialog
        className='department-detail-modal'
        title={modalTitleComponent}
        dialogStatus={showModalDialog}
        setDialogStatus={setDialogStatus}
        width={800}
        render={() => <FormComponent  departmentDetail={[]}  setDialogStatus={setDialogStatus} modalType={modalType}></FormComponent>}
      />}
    </div>
  );
};

export default department;
