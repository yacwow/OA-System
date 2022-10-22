/**
 * 有个bug解决不了，需要第二遍点击图片，默认值才会输出，本质是一开始没有departmentdetail数据
 * 直接给上一层组件套一个visible，等数据有了之后，再来渲染这一层。
 */

import React, { useState, useEffect } from 'react';
import { Form, Button, Input, Row, Descriptions } from 'antd';
import { departmentRule } from '@/utils/rules';
import ChildDepartment from '../ChildDepartment';
import DropPopover from '@/components/DropPopover';
import { useDispatch, useSelector } from 'umi';
import StaffTable from '../StaffTable'
import './index.less';

const FormComponent = ({ modalType, setDialogStatus }) => {
  const [form] = Form.useForm();
  const [childList, setChildList] = useState([]);
  const dispatch = useDispatch();
  // console.log('in 22------')
  const { departmentDetail } = useSelector(state => state.department)
  let _innit=[]
  if(modalType!=='add'){
    _innit=departmentDetail
  }
  // useEffect(() => {
  //   if (modalType === 'add') {
  //     dispatch({
  //       type: 'department/saveDepartmentDetail',
  //       payload: { departmentDetail: [] },
  //     });
  //   }
  // }, [])


  //- 新增表单提交
  const _onFinish = (data) => {
    const children = form.getFieldValue('children');

    const departmentLeader = form.getFieldValue('departmentLeader');
    // console.log(children, data, departmentLeader)
    delete data.departmentLeaderName;
    dispatch({
      type: 'department/_addDepartment',
      payload: {
        departmentLeader,
        children,
        ...data,
      },
    });
    setDialogStatus(false);
  };

  //- 新增子部门或修改子部门
  const pushOrUpdateList = ({ list, type }) => {
    // console.log('in55555')
    const childrenIds = list.map((item) => item._id);
    if (type === 'update' || type === 'del') {
      const isDelete = type === 'del';
      updateDepartment({ type: 'children', updateVal: childrenIds, isDelete });
    } else {
      // console.log(list);
      setChildList(list);
      form.setFieldsValue({ children: childrenIds });
    }
  };
  //isDelete  for unlinkDep
  const updateDepartment = ({ type, updateVal, isDelete = false,test }) => {
    if (!updateVal) {
      updateVal = form.getFieldValue(type);
      //- 判断新旧值是否相等
      if(_innit===null) return
      if (updateVal === _innit[type]) return;
    }
    dispatch({
      type: 'department/updateDepartmentDetail',
      payload: {
        _id: _innit?._id||test,//这里不能改成_init
        type,
        updateVal,
        isDelete,
      },
    });
  }


  return (
    <Form form={form}
      initialValues={{
        departmentName: _innit && _innit.departmentName,
        remark: _innit && _innit.remark,
        departmentLeaderName: _innit &&
          _innit.departmentLeader && _innit.departmentLeader.userName,
      }}
      onFinish={_onFinish}>
      <Descriptions column={1} labelStyle={{ width: '150px' }} bordered>
        <Descriptions.Item label="departmentName">
          <Form.Item
            name="departmentName"
            rules={departmentRule.departmentName}
          >
            <Input
              onBlur={() => {

                modalType === 'update' && updateDepartment({ type: 'departmentName' });
              }}
            />
          </Form.Item>
        </Descriptions.Item>

        <Descriptions.Item label="remark">
          <Form.Item name="remark">
            <Input
              onBlur={() => {
                modalType === 'update' && updateDepartment({ type: 'remark' });
              }}
            />
          </Form.Item>
        </Descriptions.Item>

        <Descriptions.Item label="child department">
          <ChildDepartment
            childList={
              modalType === 'update' ? _innit?.children : childList}
            pushOrUpdateList={pushOrUpdateList}
            departmentDetail={_innit}
          />
        </Descriptions.Item>

        <Descriptions.Item label="department leader">
          <Form.Item
            name="departmentLeaderName"
            rules={departmentRule.departmentLeader}
          >
            <Input
              placeholder="please input department leader name"
              readOnly
              className="border-1"
              addonAfter={
                <DropPopover
                  placeholderVal="please input the name"
                  interfaceName="getStaffList"
                  searchType="userName"
                  getSelectItem={(item) => {
                    form.setFieldsValue({
                      departmentLeaderName: item.userName,
                      departmentLeader: item._id,
                    });
                    updateDepartment({ type: 'departmentLeader',updateVal:null,isDelete:false,test:item._id })
                  }}
                />
              }
            />

          </Form.Item>
        </Descriptions.Item>

        <Descriptions.Item label="department employee">
          {modalType === 'update' &&
            <StaffTable staffList={_innit?.staffList}
            ></StaffTable>
          }
        </Descriptions.Item>

      </Descriptions>
      {modalType === 'add' && (
        <Form.Item>
          <Row justify="end">
            <Button className="mt-20" type="primary" htmlType="submit">
              create
            </Button>
          </Row>
        </Form.Item>
      )}
    </Form>
  );
};

export default FormComponent;
