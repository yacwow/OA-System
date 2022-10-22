//- 引入封装好的fetch方法
import myFetch from '../http.js';

//- 获取部门列表
export const getLevelList = params => myFetch.post('/getLevel', params)

// - 获取职级详情
export const getLevelInfo = ({ _id }) => myFetch.get(`/getLevelDetail/${_id}`, {});

// - 更新职级信息
export const updateLevelDetail = (params) =>
  myFetch.put(`/updateLevel/${params._id}`, params);

// - 创建员工
export const createLevel = (params) => myFetch.post(`/createLevel`, params);

// - 删除员工
export const deleteLevel = (params) => myFetch.post(`/destroyLevel`, params);
