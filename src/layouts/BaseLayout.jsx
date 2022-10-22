import React, { useState } from 'react'
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import './BaseLayout.less'
import SideBar from '../components/SideBar';
import CommonHeaders from '../components/CommonHeaders'
import { history, useSelector,useDispatch } from 'umi'
import NotFoundPage from '../pages/404'
import Loading from '@/components/loading'
export default function BaseLayout({ children }) {
    const { location } = history;
    const routeList = JSON.parse(sessionStorage.getItem('routeList'));
    const loading = useSelector(state => state.loading)
    let collapse=useSelector(state=>state.common.collapse)
    const dispatch=useDispatch();
    // console.log(collapse)
    const changeCollapse = (params) => {
        // console.log('in2')
        dispatch({type:'common/changeCollapse',payload:{collapse:params}})
        // collapse=useSelector(state=>state.common)
    }
    const isIncludesPage = () => {
        if (location.pathname === '/') {
            //有admin和普通用户区别
            history.replace(routeList[0].route)
            return false;
        }
        if(routeList===false) return false;
        return routeList?.some(item => item.route === location.pathname);
    }
    return (
        <Layout className='container'>
            <SideBar Sider={Sider} collapsed={collapse}></SideBar>
            <Layout>
                <CommonHeaders Header={Header} collapse={collapse} changeCollapse={changeCollapse} />
                <Content className="main-content">{isIncludesPage() ?
                    <> <Loading part={true} isShow={loading.effects['staff/initialData'] || loading.effects['attendance/initialData']}/>
                        {children}</>
                    : <NotFoundPage />}</Content>
            </Layout>
        </Layout>
    )
}
