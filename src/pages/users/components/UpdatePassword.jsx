import React from 'react'
import { Form, Input } from 'antd'
import iconMap from '../../../components/iconMap';

export default function UpdatePassword({ form }) {
  return (
    <div>
      <Form.Item
        hasFeedback
        name="newPassword"
        rules={[{ required: true, message: 'password can not be blank!' }]}
      >
        <Input.Password
          prefix={iconMap.Lock}
          placeholder='please input new password' />
      </Form.Item>

      <Form.Item
        hasFeedback
        name="matchPassword"
        rules={[{
          validator: (rules, val) => {
            switch (true) {
              case !Boolean(val):
                return Promise.reject('password can not be blank');
              case form.getFieldValue('newPassword') !== val:
                return Promise.reject('password should match ');
              default:
                return Promise.resolve();
            }
          }
        }]}
      >
        <Input.Password
          prefix={iconMap.Lock} placeholder='re-enter new password' />
      </Form.Item>
    </div>
  )
}
