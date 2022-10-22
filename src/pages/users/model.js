import {userLogin,getRouteList} from '../../service/interface/user'
// import service from '../../service/index'
import {message} from 'antd'
import {history} from 'umi'


export default{
    namespace:'user',
    state:{
        userInfo:sessionStorage.getItem('userProfile')?JSON.parse(sessionStorage.getItem('userProfile')):null,
    },
    reducers:{
        updateUserInfo:(state,{payload})=>({...state,...payload})
    },
    effects:{
        *login({payload},{put,call,select}){
            const {data,msg}=yield call(userLogin,payload)
            if(!data){
                message.error('please check the account name and pwd')
                return
            }
            const {data:routeList}= yield call(getRouteList);
            // console.log(routeList)
            sessionStorage.setItem('userProfile',JSON.stringify(data))
            sessionStorage.setItem('routeList',JSON.stringify(routeList))

            yield put({
                type:'updateUserInfo',
                payload:{userInfo:data}
            })
            history.push(routeList[0].route)
        }
    }
}