import { useEffect, useState } from 'react'
import axios from "axios"
import { Space, Divider, Row, Col, Button } from 'antd'
import { useNavigate } from 'react-router-dom';


export function LikeTagsPage() {
    const [allTags, setAllTags] = useState([]);
    const [likedTags, setLikedTags] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        console.log("tags");
        async function load_tags(){
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
                const response = await axios.get("http://localhost:8000/api/user/profile/"+ localStorage.getItem("userID") +"/",
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
                const response = await axios.post("http://localhost:8000/api/user/like/tag/",
                    JSON.stringify({ id }),
                    {
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
                    }
                );
                console.log(response.data);
                setLikedTags(likedTags => [...likedTags, response.data])
            }
            else {
                const response = await axios.delete("http://localhost:8000/api/user/like/tag/",
                    
                    {
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
                        data: JSON.stringify({ id }),
                    }
                    
                );
                console.log(response.data);
                setLikedTags(likedTags => likedTags.filter((tag)=> tag.id != id ))
            }

        }
        catch (error) {
            console.error(error);
        }
    }


    function renderTags(){
        var tags = allTags.map(tag =>
            {return <Col span={8} key={tag.id} >{likedTags.some(e => e.id === tag.id) ? <Button onClick={() => tagOnClick(tag.id, false)}>{tag.name}</Button>
                                                                                        : <Button onClick={() => tagOnClick(tag.id, true)} ghost>{tag.name}</Button>}</Col>})
        return tags
            
    }


    return(
        <Space direction="vertical" style={{width:"100%", textAlign:"center", paddingTop:"5%"}}>
            <Row justify="center" type="flex">
                {renderTags()}
            </Row>
            <Row type="flex">
                <Button type="primary" shape="round" size={'large'} onClick={() => { navigate("/profile") }}>Confirm</Button>
            </Row>
        </Space>
    )
}