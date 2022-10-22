import { Table,message } from 'antd';
import React, { useState } from 'react';
import {useDispatch} from 'umi'
import { EditableCell, EditableRow } from './editable';
import myColumns from './column'
import Dialog from '../../../components/Dialog'
import Record from './Record/index'
import {checkIsExists,updateStaff} from '@/service/interface/staff'

export default function TableList({ userInfo, staffList, loading,reloadPage }) {
    const [currentRecord, setCurrentRecord] = useState([]);
    const [dialogStatus, setDialogStatus] = useState(false);
    const dispatch=useDispatch()
    const handleSave = async (data) => {
        const test=data.updateVal
        // const newData = [...dataSource];
        // const index = newData.findIndex((item) => row.key === item.key);
        // const item = newData[index];
        // newData.splice(index, 1, { ...item, ...row });
        // setDataSource(newData);
        if (data.type === 'mobile') {
            const checkData = { mobile: test };
            const { data, msg } = await checkIsExists({ checkData });
            // console.log(data,msg)
            if (data) return message.error(msg);
          }
        //   console.log(data)
          //- 修改表单操作
          const { code, msg } = await updateStaff(data);
          if (code) return message.error(msg);
          message.success('edit success');
          reloadPage();
    };
    const openReviewRecord = (record) => {
        console.log(record)
        setDialogStatus(!dialogStatus)
        setCurrentRecord(record)
    }
    const openDetailDialog=(_id)=>{
        dispatch({type:'staffDetail/getStaffDetail',payload:_id})
    }
    const onselectChange=(ids)=>{
        dispatch({
            type: 'common/saveSelectIds',
            payload: {
              ids,
            },
          });
    }
    return (<>
        <Table
            components={{
                body: {
                    row: EditableRow,
                    cell: EditableCell,
                },
            }}
            rowClassName={() => 'editable-row'}
            bordered
            rowKey={(record) => record._id}
            rowSelection={{onChange:onselectChange}}
            scroll={{ x: true }}
            dataSource={staffList}
            pagination={false}
            loading={loading.effects['staffDetail/initialStaffList']}
            columns={myColumns({ userInfo, handleSave, openReviewRecord,openDetailDialog })}
        />
        <Dialog title={currentRecord?.title}
        dialogStatus={dialogStatus}
        setDialogStatus={setDialogStatus}
        render={()=>(<Record {...currentRecord}></Record>)}></Dialog>
    </>
    )
}
