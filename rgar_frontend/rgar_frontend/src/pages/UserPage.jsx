import {Avatar, Space, Divider, Row, Col} from 'antd'
import { CoverCard } from '../components/CoverCard'
import "/src/assets/ProfilePage.css"
import  { ArtistCard } from '../components/ArtistCard'
import { TrackList } from '../components/TrackList'
import { useParams } from 'react-router-dom';
import { useState, useEffect} from 'react'
import { LikeButton } from '../components/LikeButton'
import axios from 'axios'

export function UserPage(params) {

    const [profile, setProfile] = useState([]);

    let { userID } = useParams();

    useEffect(() => {
        async function load_profile() {
            try {
                const response = await axios.get(`http://localhost:8000/api/user/profile/${userID}/`,
                    {
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
                    }
                );
                console.log(response.data);
                setProfile(response.data);
            }
            catch (error) {
                console.error(error);
            }
        }
        load_profile()
    }, []);

    function renderPlaylists() {
        var playlists = profile.playlist_set?.slice(0, 6).map(playlist => {
            return <Col span={4} key={playlist.id}><CoverCard
                img={playlist.cover}
                id={playlist.id}
                name={playlist.name} desc={profile.username} type={"playlist"} className="playlist-card" />
            </Col>
        }
        )
        return playlists
    }
    
    return(
        <Space direction="vertical" style={{width: '100%'}}>
            <Row gutter={32}>
                <Col><Avatar size={150} src={profile?.image} /> </Col>
                <Col><h2>{profile?.username} </h2></Col>
                <Col><h2><LikeButton/> </h2></Col>
            </Row>     
            
            <Divider>Playlists</Divider>
            <Row justify="space-around" type="flex">
                {renderPlaylists()}
            </Row>
            <Divider></Divider>
        </Space>
    )
    
}