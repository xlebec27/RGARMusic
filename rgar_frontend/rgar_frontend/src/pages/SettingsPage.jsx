import { Link } from 'react-router-dom'
import { Row, Col, Space, Input, Avatar, Upload, Button } from 'antd'
import { useState, useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios'
import { LikeTagsModal } from '../components/LikeTagsModal';

export function SettingsPage() {

    // const [user, setUser] = useState({})
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")

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
    }

    let navigate = useNavigate();

    async function postUser() {
        try {
            const body = new FormData()
            if (email != "" && email != undefined){
                body.append('email', email)
            }
            if (username != "" && username != undefined){
                body.append('username', username)
            }
            if (password != "" && password != undefined){
                body.append('password', password)
            }
            if (selectedFile != undefined){
                body.append('image', selectedFile)
            }
            const response = await axios.patch("http://localhost:8000/api/user/my-profile/",
                body,
                {
                    headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
                }
            );
            navigate('/profile');

        } catch (error) {
            console.error(error);
        }
    }

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }

    return (
        <Row justify="center" style={{ width: "100%" }} gutter={[16, 16]} size="large">
            <Space direction="vertical" style={{ textAlign: "center", paddingTop: "0px" }}>
                <h2>Settings</h2>
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
                <Input.Password placeholder="input password" name="password" onChange={(e) => { setPassword(e.target.value) }} />
                <Button type="primary" shape="round" size={'large'} onClick={postUser} style={{ width: '100%' }}>
                    Confrim changes
                </Button>
                <LikeTagsModal navTo={"/settings"} buttonText={"Change Liked Tags"}/>
                {/* <Link to='/like-tags'>Change preferred tags</Link> */}
                {(localStorage.getItem('isAdmin')) ? <><Link to='/add/album'>Add Album</Link><Link to='/add/artist'>Add Artist</Link>
                <Link to='/add/tag'>Add Tag</Link></> : <></>}
                
                

                <Button type="primary" shape="round" size={'large'} onClick={logout}>
                    Log out
                </Button>
            </Space>
        </Row>
    )
}