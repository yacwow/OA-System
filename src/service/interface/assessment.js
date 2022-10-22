//- 引入封装好的fetch方法
import myFetch from '../http.js';

//- 获取绩效考核列表
export const assessmentList = (params) =>
  myFetch.post('/getAssessmentList', params);

// - 获取绩效详情
export const getAssessmentInfo = ({ _id }) =>
  myFetch.get(`/assessment/${_id}`, {});

// - 更新绩效信息
export const updateAssessmentDetail = (params) =>
  myFetch.put(`/assessment/${params._id}`, params);

// - 创建绩效信息
export const createAssessment = (params) => myFetch.post(`/assessment`, params);

// - 删除绩效考核
export const deleteAssessment = (params) =>
  myFetch.post(`/destroyAssessment`, params);
