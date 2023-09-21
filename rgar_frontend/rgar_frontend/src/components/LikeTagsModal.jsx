import { useEffect, useState } from 'react'
import axios from "axios"
import { Space, Divider, Row, Col, Button, Modal } from 'antd'
import { useNavigate } from 'react-router-dom';


export function LikeTagsModal({navTo, buttonText}) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loaded, setLoaded] = useState(false);

    function showModal () {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    function closeModal () {
        setIsModalOpen(false);
    };

    const [allTags, setAllTags] = useState([]);
    const [likedTags, setLikedTags] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        console.log("tags");
        async function load_tags() {
            try {
                const response = await axios.get("http://localhost:8000/api/user/all-tags/",
                    {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    }
                );
                console.log(response.data);
                setAllTags(response.data);
            }
            catch (error) {
                console.error(error);
            }
            try {
                const response = await axios.get("http://localhost:8000/api/user/profile/" + localStorage.getItem("userID") + "/",
                    {
                        headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
                    }
                );
                console.log(response.data.tags);
                setLikedTags(response.data.tags);
            }
            catch (error) {
                console.error(error);
            }
        }
        load_tags()

        console.log(allTags);
    }, []);


    const tagOnClick = async (id, status) => {
        try {
            console.log(status);
            if (status) {
                const response = await axios.post(import.meta.env.VITE_API_URL + "api/user/like/tag/",
                    JSON.stringify({ id }),
                    {
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
                    }
                );
                console.log(response.data);
                setLikedTags(likedTags => [...likedTags, response.data])
            }
            else {
                const response = await axios.delete(import.meta.env.VITE_API_URL + "api/user/like/tag/",

                    {
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
                        data: JSON.stringify({ id }),
                    }

                );
                console.log(response.data);
                setLikedTags(likedTags => likedTags.filter((tag) => tag.id != id))
            }

        }
        catch (error) {
            console.error(error);
        }
    }


    function renderTags() {
        var tags = allTags.map(tag => {
            return <Col span={8} key={tag.id} >{likedTags.some(e => e.id === tag.id) ? <Button onClick={() => tagOnClick(tag.id, false)} type="primary">{tag.name}</Button>
                : <Button onClick={() => tagOnClick(tag.id, true)}>{tag.name}</Button>}</Col>
        })
        return tags

    }


    return (
        <>
            <Button type="primary" shape="round" size={'large'} onClick={e => {showModal(); }}>{buttonText}</Button>
            <Modal title="Like Tags" open={isModalOpen} onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={() => {closeModal(); navigate(navTo);}}>
                        Confirm
                    </Button>]}>
                <Space direction="vertical" wrap style={{ width: "100%", textAlign: "center", paddingTop: "5%" }}>
                    <Row justify="center" type="flex">
                        {renderTags()}
                    </Row>
                </Space>
            </Modal>

        </>

    )
}