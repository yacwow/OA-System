import React, { useEffect, useState } from 'react'
import { Form, Input } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

export default function FilterForLevel({ reload }) {
    const [form] = Form.useForm()
    const [queryData, setQueryData] = useState({
        levelName: null,
        levelDescription: null,
    })
    const dispatch = useDispatch()
    const { isClearForm } = useSelector(state => state.common)
    //如果有一个isclear的状态，我们就清空这个表单
    useEffect(() => {
        if (isClearForm) {
            form.resetFields()
            reload()
            setQueryData({
                levelName: null,
                levelDescription: null,
            })
            dispatch({ type: 'common/clearForm', payload: { isClearForm: false } })
        }
    }, [isClearForm])
    //向服务器搜索数据
    const searchStaff = (data) => {
        var temp={...queryData};
        temp[data]=form.getFieldValue(data)
        setQueryData({
            // ...queryData,
            ...temp
        }) 
        Object.keys(temp).map(item=>!temp[item]&&delete temp[item])
        // console.log(form.getFieldValue(data))
        // tempData[data]=form.getFieldValue(data);
        // console.log(queryData,temp)
        // const res = form.getFieldsValue()
        // console.log(data, res)
         reload(temp);
    }
    return (<>
        <Form form={form} layout="vertical">
            <Form.Item label="levelName" name="levelName">
                <Input onPressEnter={() => searchStaff('levelName')}
                    onBlur={() => searchStaff('levelName')} />
            </Form.Item>
            <Form.Item label="levelDescription" name="levelDescription">
                <Input onPressEnter={() => searchStaff('levelDescription')}
                    onBlur={() => searchStaff('levelDescription')} />
            </Form.Item>
        </Form>
    </>
    )
}