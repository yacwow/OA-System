import {assessmentList,getAssessmentInfo} from '@/service/interface/assessment'

export default {
  namespace: 'assessment',
  state: {
    assessmentList: [],
    total: 0,
    assessmentDetail: null,
  },
  reducers: {
    saveAssessment: (state, { payload }) => ({ ...state, ...payload }),
    saveAssessmentDetail: (state, { payload }) => ({ ...state, ...payload }),
  },
  effects: {
    *_initAssessmentList ({ payload }, { put, call }) {
      const { data, total } = yield call(assessmentList, payload);
      yield put({
        type: 'saveAssessment',
        payload: { assessmentList: data.list, total },
      });
    },
    *getAssessmentInfo ({ payload }, { put, call }) {  //- 获取绩效考核详情
      const { code, data, msg } = yield call(getAssessmentInfo, payload);
      yield put({
        type: 'saveAssessmentDetail',
        payload: { assessmentDetail: data },
      });
      yield put({
        type: 'common/setShowDetailDialog',
        payload: { isShowDetailDialog: true },
      });
    },
  },
};
