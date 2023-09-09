import { Row, Col, Space, Input, Avatar, Upload, Button } from 'antd'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios";

export function RegistrationPage() {


    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [img, setImg] = useState()
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    let navigate = useNavigate();

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.file || e.file.length === 0) {
            setSelectedFile(undefined)
            return
        }

        setSelectedFile(e.file)
        setImg(e.file)
    }

    function isEmpty(object) {
        for (var i in object) { return true; } return false;
    }

    const register = async () => {
        try {
            console.log(JSON.stringify({ email, username, password, img }))

            console.log(process.env.REACT_APP_API_URL);
            const response = await axios.post("http://localhost:8000/auth/users/",
                { email: email, username: username, password: password, image: img },
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            );
            console.log(JSON.stringify(response.data));
            const login = await axios.post("http://localhost:8000/auth/jwt/create/",
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            console.log(JSON.stringify(response.data));
            localStorage.setItem('refreshToken', response.data.refresh)
            localStorage.setItem('accessToken', response.data.access)
            const profileData = await axios.get("http://localhost:8000/auth/users/me/",
                {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${login.data.access}` }
                }
            );
            localStorage.setItem('userID', profileData?.data?.id)
            console.log(JSON.stringify(login.data));
            navigate("/like-tags");

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <Row justify="center" style={{ width: "100%" }} gutter={[16, 16]} size="large">
            <Space direction="vertical" style={{ textAlign: "center", paddingTop: "5%" }}>
                <h2>Register</h2>
                <Input placeholder="Enter your email" onChange={(e) => { setEmail(e.target.value) }} />
                <Input placeholder="Enter your username" onChange={(e) => { setUsername(e.target.value) }} />
                <Upload
                    onChange={onSelectFile}
                    beforeUpload={() => {
                        return false;
                    }}
                    maxCount={1}
                    accept="image/png, image/jpeg"
                >
                    <Button style={{ width: '100%' }} >Click to Upload</Button>
                </Upload>
                {selectedFile && <Avatar src={preview} size={192} />}
                <Input.Password placeholder="input password" onChange={(e) => { setPassword(e.target.value) }} />
                <Button type="primary" shape="round" size={'large'} onClick={register} style={{ width: '100%' }}>
                    Register
                </Button>
                <Link to='/login'>Back to login page</Link>
            </Space>

        </Row>
    )
}