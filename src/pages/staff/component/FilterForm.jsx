import React, { useState, useEffect } from 'react'
import { Form, Input, Select } from 'antd'
const { Option } = Select
import DropPopover from '@/components/DropPopover'
import { useSelector, useDispatch } from 'umi'
import { mapData } from '../../../utils/mapData'

export default function FilterForm({ reload }) {
  const { userInfo: { identity } } = useSelector(state => state.user)
  const [form] = Form.useForm()
  const dispatch = useDispatch();
  const { isClearForm } = useSelector((state) => state.common);
  const [queryData, setQueryData] = useState({
    education: null,
    level: null,
    department: null,
    userName: null,
    marriage: null,
  });
  useEffect(() => {
    if (isClearForm) {
      form.resetFields();
      reload({});
      setQueryData({
        education: null,
        level: null,
        department: null,
        userName: null,
        marriage: null,
      });
      dispatch({
        type: 'common/clearForm',
        payload: { isClearForm: false },
      });
    }
  }, [isClearForm]);
  const searchStaff = (type) => {
    const tempData = JSON.parse(JSON.stringify(queryData));
    if (typeof type === 'object') {
      Object.assign(tempData, type);
    } else {
      tempData[type] = form.getFieldValue(type);
    }
    setQueryData(tempData);
    _filterData(tempData);
    // console.log(tempData)
  };

  const _filterData = (currentData) => {
    Object.keys(currentData).forEach((key) => {
      if (!currentData[key]) {
        delete currentData[key];
      }
    });
    reload({ queryData: currentData });
  };
  return (
    <Form form={form} layout='vertical'>
      <Form.Item label='UserName' name='userName'  >
        <Input allowClear={true}
          onBlur={() => searchStaff('userName')}
          onPressEnter={() => searchStaff('userName')}
          placeholder='please input userName'></Input>
      </Form.Item>
      <Form.Item label='Department' name='department'  >
        <Input
          readOnly
          placeholder='please input department name'
          searchType="departmentName"
          addonAfter={<DropPopover
            placeholderVal='department name you want to search'
            interfaceName='departInt'
            searchType="departmentName"
            getSelectItem={(item) => {
              // console.log(item)
              form.setFieldsValue({
                department: item.departmentName
              });
              searchStaff({ 'department': item._id })
            }} />}
        ></Input>
      </Form.Item>
      <Form.Item label='Level' name='level'  >
        <Input
          readOnly
          placeholder='please input employee Level'
          searchType="departmentName"
          addonAfter={<DropPopover
            placeholderVal='employee Level you want to search'
            interfaceName='levelInt'
            searchType="levelName"
            getSelectItem={(item) => {
              form.setFieldsValue({
                level: item.levelName
              });
              searchStaff({ 'level': item._id })
            }} />}
        ></Input>
      </Form.Item>
      {identity === 1 &&
        <>
          <Form.Item label='Marriage' name='marriage'  >
            <Select allowClear placeholder='please select the employee marriage status'
              onChange={() => searchStaff('marriage')}>
              {mapData.marriage.map((val, index) => {
                return (<Option key={index} val={index}>{val}</Option>)
              })
              }
            </Select>
          </Form.Item>
          <Form.Item label='Education' name='education'  >
            <Select allowClear placeholder='please select the employee education level'
              onChange={() => searchStaff('education')}>
              {mapData.education.map((val, index) => {
                return (<Option key={index} val={index}>{val}</Option>)
              })
              }
            </Select>
          </Form.Item>
        </>
      }
    </Form>

  )
}
