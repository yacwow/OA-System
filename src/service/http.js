import  qs  from 'qs'
import { message } from 'antd'
import { history } from 'umi'
const fetch = require('dva').fetch;

//创建一个状态码处理函数
const checkStatus = (res) => {
    // console.log(res)
    if (res.status < 300 && res.status >= 200) {
        return res;
    }
    message.error(`network request error,${res.status}`)
    throw new Error(res.statusText);
}
const checkCode = async (res) => {
    const Res = await res.clone().json();
    if (Res.code !== 0) {
        message.error(`${Res.msg}${Res.code}`)
        //如果返回的不是0，那应该是数据有问题的，我们直接跳转回登录页面并清空session，以后可以自己设置
        history.replace('/users/login')
        sessionStorage.clear()
    }
    return res
}
//处理错误
const handleError = (error) => {
    if (error instanceof TypeError) {
        message.error(`network request error${error}`)
    }
    return {
        code: -1,
        data: false
    }
}
class Http {
    static async staticFetch(url, options) {
        // 对url进行统一处理
        url = '/api' + url;
        const defaultOptions = {
            mode: 'cors', //- 支持跨域处理，以cors的形式进行跨域
            headers: {
                Authorization: sessionStorage.getItem('token') || null,
            },
        };

        if (options.method === 'POST' || options.method === 'PUT') {
            defaultOptions.headers['Content-type'] = 'application/json;charset=utf-8';
        }

        // 合并options选项
        const newOptions = { ...defaultOptions, ...options };
        return fetch(url, newOptions).then(checkStatus)
            .then(checkCode).then(res => {
                // console.log(res)
                //获取token并存储，不太清楚这里res的格式
                const token = res.headers.get('Authorization')
                token && sessionStorage.setItem('token', token)
                return res.json();
            }).catch(handleError)
    }

    //post请求
    post(url, params = {}, option = {}) {
        const options = Object.assign({ method: 'POST' }, option);
        options.body = JSON.stringify(params);
        return Http.staticFetch(url, options);
    }

    put(url, params = {}, option = {}) {
        const options = Object.assign({ method: 'PUT' }, option)
        options.body = JSON.stringify(params);
        return Http.staticFetch(url, options)
    }

    get(url, option = {}) {
        const options = Object.assign({ method: 'GET' }, option)
        Object.keys(option) && (url += '?' + qs.stringify(option))
        // console.log(url)
        return Http.staticFetch(url, options)
    }
    del(url, option = {}) {
        const options = Object.assign({ method: 'DELETE' }, option)
        Object.keys(option) && (url += '?' + qs.stringify(option))
        return Http.staticFetch(url, options)
    }
}

const resFun = new Http();
export default resFun;