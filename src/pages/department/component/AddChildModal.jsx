import React, { useState } from 'react'
import { Modal, Table } from 'antd'
import { useSelector } from 'umi';
const { Column } = Table

export default function AddChildModal({ showChildModal, setShowChildModal, pushOrUpdateList,exists=[] }) {
    const { departmentDetail } = useSelector((state) => state.department);
    const departmentList = useSelector((state) => {
        return state.department.departmentList.filter((item) => {
            return !item.parentLists.length&&departmentDetail?._id!==item._id&&!exists.map(item=>item._id).includes(item._id)
        });
    })
    // console.log(departmentList)

    // console.log(departmentDetail)
    const [childList, setChildList] = useState([]);
    const clearSelect = () => {
        setShowChildModal(false);

    }
    const addChildList = () => {
        // console.log(childList,departmentDetail ? 'update' : 'add')
        if(departmentDetail){
            pushOrUpdateList({list: childList, type: 'update'});
        }else{
            pushOrUpdateList({list: childList.concat(exists), type: 'add'});
        }
       
       
        // console.log('innnnnnn')
        setShowChildModal(false)
    }
    return (
        <Modal
            title='add child department'
            visible={showChildModal}
            onCancel={clearSelect}
            onOk={addChildList}
            destroyOnClose>
            <Table
                pagination={false}
                dataSource={departmentList}
                expandIconColumnIndex={-1}
                // expandIcon={false}
                rowSelection={{
                    onChange: (ids, record) => { setChildList(record)
                    }
                }}
                rowKey={(record) => {
                    // console.log(record); 
                    return record._id
                }}>
                <Column title="departmentName" dataIndex="departmentName" />
            </Table>
        </Modal>
    )
}
