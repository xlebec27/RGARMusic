import { useState } from 'react';
import {ConfigProvider} from 'antd';
import { SideBar } from 'layouts/SideBar';
import { RouterComponent as Router} from 'components/RouterComponent';


export function App() {

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#BE3455',
          colorBgBase: '#ffffff'
        },
      }}>
      <Router/>
    </ConfigProvider>
    
      
  )
}

