import {Link} from 'react-router-dom'
import {Row, Col, Space,  Input, Avatar, Upload, Button} from 'antd'
import { useState, useEffect } from 'react'
import {useNavigate, Outlet} from 'react-router-dom';

export function SettingsPage(){

    const [user, setUser] = useState({})
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.file || e.file.length === 0) {
            setSelectedFile(undefined)
            return
        }

        setSelectedFile(e.file)
        setAlbum({ ...album, cover: e.file })
        console.log('album ', album)
    }

    let navigate = useNavigate();

    const postUser = () => {
        if (true) {
            navigate('/profile');
        }
    }

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }

    return(
        <Row justify="center" style={{width:"100%"}} gutter={[16, 16]} size="large">
            <Space direction="vertical" style={{textAlign:"center", paddingTop:"0px"}}>
                <h2>Settings</h2>
                <Input placeholder="Enter your email"/>
                <Input placeholder="Enter your username"/>
                <Upload 
                    onChange={onSelectFile}
                    beforeUpload={() => {
                        return false;
                    }}
                    maxCount={1}
                    accept="image/png, image/jpeg"
                >
                    <Button style={{width: '100%'}} >Click to Upload</Button>
                </Upload>
                {selectedFile &&  <Avatar src={preview} size={192}/> }
                <Input.Password placeholder="input password"/>
                <Button type="primary" shape="round" size={'large'} onClick={postUser} style={{width: '100%'}}>
                Confrim changes
                </Button>
                <Link to='/add/album'>Add Album</Link>
                <Link to='/add/artist'>Add Artist</Link>
                
                <Button type="primary" shape="round" size={'large'} onClick={logout}>
                Log out
                </Button>
                </Space>
        </Row>
    )
}