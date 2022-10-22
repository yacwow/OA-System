import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'umi';
import OrgTree from 'react-org-tree';
import Loading from '@/components/loading'

const Tree = ({ getDepartmentDetail }) => {
  const loading=useSelector(state=>state.loading)
  const departmentList = useSelector((state) =>
    JSON.parse(
      JSON.stringify(
        state.department.departmentList.filter(
          (item) => !item.parentLists.length,
        ),
      ),
    ),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'department/_initDepartmentList',
      payload: {},
    });
  }, []);
  // console.log(loading.effects['department/_initDepartmentList'])
  const addProps = (list) => {
    list.forEach((item) => {
      item.label = item.departmentName;
      item.id = item._id;
      item.children && item.children.length && addProps(item.children);
    });
  };

  addProps(departmentList);

  //- 获取当前选定的内容
  const selectData = (e, data) => {
    getDepartmentDetail(data.id, data.departmentName);
  };

  const renderData = {
    id: -1,
    label: 'Company Structure',
    children: departmentList,
  };

  return (
    <><Loading part={true} isShow={loading.effects['department/_initDepartmentList']}></Loading>
    <OrgTree
      data={renderData}
      horizontal={false}
      collapsable={false}
      expandAll={true}
      onClick={selectData}
    />
    </>
  );
};

export default Tree;
