import {getLevelList,getLevelInfo} from '@/service/interface/level'
export default{
    namespace:'level',
    state:{
        levelList:[],
        levelTotal:0,
        levelDetail: null
    },
    reducers:{
        initialLevelListAndTotal(state,{payload}){
            return({...state,...payload})
        },
        saveLevelDetail: (state, { payload }) => ({ ...state, ...payload }),
    },
    effects:{
        *_initialLevelListAndTotal({payload},{call,put}){
            // console.log(payload)
           const {data}= yield call(getLevelList,payload);
        //    console.log(data)
           yield put({
            type:'initialLevelListAndTotal',
            payload:{
                levelList:data.list,
                levelTotal:data.total
            }
           })
        },
        *_getLevelDetail({ payload }, { put, call }) {
            const { data } = yield call(getLevelInfo, payload);
            // console.log(data)
            yield put({
              type: 'saveLevelDetail',
              payload: { levelDetail: data },
            });
            yield put({
              type: 'common/setShowDetailDialog',
              payload: { isShowDetailDialog: true },
            });
          },
    }
}