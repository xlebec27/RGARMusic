import { Row, Col, Space, Input, Avatar, Upload, Button } from 'antd'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


export function AddTagPage() {

    const [name, setName] = useState("")
    let navigate = useNavigate();


    async function postTag() {
        try {
            const response = await axios.post("http://localhost:8000/api/admin/tags/",
                { name: name },
                {
                    headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },

                }
            );
            console.log(JSON.stringify(response.data));
            navigate("/settings");
        } catch (error) {
            if (error?.response?.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
        }

    }

    return (
        <Row justify="center" style={{ width: "100%" }} gutter={[16, 16]} size="large">
            <Space direction="vertical" style={{ textAlign: "center", paddingTop: "5%" }}>
                <Input placeholder="Tag name" onChange={(e) => { setName(e.target.value) }} />
                <Button type="primary" shape="round" size={'large'} onClick={postTag}>Create Tag</Button>
            </Space>
        </Row>
    )
}