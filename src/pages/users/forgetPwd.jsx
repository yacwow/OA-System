import React, { useState } from 'react'
import CodeLogin from './components/CodeLogin'
import { Button, Form, Input, message } from 'antd';
// import iconMap from '../../components/iconMap';
import { connect, useSelector } from 'umi'
import { checkCode,resetPassword } from '../../service/interface/user';
import './css/login.less'
import UpdatePassword from './components/UpdatePassword'
function forgetPassword(props) {
  const [step, setStep] = useState(1)
  const [form] = Form.useForm();
  // console.log(props)
  // console.log(loading)
  const submitSelect=async(data)=>{
    // console.log(data)
    if(step===1){
      _checkCode(data.code)
    }else{
      _updatePassword(data.newPassword)
    }
  }
  const _checkCode=async (smCode)=>{
    const{data,msg}=await checkCode({smCode})
    if(data){
      setStep(2)
    }else{
      message.error(msg)
    }
    // console.log(data,msg)
  }
  const _updatePassword=async(newPWD)=>{
    const {data,msg}=await resetPassword({newPassword:newPWD})
    // console.log(data)
    if(data){
      message.success('success reset');
      props.history.replace('/users/login')
    }else{
      message.error('password length should longer than 5')
    }
  }
  const ComponentSelector = (props) => {
    return step == 1 ? <CodeLogin {...props} /> : <UpdatePassword {...props} />
  }
  // console.log(ComponentSelector())
  return (
    <div className='form forget-password'>
      <div className="forget-password-title">
        {step === 1 ? 'forget password' : 'reset password'}
      </div>
      <Form form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={submitSelect}
        autoComplete="off"
      >
        {ComponentSelector({ form, Input })}
        <Form.Item >
          <Button block={true} type="primary" htmlType="submit"
            >
            {step===1?'next':'reset'}
          </Button>
        </Form.Item>
    
      </Form>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}
export default connect()(forgetPassword)