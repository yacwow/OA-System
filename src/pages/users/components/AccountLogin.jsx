import React from 'react'
import { Form } from 'antd';
import IconMap from '../../../components/iconMap'

export default function accountLogin({ Input, form }) {
    return (
        <>
            <Form.Item
                hasFeedback
                name="accountName"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input
                    prefix={IconMap.userIcon}
                    placeholder='username/default admin' />
            </Form.Item>

            <Form.Item
                hasFeedback
                name="password"
                rules={[{ required: true, message: 'Please input your password!' },
                {min:6,message:'pwd can not less than 6'}]}
            >
                <Input.Password
                    prefix={IconMap.passwordIcon} placeholder='password/default 123qwe' />
            </Form.Item>
        </>
    )
}


{/* 

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item> */}