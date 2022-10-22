import {  Form, Input,Select,DatePicker } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { mapData } from '../../../utils/mapData';
import moment from 'moment'
const EditableContext = React.createContext(null);
const {Option} =Select

export const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

export const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    rules,
    handleSave,
    type,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const selectRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current&&inputRef.current.focus();
      }
    }, [editing]);
  
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
        onboardingTime:moment(record.onboardingTime)
      });
    };
  

    const _sendBeforeCheck=async()=>{
      // console.log(mapData,dataIndex,mapData[dataIndex])
      // console.log(mapData[dataIndex]&&mapData[dataIndex].map((item,index)=>{
      //   <Option key={index} value={index}>123</Option>
      // }))
      try{
        const editData=await form.validateFields([dataIndex])
        toggleEdit()
        if(record[dataIndex]===editData[dataIndex]) return;
        handleSave({
          _id:record._id,
          updateVal:editData[dataIndex],
          type:dataIndex
        });
      } catch(err){
        console.log(err)
      }

    }

    const editNodeData={
      inputNode:<Input ref={inputRef} onPressEnter={_sendBeforeCheck} onBlur={_sendBeforeCheck}></Input>,
      selectNode:<Select ref={selectRef} onBlur={_sendBeforeCheck}>
        {mapData[dataIndex]&&mapData[dataIndex].map((item,index)=>{
          return <Option key={index} value={index}>{item}</Option>
        })}
      </Select>,
      dateNode:<DatePicker ref={inputRef} onChange={_sendBeforeCheck} onBlur={_sendBeforeCheck}></DatePicker>
    }
    // console.log(mapData[dataIndex])
    let childNode = children;
  
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={rules}
        >
          {editNodeData[type]}
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
  
    return <td {...restProps}>{childNode}</td>;
  };