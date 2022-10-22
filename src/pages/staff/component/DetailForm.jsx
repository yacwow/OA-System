import React from 'react'
import { Form, Input, Select, DatePicker, Row, Col, message } from 'antd'
import staffList from '@/staticList/staffList'
import moment from 'moment';
const { Option } = Select;
import DropPopover from '@/components/DropPopover/index.jsx';
import { staffRule } from '@/utils/rules/staffRule'
import { checkIsExists, updateStaff } from '@/service/interface/staff'
import { useDispatch } from 'react-redux';
import UploadComp from '@/components/UploadComp'

export default function DetailForm({ staffDetail, _initStaffList, page }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const beforeChecked = async (item) => {
    const newVal = form.getFieldValue(item.itemName);
    const oldVal = staffDetail[item.itemName];
    try {
      //- 判断新旧值是否相同
      if (newVal === oldVal) return false;
      //- 账户名或者是手机号码进行验证
      if (item.itemName === 'accountName' || item.itemName === 'mobile') {
        const reqData = await form.validateFields([item.itemName]);
        const { data, msg } = await checkIsExists({ checkData: reqData });
        if (data) {
          form.setFieldsValue({ [item.itemName]: staffDetail[item.itemName] });
          return message.error('account/mobile already exist,please double check');
        }
      }
      _updateStaff(item.itemName, newVal);
    } catch (error) {
      form.setFieldsValue({ [item.itemName]: staffDetail[item.itemName] });
    }
  };
  //- 修改标单项
  const _updateStaff = async (type, updateVal) => {
    const { code, msg } = await updateStaff({
      _id: staffDetail._id,
      type,
      updateVal,
    });
    if (code) return;
    message.success('success modify');
    _initStaffList(page);
    dispatch({
      type: 'staff/getStaffDetail',
      payload: { _id: staffDetail._id },
    });
  };

  const formData = {
    input: item => {
      return <Input placeholder={
        item.itemName === 'password'
          ? 'please change in login page'
          : item.placeholderVal
      }
        disabled={item.itemName === 'password'}
        onBlur={() => beforeChecked(item)}></Input>
    },
    select: item => {
      return <Select
        placeholder={item.placeholderVal}
        onChange={() => beforeChecked(item)}
      >
        {item.optionData.map((val, index) => {
          return (
            <Option key={index} value={index}>
              {val}
            </Option>
          );
        })}
      </Select>
    },
    date: (item) => (
      <DatePicker
        style={{ width: '100%' }}
        placeholder={item.placeholderVal}
        onChange={() => beforeChecked(item)}
      />
    ),
    popover: (item) => {
      return <Input
        placeholder={item.placeholderVal}
        readOnly
        addonAfter={<DropPopover
          placeholderVal={item.placeholderVal}
          interfaceName={item.itemName==='levelName'?'levelInt':'departInt'}
          searchType={item.itemName}
          getSelectItem={(res) => {
            // console.log('res',res,'________',item.itemName)
            form.setFieldsValue({
              [item.itemName]: res[item.itemName],
              [item.itemName.split('N')[0]]: res._id,
            });
            const reqData = JSON.parse(JSON.stringify(item));
            reqData.itemName = reqData.itemName.split('N')[0];
            beforeChecked(reqData);
          }} />}
      />
    },
    upload: (item) => <UploadComp 
    avatar={staffDetail.avatar}
    getNewAvatar={newAvatar=>{
      _updateStaff('avatar',newAvatar)
    }}
    />,
  }

  return (
    <Form layout='vertical'
      form={form} initialValues={{
        ...staffDetail,
        onboardingTime: moment(staffDetail.onboardingTime),
        departmentName: staffDetail.department && staffDetail.department.departmentName,
        levelName: staffDetail.level && staffDetail.level.levelName
      }}>{
        staffList.map((items, index) => {
          
          return (<Row key={index} justify={'space-between'}>
            {
              items.map((item, insideIndex) => {
                // console.log(item.renderType)
                return <Col span={11} key={insideIndex}>{
                  <Form.Item rules={staffRule[item.itemName]} label={item.labelTxt} name={item.itemName} style={{ ...item.style }}>
                    {formData[item.renderType](item)}
                  </Form.Item>
                }</Col>
              })
            }
          </Row>)
        })
      }</Form>
  )
}
