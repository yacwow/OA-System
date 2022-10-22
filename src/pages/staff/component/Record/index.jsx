import React, { useEffect, useState } from 'react'
import {assessmentList} from '@/service/interface/assessment'
import { Table } from 'antd'
import { columnData } from './tableColumn'
// import Loading from '@/components/loading'
export default function Record({ interfaceName, requestData, type }) {
  const [source, setSource] = useState([]);
  const [loading, setLoading] = useState(false)
  // console.log(columnData[type])
  useEffect(async () => {
    setLoading(true);
    const res = await assessmentList[interfaceName]({ ...requestData })
    // console.log(res)
    setSource(res.data.list);
    setLoading(false);
  }, [])
  return (
    <div>
      <Table
      pagination={{defaultPageSize:4}}
        columns={columnData[type]}
        rowKey={columns => columns._id}
        dataSource={source} loading={loading}></Table>
      {/* <Loading isShow={loading} /> */}
    </div>
  )
}
