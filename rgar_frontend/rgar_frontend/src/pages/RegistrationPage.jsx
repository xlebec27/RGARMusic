import {Row, Col, Space,  Input, Avatar, Upload, Button} from 'antd'
import { useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

export function RegistrationPage(){
    
    const [user, setUser] = useState({})
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    let navigate = useNavigate();

    const postUser = () => {
        if (true) {
            navigate('/home');
        }
    }

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

    return (
        <Row justify="center" style={{width:"100%"}} gutter={[16, 16]} size="large">
            <Space direction="vertical" style={{textAlign:"center", paddingTop:"5%"}}>
                <h2>Register</h2>
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
                Register
                </Button>
                </Space>
            
        </Row>
    )
}