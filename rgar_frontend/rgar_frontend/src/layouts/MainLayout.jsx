import { Layout} from 'antd';
import { useState } from 'react';
import { Outlet} from 'react-router-dom';
import { SideBar } from './SideBar';

const {Sider, Content, Footer} = Layout;

export function MainLayout(){

    <Layout>
        <Outlet/>
      <Footer>Player</Footer>
    </Layout>

}
