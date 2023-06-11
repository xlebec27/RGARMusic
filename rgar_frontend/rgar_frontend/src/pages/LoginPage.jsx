import {useNavigate} from 'react-router-dom';
import {Button, Space, Input} from 'antd';



export function LoginPage(){

    let navigate = useNavigate();

    const login = () =>{
        navigate('/home');
    }

    const register = () =>{
    navigate('/register');
    }

    return (
        <div>
            <Space direction="vertical" align="center" style={{width: '98%'}}>
            <h1>Login</h1>
            <Input
                placeholder="Enter your username"
                //prefix={<UserOutlined className="site-form-item-icon" />}     TODO
            />
            <Input.Password placeholder="input password" />
            <Button type="primary" shape="round" size={'large'} onClick={login} style={{width: '100%'}}>
            Login
            </Button>
            <Button onClick={register} style={{width: '100%'}}>
            Register
            </Button>
            </Space>

        </div>
    )
}
