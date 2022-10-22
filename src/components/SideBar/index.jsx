import React from 'react'
import logo from '../../common/img/logo.svg'
import { Menu } from 'antd';
import { history, Link } from 'umi'
import iconMap from '../iconMap'

export default function SideBar({ Sider,collapsed }) {
    let route = sessionStorage.getItem('routeList') ? JSON.parse(sessionStorage.getItem('routeList')) : [];
    if(route===false){
        route=[];
    }
    const eng=['dashboard','attendanceInfo','staff','department','level','assessment','salary record','reward record','attendance']
    // console.log(route);
     route=route?.map((item,index)=>{
        return ({...item,zhName:eng[index]})
    });
    route=route.slice(0,6)
    // let a=route[3];
    // route[3]=route[8];
    // route[8]=a;

    // console.log(route)
    const pathName = history.location.pathname;
    // console.log(pathName)
    return (
        <><Sider theme='light' className='side-bar' collapsed={collapsed}>
            <div className="brand">
                <div className="logo">
                    <img src={logo} alt="" />
                </div>
                <h1>OA MS</h1>
            </div>
            <div className="menu-container">
                <Menu selectedKeys={[pathName]}>
                    {route?.map((item) => {
                        // console.log(item)
                        return (
                            <Menu.Item key={item.route} style={{height:'50px',fontSize:'20px'}}>
                                <Link to={item.route}>
                                    {iconMap[item.icon]}
                                    <span>{item.zhName}</span>
                                </Link>
                            </Menu.Item>
                        )
                    })}
                </Menu>
            </div>
        </Sider></>

    )
} 
