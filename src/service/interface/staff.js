import myFetch from '../http.js';

export const getStaff=(params)=>myFetch.post('/getStaff',params)

export const getStaffDetail=(id)=>myFetch.get(`/staffDetail/${id}`)

export const createStaff=(params)=>myFetch.post(`/createStaff`,params)

export const updateStaff=params=>myFetch.put(`/updateStaff`,params)

export const destroyStaff=params=>myFetch.post(`/destroyStaff`,params)

//检测用户名/手机号是否有效
export const checkIsExists=(params)=>myFetch.post('/checkIsExists',params)

//- 文件上传token获取
export const getUploadToken = (params) => myFetch.get('/getUploadToken', params);

//- 删除图片
export const deleteFile = params => myFetch.post('/deleteFile',params)