import myFetch from '../http'

//用户登录

export const userLogin = (params) => {
    return myFetch.post('/login', params)
}
//获取手机验证码
export const getSmCode = params => myFetch.get('/getCode', params);
//重置密码手机验证码接口
export const checkCode = (params) => {
    return myFetch.get('/checkSmCode', params);
}
//重置密码
export const resetPassword = params => {
    return myFetch.post('/resetPassword', params)
}
//检测token是否正确
export const queryUserLogin=params=>{
    return myFetch.get('/queryLoginStatus')
}

//获取路由表
export const getRouteList=()=>{return myFetch.get('/getRouteList')}


// let requestInstance = new Request('/api/login', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json;charset=utf-8'
//     },
//     body: '{"accountName": "admin","password": "123qwe", "type": 0}'
// })
// // fetch方法参数同Request实例
// // 第一个参数为url或者Request实例
// // 第二个参数为请求配置项
// fetch(requestInstance).then(response => {
//     // 返回的是一个Response的实例
//     // 调用Response实例的序列化方法，序列化成json,返回值是一个promise
//     // 序列化方法有 json,text,formData,blob,arrayBuffer,redirct
//     let result = response.json()
//     result.then(res => {
//         console.log(res)
//     })
// })