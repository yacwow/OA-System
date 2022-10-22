import React from 'react'
import { Table, Tag } from 'antd';
export default function ViolationTable({title,renderList}) {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'staffName',
      render: (x) => x?.userName || '--',
    },
    {
      title: 'AttendanceTime',
      dataIndex: 'createTime',
      render: (createTime) => createTime.split('T')[0],
    },
    {
      title: 'AttendanceType',
      dataIndex: 'attendanceType',
      render: (attendanceType) => (
        <Tag color="red">{attendanceType === 4 ? 'Come Late' : 'Early leave'}</Tag>
      ),
    },
    {
      title: 'Department',
      dataIndex: 'staffName',
      render: (x) => (
        <Tag>
          {x?.department ? x.department.departmentName : 'No DepartmentInfo'}
        </Tag>
      ),
    },
  ];
  return (
    <div className="block-container">
      <div className="title">{title}</div>
      <Table
        dataSource={renderList}
        rowKey={(columns) => columns._id}
        columns={columns}
        pagination={false}
      />
    </div>
  );
}
