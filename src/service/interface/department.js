//- 引入封装好的fetch方法
import myFetch from '../http.js';

//- 获取部门列表
export const getDepartmentList = params => myFetch.get('/department', params)

export const getDepartmentDetail = (params) =>
    myFetch.get(`/department/${params._id}`);


//- 新增部门
export const addDepartment = (params) => myFetch.post('/department', params);

//- 修改部门
export const updateDepartment = (params) =>
    myFetch.put(`/department/${params._id}`, params);
