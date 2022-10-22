//- 引入封装好的fetch方法
import myFetch from '../http.js';

export const getAttendanceTable = () => myFetch.get('/getAttendanceTable');

// - 考勤信息列表
export const getAttendance = (params = {}) =>
  myFetch.post('/getAttendance', params);

// - 获取考勤信息详情
export const attendanceDetail = ({ _id }) =>
  myFetch.get(`/getAttendanceDetail/${_id}`, {});

// - 新增考勤信息
export const createAttendance = (params) =>
  myFetch.post(`/createAttendance`, params);

// - 修改考勤信息
export const updateAttendance = (params) =>
  myFetch.put('/updateAttendance', params);

// - 删除指定考勤信息
export const deleteAttendance = (params) =>
  myFetch.post('/deleteAttendance', params);
