import { Row, Col, Space, Input, Avatar, Upload, Button } from 'antd'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { cropImage } from '../features/cropImage'

export function AddArtistPage() {


    const [name, setName] = useState("")
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

    async function postArtist() {
        try {
            console.log(JSON.stringify({ name, img }))

            const response = await axios.post("http://localhost:8000/api/admin/create-artist/",
                { name: name, picture: cropImage(img) },
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
            console.error(error);
        }

    }

    return (
        <Row justify="center" style={{ width: "100%" }} gutter={[16, 16]} size="large">
            <Space direction="vertical" style={{ textAlign: "center", paddingTop: "5%" }}>
                <h2>Add Artist</h2>
                <Input placeholder="Enter artist name" onChange={(e) => { setName(e.target.value) }} />
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
                <Button type="primary" shape="round" size={'large'} onClick={postArtist} style={{ width: '100%' }}>
                    Create Artist
                </Button>
            </Space>

        </Row>
    )
}