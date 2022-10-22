import React from 'react'
import { selectLayout } from '../utils/selectLayout';
import BaseLayout from './BaseLayout';
import LoginLayout from './LoginLayout'
import Loading from '../components/loading'
import {useSelector} from 'umi'

export default function Layout({ children, history, location }) {
  // console.log(children)
  const loading=useSelector(state=>state.loading);
  // console.log(loading)

  const layout = { BaseLayout, LoginLayout }
  const Container = layout[selectLayout(location.pathname)]
  return (
    <Container>
      <Loading  isShow={loading.effects['user/login']}/>
      {children}
    </Container>
  )
}
