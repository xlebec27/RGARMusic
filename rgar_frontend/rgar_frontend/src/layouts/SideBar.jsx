import { Layout, Menu } from 'antd';
import { useState } from 'react';
import {useNavigate, Outlet} from 'react-router-dom';

const {Sider, Content} = Layout;

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
        label: 'Login',
        key: 'login'
    }
  ];

  

export function SideBar(props){

    let navigate = useNavigate();

    const onClick = (e) => {
        setCurrent(e.key);
        navigate('/' + e.key)
      };
    
    const [current, setCurrent] = useState('home');

    return (
        <Layout hasSider>
            <Sider  
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}>
                    <div>
                        Logo
                    </div>
                    <Menu mode="inline" theme="dark" onClick={onClick} items={items}/>
            </Sider>
            
            <Layout
                className="site-layout"
                style={{
                marginLeft: 200,
                }}
            >
                <Content style={{
                    margin: '24px 16px 0',
                    overflow: 'hidden',
                    }}
                >
                    <Outlet style={{width: '100%'}}/>
                </Content>
            </Layout>
            
        </Layout>                
    )
    
}
