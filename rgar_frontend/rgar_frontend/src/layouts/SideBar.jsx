import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
// import {  PlayerComponent } from '../components/Player';

const { Sider, Content, Footer } = Layout;

const items = [         //TODO add icons
    {
        label: 'Profile',
        key: 'profile'
    },
    {
        label: 'Home',
        key: 'home'
    },
    {
        label: 'Search',
        key: 'search'
    },
    {
        label: 'Favourite',
        key: 'favourite'
    },
    {
        label: 'Settings',
        key: 'settings'
    }
];



export function SideBar() {

    let navigate = useNavigate();

    const onClick = (e) => {
        setCurrent(e.key);
        navigate('/' + e.key)
    };

    const [current, setCurrent] = useState('home');

    return (
        <Layout>
            <Layout hasSider>
                <Sider
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        backgroundColor: '#fff'
                    }}>
                    <div>
                        Logo
                    </div>
                    <Menu mode="inline" onClick={onClick} items={items} />
                </Sider>

                <Layout
                    className="site-layout"
                    style={{
                        marginLeft: 200,
                    }}
                >
                    <Content style={{
                        margin: '0px 0px 0',
                        overflow: 'hidden',
                    }}
                    >
                        <Outlet style={{ width: '100%' }} />
                    </Content>
                </Layout>
            </Layout>
            <Footer >
                {/* if (false) {    //change
                    <PlayerComponent/>
                } */}
                </Footer>
        </Layout>
    )

}
