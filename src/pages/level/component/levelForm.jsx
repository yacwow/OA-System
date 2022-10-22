import React from 'react'
import { Form, Row, Col, Input, Button } from 'antd'
import levelList from '@/staticList/levelList'
import { createLevel } from '@/service/interface/level'

export default function levelForm({ setDialogStatus, reloadList }) {
    const [form] = Form.useForm();
    const _onFinish = async(arg) => {
        // const res=form.getFieldsValue()
        // console.log(res,arg)
        const res=await createLevel(arg)
        setDialogStatus(false)
        reloadList()
        // console.log(res)
    }
    return (
        <Form form={form} layout='vertical'
            onFinish={_onFinish}>
            {
                levelList.map((items,index) => {
                    return (<Row key={index} justify={'space-between'}>
                        {
                            items.map((item, insideIndex) => {
                                return (<Col span={11} key={insideIndex}>
                                    <Form.Item label={item.labelTxt}name={item.itemName}>
                                        <Input placeholder={item.initVal}
                                            onBlur={() => {

                                            }}></Input>
                                    </Form.Item>
                                </Col>)
                            })
                        }

                    </Row>
                    )
                })
            }
            <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' onClick={() => {}}>
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}
