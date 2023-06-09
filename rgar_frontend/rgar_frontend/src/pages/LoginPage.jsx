import {useNavigate} from 'react-router-dom';
import {Button, Space, Input} from 'antd';



export function LoginPage(){

    let navigate = useNavigate();

    const routeChange = () =>{
        navigate('/home');
      }

    return (
        <div>
            <Space direction="vertical">
            <h1>Login</h1>
            <Input
                placeholder="Enter your username"
                //prefix={<UserOutlined className="site-form-item-icon" />}     TODO
            />
            <Input.Password placeholder="input password" />
            <Button type="primary" shape="round" size={'large'} onClick={routeChange}>
            Login
            </Button>
            </Space>

        </div>
    )
}
