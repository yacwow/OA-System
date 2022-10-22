import {getStaff,getStaffDetail} from '../../service/interface/staff'

export default{
    namespace:'staffDetail',
    state:{
        staffList:[],
        staffTotal:0,
        staffDetail:null,
    },
    reducers:{
        staffListReducer(state,{payload}){
            const newStaffList=payload.staffList;
            
            return ({...state,staffList:[...newStaffList],staffTotal:payload.staffTotal})
        },
        staffDetailReducer(state,{payload}){
            return ({...state,...payload})
        }
    },
    effects:{
        *initialStaffList({payload},{put,call}){
            const {data}=yield call(getStaff,payload);
            console.log(data);
            
            yield put({type:'staffListReducer',payload:data})
        },
        *getStaffDetail({payload},{put,call}){
            // console.log(payload)
            const{data,msg}=yield call(getStaffDetail,payload)
            console.log(data);
            yield put({type:'staffDetailReducer',payload:{staffDetail:data}})
            yield put({type:'common/setShowDetailDialog',payload:{isShowDetailDialog:true}})
        }
    }
}