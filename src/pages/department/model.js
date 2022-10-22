import {getDepartmentList,getDepartmentDetail,addDepartment,updateDepartment} from '@/service/interface/department'
import {message} from 'antd'
export default {
  namespace: 'department',
  state: {
    departmentList: [],
    departmentDetail: null,
    showModalDialog: false,
  },
  reducers: {
    //- 保存部门列表
    saveDepartmentList: (state, { payload }) => ({ ...state, ...payload }),
    //- 保存部门详情
    saveDepartmentDetail: (state, { payload }) => ({ ...state, ...payload }),
    saveShowModalDialog: (state, { payload }) => ({ ...state, ...payload }),
  },
  effects: {
    //- 获取部门列表
    *_initDepartmentList({ payload }, { put, call }) {
      const { data } = yield call(getDepartmentList, payload);
      yield put({
        type: 'saveDepartmentList',
        payload: { departmentList: data.list },
      });
    },
    //- 获取部门详情
    *_getDepartmentDetail({ payload }, { put, call }) {
      // console.log(payload)
      const { data } = yield call(getDepartmentDetail, payload);
      //  console.log(data)
      yield put({
        type: 'saveDepartmentDetail',
        payload: { departmentDetail: data },
      });
      // console.log('change departmentdetail')
      yield put({
        type: 'saveShowModalDialog',
        payload: { showModalDialog: true },
      });
      // console.log('change showModalDialog')
    },
    *_addDepartment({payload},{put,call}){
      // console.log('in')
      const {code}=yield addDepartment(payload)
      if(code) return;
      console.log(code);
      
      message.success('success added')
      yield put({
        type:'_initDepartmentList',
        payload:{}
      })
    },
    *updateDepartmentDetail({ payload }, { put, call }) {
      const { code, msg } = yield call(updateDepartment, payload);
      if (code) return;
      message.success(msg);
      yield put({
        type: '_initDepartmentList',
        payload: {},
      });
      yield put({
        type: '_getDepartmentDetail',
        payload: { _id: payload._id },
      });
    },
  },
};
