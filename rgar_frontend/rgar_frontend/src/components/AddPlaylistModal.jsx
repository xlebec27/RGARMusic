import { Button, Modal, Row, Space, Input, Upload, Card } from 'antd';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const { Meta } = Card;

export function AddPlaylistModal(props) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

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

    async function postPlaylist() {
        try {
            const response = await axios.post("http://localhost:8000/api/user/create/playlist/",
                { name: name, cover: img },
                {
                    headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },

                }
            );
            console.log(JSON.stringify(response.data));
            setIsModalOpen(false);
            navigate("/profile")
        } catch (error) {
            if (error?.response?.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
            console.error(error);
        }

    }

    return (
        <>
            <div onClick={showModal} style={{ cursor: "pointer" }}>
                <Card cover={<FontAwesomeIcon icon={faPlus} />} style={{ cursor: "pointer", width: "70%" }}>
                    <Meta title={"Create Playlist"} />
                </Card>
            </div>
            <Modal title="Report content" open={isModalOpen} onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>]}>
                <Row justify="center" style={{ width: "100%" }} gutter={[16, 16]} size="large">
                    <Space direction="vertical" style={{ textAlign: "center", paddingTop: "5%" }}>
                        <h2>Create Playlist</h2>
                        <Input placeholder="Enter playlist name" onChange={(e) => { setName(e.target.value) }} />
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
                        {selectedFile && <img src={preview} style={{ width: "20%" }} />}
                        <Button type="primary" shape="round" size={'large'} onClick={postPlaylist} style={{ width: '100%' }}>
                            Create
                        </Button>
                    </Space>

                </Row>
            </Modal>

        </>

    )
};