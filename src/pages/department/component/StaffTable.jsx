/**
 * 解决不了上一级的bug  这个组件就不用了
 */
import React from 'react';
import { Table } from 'antd';
import { mapData } from '@/utils/mapData';
import { formatYear } from '@/utils/format';

const StaffTable = ({ staffList }) => {
  const columns = [
    {
      title: 'name',
      dataIndex: 'userName',
      align: 'center',
    },
    {
      title: 'gender',
      dataIndex: 'gender',
      render: (record) => <span>{mapData.gender[record]}</span>,
      align: 'center',
    },
    {
      title: 'age',
      dataIndex: 'idNumber',
      align: 'center',
      render: (record) => <span>{formatYear(record, 'age')}</span>,
    },
    {
      title: 'hometown',
      dataIndex: 'hometown',
      align: 'center',
      render: (record) => <span>{record ? record : '---'}</span>,
    },
    {
      title: 'phone',
      dataIndex: 'mobile',
      align: 'center',
    },
    {
      title: 'education',
      dataIndex: 'education',
      align: 'center',
      render: (record) => <span>{mapData.education[record]}</span>,
    },
    {
      title: 'enrolledTime',
      dataIndex: 'onboardingTime',
      align: 'center',
      render: (record) => (
        <span>
          {!formatYear(record) ? 'current year' : formatYear(record) + 'year'}
        </span>
      ),
    },
    {
      title: 'avatar',
      dataIndex: 'avatar',
      align: 'center',
      render: (src) => <img height="50" src={src} alt="" />,
    },
    {
      title: 'graduatedSchool',
      dataIndex: 'graduatedSchool',
      align: 'center',
    },
  ];

  return (
    <Table
      dataSource={staffList}
      columns={columns}
      rowKey={(record) => record._id}
      className="department-staff-list-wrapper"
      pagination={false}
      align="center"
      bordered
    />
  );
};

export default StaffTable;
