import React, { useState } from 'react'
import { Form, Button } from 'antd';
import IconMap from '../../../components/iconMap'
import {getSmCode} from '../../../service/interface/user'
import {message} from 'antd'
export default function CodeLogin({ Input, form }) {
  const [disabled, setDisabled] = useState(true);
  let [time, setTime] = useState(20);
  const [status, setStatus] = useState(true)
  const handelChange = async () => {
    try {
      await form.validateFields(['phone']);
      setDisabled(false)
    } catch (error) {
      setDisabled(true)
    }

  }
  const sendCode =async () => {
    setStatus(false);
    setDisabled(true);
    runTime()
    const number=form.getFieldValue('phone')
    const res=await getSmCode({mobile:number})
    message.info(`your SmCode is${res.data}`,5)
    // console.log(res)
    
  }
  function runTime(){
    const timer=setInterval(() => {
      
      if(time===0){
        clearInterval(timer);
        setStatus(true);
        setDisabled(false);
        setTime(20);
        return;
      }
      setTime(--time)
    }, 1000);
  }
  return (
    <>
      <Form.Item
        hasFeedback
        name="phone"
        rules={[
          {
            validator: (arg, val) => {
              const mobileReg = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
              switch (true) {
                case !Boolean(val):
                  return Promise.reject('Please input phone number!');
                case !mobileReg.test(val):
                  return Promise.reject('wrong phone number format');
                default:
                  return Promise.resolve();
              }
            }
          }]}
      >
        <Input
          onChange={handelChange}
          prefix={IconMap.mobileIcon}
          placeholder='please input phone number' />
      </Form.Item>

      <Form.Item
        hasFeedback
        name="code"
        rules={[{ required: true, message: 'Please input verify code!' },
        { max: 6, message: ' Length incorrect' },
        { min: 6, message: ' Length incorrect' }]}
      >
        <Input
          prefix={IconMap.smCodeIcon} placeholder='verify code'
          addonAfter={<Button
            onClick={sendCode}
            disabled={disabled}>{status?`send SmCode`:`${time}s resend`}</Button>} />
      </Form.Item>
    </>
  )
}
