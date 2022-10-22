// import myFetch from '../http'

// export const initialEmployee=()=>{
//     return myFetch.get('/analyzeStaff')
// }

// initialEmployee().then(res=>console.log(res))

//- 引入封装好的fetch方法
import myFetch from '../http.js';

//- 用户登录接口api
export const analyzeStaff = () => myFetch.get('/analyzeStaff');
