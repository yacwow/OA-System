import React, { useState } from 'react'
import AccountLogin from './components/AccountLogin'
import CodeLogin from './components/CodeLogin'
import { Button, Checkbox, Form, Input } from 'antd';
import iconMap from '../../components/iconMap';
import logoImg from '../../common/img/logo.svg'
import {connect,useSelector} from 'umi'
import './css/login.less'
function login(props) {
    const [type, setType] = useState(0)
    const [form] = Form.useForm();
    // console.log(props)
    const loading=useSelector(state=>state.loading)
    // console.log(loading)
    const submitUserInfo = (data) => {
        props.dispatch({
            type:'user/login',
            payload:{...data,type
            }
        })
    }
    const ComponentSelector = (props) => {
      return  !type ? <AccountLogin {...props} /> : <CodeLogin {...props} />
    }
    // console.log(ComponentSelector())
    return (
        <div className='form'>
            <div className="logo">
                <img src={logoImg} alt="" />
                <span>Management System-Based on React</span>
            </div>
            <Form form={form}
                name="basic"

                initialValues={{ remember: true }}
                onFinish={submitUserInfo}
                autoComplete="off"
            >
                {ComponentSelector({ form, Input })}
                <Form.Item >
                    <Button block={true} type="primary" htmlType="submit"
                    loading={loading.effects['user/login']}>
                        Submit
                    </Button>
                </Form.Item>
                <Form.Item>
                    <span >
                        forgot Pwd
                    </span>
                    <span onClick={()=>{setType(!type)}} style={{ marginLeft: '60px'}}>

                        {type ? ` use account to login` : `use phone to login`}
                    </span>
                    {iconMap.arrowRight}
                </Form.Item>
            </Form>
        </div>
    )
}
const mapStateToProps=(state)=>{
    return {
       userInfo:state.userInfo 
    }
}
export default connect()(login)