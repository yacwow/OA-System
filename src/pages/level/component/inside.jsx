import React from 'react'
import { EditableCell, EditableRow } from './editable'
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import { useContext, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'umi'
import iconMap from '@/components/iconMap';

export default function inside({ dataSource, userInfo,handleSave ,openDetailDialog}) {
    const {loading}=useSelector(state=>state)
    const dispatch=useDispatch()
    // console.log(loading)
    const defaultColumns = [
        {
            title: 'levelName',
            dataIndex: 'levelName',
            editable: true,
            render: (data, { _id }) => {
                // console.log(data, _id)
                return (
                    <>
                        <span className="user-name">{data}</span>
                        {userInfo.identity === 1 && <span style={{ cursor: "pointer" }} onClick={(e) => {
                            e.stopPropagation();
                            openDetailDialog(_id)
                        }
                        }>{iconMap.detail}</span>}
                    </>
                )
            }
        },
        {
            title: 'levelDescription',
            dataIndex: 'levelDescription',
            editable: true,
        },
        {
            title: 'assessmentRequire',
            dataIndex: 'assessmentRequire',
            editable: true,
        },
        {
            title: 'interviewRequire',
            dataIndex: 'interviewRequire',
            editable: true,
        },
        {
            title: 'baseNumber',
            dataIndex: 'baseNumber',
            editable: true,
        },
        {
            title: 'levelScore',
            dataIndex: 'levelScore',
            editable: true,
        },
    ];




    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }

        //最多添加一个type 一个rules  看情况吧
        return {
            ...col,
            onCell: (record) =>{
                // console.log(record);
                 return ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            })},
        };
    });



    const onSelectChange = (ids) => {
        // console.log(ids);
        dispatch({ type: 'common/saveSelectIds', payload: { ids } });
      };


    return (
        <div>

            <Table
                scroll={{ x: true }}
                pagination={false}
                components={components}
                rowClassName={() => 'editable-row'}
                 loading={loading.effects['level/_initialLevelListAndTotal']}
                bordered
                dataSource={dataSource}
                columns={columns}
                rowSelection={{ onChange: onSelectChange }}
                rowKey={(record) => record._id}
            />
        </div>
    );
}
