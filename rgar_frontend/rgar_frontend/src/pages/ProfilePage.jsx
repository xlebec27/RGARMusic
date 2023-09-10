import { Avatar, Space, Divider, Row, Col } from 'antd'
import { CoverCard } from '../components/CoverCard'
import "/src/assets/ProfilePage.css"
import { ArtistCard } from '../components/ArtistCard'
import { TrackList } from '../components/TrackList'
import { UserCard } from '../components/UserCard'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import { AddPlaylistModal } from '../components/AddPlaylistModal'


export function ProfilePage(params) {

    const [profile, setProfile] = useState([]);

    useEffect(() => {
        async function load_profile() {
            try {
                const response = await axios.get("http://localhost:8000/api/user/profile/" + localStorage.getItem("userID") + "/",
                    {
                        headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
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
        var playlists = profile.playlist_set?.slice(0, 5).map(playlist => {
            return <Col span={4} key={playlist.id}><CoverCard
                img={playlist.cover}
                id={playlist.id}
                name={playlist.name} desc={profile.username} type={"playlist"} className="playlist-card" />
            </Col>
        }
        )
        return playlists
    }


    function renderFavourite() {
        var favourite = []
        favourite.push(profile.albums?.slice(0, 3).map(album => {
            return <Col span={4} key={album.id} ><CoverCard
                img={album.cover}
                id={album.id}
                name={album.name} desc={album.artist[0].name} type={"album"} className="playlist-card" />
            </Col>
        }))
        favourite.push(profile.artists?.slice(0, 3).map(artist => {
            return <Col span={4} key={artist.name}><ArtistCard img={artist.picture}
                name={artist.name} id={artist.name} className="playlist-card" />
            </Col>
        }
        ))
        return favourite
    }


    return (
        <Space direction="vertical" style={{width: '100%'}}>
            <Row gutter={32}>
                <Col><Avatar size={150} src={profile?.image} /> </Col>
                <Col><h2>{profile?.username} </h2></Col>
            </Row>

            <Divider>Playlists</Divider>
            <Row justify="space-around" type="flex" align="middle">
                {renderPlaylists()}
                <Col span={4} style={{ height: "100%" }}>
                    <AddPlaylistModal>
                    </AddPlaylistModal>
                </Col>
            </Row>
            <Divider><Link to={"/favourite"}>Favourite</Link></Divider>
            <Row justify="space-evenly">
                {renderFavourite()}
            </Row>
            {/* <Divider>Statistics</Divider>
            <>Top Tracks</>
            <TrackList id={params.id}/> 
            Top Artists
            <Row justify="space-evenly">
                <Col span={4} >
                    <ArtistCard img="https://i.scdn.co/image/ab6761610000e5ebe0b26c1c00a538ef485f74cf" name="Invent Animate" className="playlist-card" />
                </Col>
                <Col span={4} >
                    <ArtistCard img="https://i.scdn.co/image/ab6761610000e5ebe0b26c1c00a538ef485f74cf" name="AAAAAAA" className="playlist-card" />
                </Col>
            </Row> */}
            <Divider>Users</Divider>
            <Row justify="space-evenly">
                {/* <Col span={4} >
                    <UserCard img="https://i.scdn.co/image/ab6761610000e5ebe0b26c1c00a538ef485f74cf" name="Invent Animate" className="playlist-card" id="3" />
                </Col>
                <Col span={4} >
                    <UserCard img="https://i.scdn.co/image/ab6761610000e5ebe0b26c1c00a538ef485f74cf" name="AAAAAAA" className="playlist-card" />
                </Col> */}
            </Row>
        </Space>
    )

}