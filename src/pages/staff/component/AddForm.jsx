import React from 'react'
import { Form, Button, Input, Select, DatePicker, Row, Col, message } from 'antd'
import staffList from '@/staticList/staffList'
import DropPopover from '@/components/DropPopover/index.jsx';
import { staffRule } from '@/utils/rules/staffRule'
import { useDispatch } from 'react-redux';
import { checkIsExists, updateStaff,createStaff } from '@/service/interface/staff'
import UploadComp from '@/components/UploadComp'
const{Option} =Select
export default function AddForm({ setDialogStatus, reloadList }) {
  const [form] = Form.useForm();
  const _onFinish = async(data) => {
    // console.log(data)
    delete data.departmentName;
    delete data.levelName;
    const { code, msg } = await createStaff(data);
    if (code) return;
    message.success(msg);
    reloadList();
    setDialogStatus(false);
    form.resetFields();
  }
  const beforeChecked = async (item) => {
    //- 账户名或者是手机号码进行验证
    if (item.itemName === 'accountName' || item.itemName === 'mobile') {
      const reqData = await form.validateFields([item.itemName]);
      const { data } = await checkIsExists({ checkData: reqData });
      if (data) {
        form.setFieldsValue({ [item.itemName]: "" });
        return message.error('account/mobile already exist,please double check');
      }
    }
  };
  const formData = {
    input: item => {
      return <Input placeholder={
        item.placeholderVal}
        type={item.itemName === 'password' ? 'password' : 'text'}
        onBlur={() => beforeChecked(item)}></Input>
    },
    select: item => {
      return <Select
        placeholder={item.placeholderVal}
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
      />
    ),
    popover: (item) => {
      return <Input
        placeholder={item.placeholderVal}
        readOnly
        addonAfter={<DropPopover
          placeholderVal={item.placeholderVal}
          interfaceName={item.itemName === 'levelName' ? 'levelInt' : 'departInt'}
          searchType={item.itemName}
          getSelectItem={(res) => {
            // console.log('res',res,'________',item.itemName)
            form.setFieldsValue({
              [item.itemName]: res[item.itemName],
              [item.itemName.split('N')[0]]: res._id,
            });
          }} />}
      />
    },
    upload: (item) =>
      <UploadComp
        getNewAvatar={newAvatar => {
          form.setFieldsValue({ newAvatar, newAvatar })
        }}
      />,
  }
  return (
    <Form layout='vertical'
      form={form}
      onFinish={_onFinish}
    >{
        staffList.map((items, index) => {

          return (<Row key={index} justify={'space-between'}>
            {
              items.map((item, insideIndex) => {
                // console.log(item.renderType)
                return <Col span={11} key={insideIndex}>{
                  <Form.Item rules={staffRule[item.itemName]} label={item.itemName} name={item.itemName} style={{ ...item.style }}>
                    {formData[item.renderType](item)}
                  </Form.Item>
                }</Col>
              })
            }
          </Row>)
        })
      }
      <Row key="addition">
        <Col span={24} style={{ textAlign: 'right' }}>
          <Form.Item>
            <Button type='primary' htmlType='submit' onClick={() => { }}>
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}
