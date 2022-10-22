import React, { useState } from 'react'
import { Table, Button, Modal } from 'antd'
import iconMap from '@/components/iconMap'
import AddChildModal from './AddChildModal'
const { Column } = Table
export default function ChildDepartment({ childList, pushOrUpdateList, departmentDetail }) {
    // console.log(departmentDetail)
    const [delList, setDelList] = useState([])
    const [showDelModal, setShowDelModal] = useState(false);
    const [showChildModal, setShowChildModal] = useState(false);

    const getDepartmentList = () => {
        setShowChildModal(true)
    }
    const delDepartment = () => {
        setShowDelModal(false);
        if (departmentDetail) {
            pushOrUpdateList({ list: delList, type: 'del' });
        } else {
            // console.log('in')
            const ids = delList.map((item) => item._id);
            const tempArr = childList.filter((item) => !ids.includes(item._id));
            pushOrUpdateList({ list: tempArr, type: 'add' });
        }
    };
    return (
        <>
            <Table
                dataSource={childList}
                expandIconColumnIndex={-1}
                rowSelection={{ onChange: (ids, record) => setDelList(record) }}
                pagination={false}
                rowKey={record => record._id}
            >
                <Column title='name' dataIndex="departmentName"></Column>
            </Table>
            <div className="operation">
                <Button type='primary'
                    onClick={getDepartmentList} icon={iconMap.api}>addChildDep</Button>
                <Button type='danger' disabled={!delList.length}
                    onClick={() => { setShowDelModal(true) }}
                    icon={iconMap.api}>unlinkDep</Button>
            </div>

            <AddChildModal
                showChildModal={showChildModal}
                setShowChildModal={setShowChildModal}
                pushOrUpdateList={pushOrUpdateList}>
                    exists={childList}
            </AddChildModal>


            <Modal
                title="hint"
                visible={showDelModal}
                onOk={delDepartment}
                onCancel={() => setShowDelModal(false)}
            >
                confirm to delete
            </Modal>
        </>
    )
}
