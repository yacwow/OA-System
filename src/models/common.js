import { queryUserLogin, getRouteList } from '../service/interface/user'
//包括鉴权和一个collapse属性
export default {
    namespace: 'common',
    state: { 
        collapse: true,
        isShowDetailDialog:false ,
        isClearForm:false,
        ids:[]
    },
    subscriptions: {
        setup({ dispatch, history }) {
            dispatch({
                type: `queryUser`,
                payload: { history }
            })
        }
    },
    reducers:{
        changeCollapse:(state,{payload}) =>{
            // console.log('in')
            return ({ ...state, ...payload })
        } ,
        setShowDetailDialog(state,{payload}){
            return ({...state,...payload})
        },
        clearForm(state,{payload}){
            return ({...state,...payload})
        },
        saveSelectIds(state,{payload}){
            return ({
                ...state,...payload
            })
        }
    },
    effects: {
        *queryUser({ payload }, { put, call }) {
            const { history, history: { location: { pathname } } } = payload;
            if (pathname !== 'users/login' && pathname !== 'user/forgetpwd') {
                if (!sessionStorage.getItem('userProfile') || !sessionStorage.getItem('token')
                    || !sessionStorage.getItem('routeList')) {
                    // console.log('in')
                    //没有存储的信息，直接跳回login
                    history.replace('/users/login')
                } else {
                    //验证一下我的token有没有问题
                    const res = yield queryUserLogin()
                    // console.log(res)
                    if (res.code !== 0) return
                    const { data: routeList } = yield getRouteList();
                    sessionStorage.setItem('routeList', JSON.stringify(routeList||[]));
                }
            } else {
                //不需要鉴权直接能过去的,为了防止session错误，直接清空了让redux再次赋值
                sessionStorage.clear()
            }

        }
    }
}