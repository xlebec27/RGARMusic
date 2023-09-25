import { useState, createContext } from 'react';
import { ConfigProvider } from 'antd';
import { SideBar } from 'layouts/SideBar';
import { RouterComponent as Router } from 'components/RouterComponent';

export const UserContext = createContext(null);
export const SongContext = createContext(null);
export const QueueContext = createContext([]);


export function App() {

  const [user, setUser] = useState(null);
  const [song, setSong] = useState(0);
  const [queue, setQueue] = useState([]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <SongContext.Provider value={[song, setSong]}>
        <QueueContext.Provider value={[queue, setQueue]}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#BE3455',
                colorBgBase: '#ffffff'
              },
            }}>
            <Router />
          </ConfigProvider>

        </QueueContext.Provider>
      </SongContext.Provider>
    </UserContext.Provider >


  )
}

