import {Tag} from 'antd'
import {mapData} from '@/utils/mapData'
export const columnData={
    assessment:[{
        title:'name',
        dataIndex:'staffName',
        render:data=>data.userName
    },
    {
        title:'level',
        dataIndex:'result',
    },
    {
        title:'adjustLevel',
        dataIndex:'currentLevel',
        render:data=>data.levelName
    },
    {
        title:'standardScore',
        dataIndex:'standardScore',
    },
    {
        title:'assessmentScore',
        dataIndex:'assessmentScore',
    },],
    rewards:[{
        title:'name',
        dataIndex:'staffName',
        render:data=>data.userName
    },
    {
        title:'rewards',
        dataIndex:'type',
        render:data=>{
            return <Tag color={'cyan'}>{mapData.rewardType[data]}</Tag>
        }
    },
    {
        title:'date',
        dataIndex:'date',
        render:data=>data.split('T')[0]
    },
    {
        title:'reason',
        dataIndex:'reason',
    },

    ],
    salary: [
        {
          title: '员工姓名',
          dataIndex: 'staffName',
          render: (data) => data.userName,
        },
        {
          title: '调整后薪资',
          dataIndex: 'newSalary',
        },
        {
          title: '时间',
          dataIndex: 'startTime',
          render: (data) => data.split('T')[0]
        },
        {
          title: '调薪原因',
          dataIndex: 'reason',
        },
      ],

}