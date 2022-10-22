import React from 'react'
import iconMap from '../iconMap'
import { Menu, Avatar } from 'antd'
import defaultAvatar from '../../common/img/default_avatar.png'
import {useSelector} from 'umi'
import {history} from 'umi'
export default function index({ Header, collapse, changeCollapse }) {
    const status=useSelector(state=>state.user.userInfo);
    // console.log(status)
    const logOut=()=>{
        sessionStorage.clear();
        history.replace('/users/login')
    }
    return (
        <Header  className='header-wrapper'>
            <div className="button" onClick={() => changeCollapse(!collapse)}>
                {collapse ? iconMap.leftArrow : iconMap.rightArrow}
            </div>
            <Menu style={{position:'fixed',right:'10px'}} mode={'horizontal'}>
                <Menu.SubMenu key='3' title={<><Avatar src={defaultAvatar} size={"small"}></Avatar><span>{status.accountName}</span></>}>

                    <Menu.Item key='1' onClick={logOut}>logout</Menu.Item>
                    <Menu.Item key='2'>coming soon|next patch</Menu.Item>
                </Menu.SubMenu>
                {/* <Menu.Item icon={iconMap.signOut}>
                    <Avatar></Avatar>
                    <span>logout</span>
                </Menu.Item> */}

            </Menu>
        </Header>
    )
}
