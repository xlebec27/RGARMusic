import { Avatar, Space, Divider, Row, Col } from 'antd'
import { CoverCard } from '../components/CoverCard'
import "/src/assets/ProfilePage.css"
import { ArtistCard } from '../components/ArtistCard'
import { useEffect, useState } from 'react'
import axios from "axios"


export function FavouritePage(params) {

    const [artists, setArtists] = useState([])
    const [albums, setAlbums] = useState([])
    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        console.log("data load");
        async function load_data() {
            try {
                const artists = await axios.get("http://localhost:8000/api/user/like/artist/",
                    {
                        headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
                    }
                );
                console.log(artists.data);
                setArtists(artists.data);
                const albums = await axios.get("http://localhost:8000/api/user/like/album/",
                    {
                        headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
                    }
                );
                console.log(albums.data);
                setAlbums(albums.data);
                const playlists = await axios.get("http://localhost:8000/api/user/like/playlist/",
                    {
                        headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
                    }
                );
                console.log(playlists.data);
                setPlaylists(playlists.data);
            }
            catch (error) {
                console.error(error);
            }
        }
        load_data()
    }, []);

    function renderAlbums() {
        var favourite = []
        favourite.push(albums?.map(album => {
            return <Col span={4}><CoverCard
                img={"http://localhost:8000/" + album.cover}
                id={album.id}
                name={album.name} desc={album.artist[0].name} type={"album"} className="playlist-card"/>
            </Col>
        }))
        return favourite;
    }

    function renderPlaylists() {
        var favourite = []
        favourite.push(playlists?.map(playlist => {
            return <Col span={4} key={playlist.id}><CoverCard
                img={playlist.cover}
                id={playlist.id}
                name={playlist.name} desc={profile.username} type={"playlist"} className="playlist-card" />
            </Col>
        }))
        return favourite;
    }

    function renderArtists() {
        var favourite = []
        favourite.push(artists?.map(artist => {
            return <Col span={4} key={artist.name}><ArtistCard
                img={"http://localhost:8000/" + artist.picture}
                id={artist.name}
                name={artist.name} className="playlist-card" />
            </Col>
        }))
        return favourite;
    }

    return (
        <Space direction="vertical" style={{width: '100%'}}>
            <Row>
                <h3>
                    Favourite
                </h3>
            </Row>
            <Divider>Album</Divider>
            <Row justify="space-around" type="flex">
                {renderAlbums()}
            </Row>
            <Divider>Playlists</Divider>
            <Row justify="space-around" type="flex">
                {renderPlaylists()}
            </Row>
            <Divider>Artists</Divider>
            <Row justify="space-evenly" type="flex">
                {renderArtists()}
            </Row>
            <Divider>Users</Divider>
            <Row justify="space-evenly" type="flex">

            </Row>
        </Space>
    )

}