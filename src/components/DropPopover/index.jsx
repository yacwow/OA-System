import React, { useState, useEffect } from 'react';
import { Popover, Input, List, Pagination } from 'antd';
import './index.less';
import { useDispatch, useSelector } from 'react-redux';
const { Search } = Input
import {getDepartmentList} from '@/service/interface/department'
import {getLevelList }from '@/service/interface/level'
import { getStaff } from '@/service/interface/staff';

const DropPopover = ({ placeHolderVal, interfaceName, searchType, getSelectItem }) => {
  //  console.log(interfaceName)
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1)
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  let pageSize=5;
  useEffect(() => {
    _initList();
  }, [])
  const form ={
    departInt:getDepartmentList,
    getDepartmentList:getDepartmentList,
    levelInt:getLevelList,
    getLevelList:getLevelList,
    getStaffList:getStaff,
  }
  // console.log(form[interfaceName])
  const handleSearch=(val)=>{
    const searchVal=!val?{}:{[searchType]:val}
    setPage(1)
    _initList(searchVal);
  }

  const _initList = async (queryData = {},page=1) => {
    // console.log(form,interfaceName,page,queryData)
    const { data } = await form[interfaceName]({
      page: page,
      size: 5,
      departmentName:queryData&&queryData.departmentName,
      queryData
    });
    // console.log('in')
    // console.log(data)
    setTotal(data?.total||data.staffTotal);
    setList(data?.list||data.staffList);
  };
  const handleChange = (page) => {
    // console.log(page,'in2')
    setPage(page)
    _initList({},page);
  }
  const selectItem = (item) => {
    setVisible(false);
    getSelectItem(item);
  };
  return (
    <>
      <Popover
        placement="bottomRight"
        title={<Search placeholder={placeHolderVal}
        onSearch={handleSearch}></Search>}
        content={
          <List
          dataSource={list}
          renderItem={item=>{
            // console.log(item)
            return <List.Item  style={{ cursor: 'pointer' }} onClick={() => selectItem(item)}>
              {item[searchType]}
            </List.Item>
          }}
          footer={
            <Pagination onChange={handleChange}
              current={page}
              pageSize={pageSize}
              total={total}>
            </Pagination>
          } 
          >
          </List>
        }
        trigger="click"
      >
        <span className="add-icon">+</span>
      </Popover>
    </>
  );
};

export default DropPopover;
