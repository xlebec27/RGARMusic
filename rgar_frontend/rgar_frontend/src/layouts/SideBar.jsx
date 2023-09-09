import { Layout, Menu } from 'antd';
import { useState, createContext } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
// import {  PlayerComponent } from '../components/Player';
import { MusicPlayer } from '../components/MusicPlayer';
import rgar from "../assets/logo/rgar.svg"

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
                    <div style={{paddingTop: "10px"}}>
                        <object type="image/svg+xml"
                            data={rgar}
                            class="logo"
                            style={{width: "170px", paddingLeft: "5px", paddingRight: "5px"}}>
                            RGAR Logo
                        </object>
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
                        margin: '0px 0px 0 0',
                        paddingBottom: "10%",
                        overflow: 'hidden',
                    }}
                    >
                        <Outlet style={{ width: '100%' }} />
                    </Content>
                </Layout>
            </Layout>
            <Footer style={{
                position: 'fixed',
                bottom: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: "white",
                margin: '0'
            }}>
                <MusicPlayer />
            </Footer>
        </Layout>

    )

}
