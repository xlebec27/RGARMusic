import {Row, Col, Space, Input, Anchor} from 'antd'
import { CoverCard } from '../components/CoverCard';
import { useState } from 'react';
import axios from 'axios'
import { ArtistCard } from '../components/ArtistCard'
import { UserCard } from '../components/UserCard';

const { Search } = Input;

export function SearchPage(params) {

    const [artists, setArtists] = useState([])
    const [albums, setAlbums] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [users, setUsers] = useState([])
    const [tracks, setTracks] = useState([])

    async function onSearch(searchValue){
        try {
            const artists = await axios.get(import.meta.env.VITE_API_URL + "api/user/artists/search/?s=" + searchValue);
            setArtists(artists.data);
        } catch (error) {
            console.log(error);
        }
        try {
            const albums = await axios.get(import.meta.env.VITE_API_URL + "api/user/albums/search/?s=" + searchValue);
            setAlbums(albums.data);
            console.log(albums.data);
        } catch (error) {
            console.log(error);
        }
        try {
            const playlists = await axios.get(import.meta.env.VITE_API_URL + "api/user/playlists/search/?s=" + searchValue);
            setPlaylists(playlists.data);
        } catch (error) {
            console.log(error);
        }
        try {
            const users = await axios.get(import.meta.env.VITE_API_URL + "api/user/users/search/?s=" + searchValue);
            setUsers(users.data);
        } catch (error) {
            console.log(error);
        }
        try {
            const tracks = await axios.get(import.meta.env.VITE_API_URL + "api/user/tracks/search/?s=" + searchValue);
            setTracks(tracks.data);
        } catch (error) {
            console.log(error);
        }
    }

    function renderAlbums() {
        var favourite = []
        favourite.push(albums?.map(album => {
            return <Col span={4}><CoverCard
                img={album.cover}
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
                name={playlist.name} type={"playlist"} className="playlist-card" />
            </Col>
        }))
        return favourite;
    }

    function renderArtists() {
        var favourite = []
        favourite.push(artists?.map(artist => {
            return <Col span={4}><ArtistCard
                img={artist.picture}
                id={artist.name}
                name={artist.name} className="playlist-card" />
            </Col>
        }))
        return favourite;
    }

    function renderUsers() {
        var favourite = []
        favourite.push(users?.map(user => {
            return <Col span={4}><UserCard
                img={user.image}
                id={user.id}
                name={user.username} className="playlist-card" />
            </Col>
        }))
        return favourite;
    }


    function renderTracks() {
        var favourite = []
        favourite.push(tracks?.map(track => {
            return <Col span={4}><CoverCard
                img={track.album.cover}
                id={track.album.id}
                name={track.name} desc={track.artist.toString()} type={"album"} className="playlist-card" />
            </Col>
        }))
        return favourite;
    }

    return(
        <Space direction="vertical" style={{width: '98%'}}>
            <Row id="search">
            <Search
                placeholder="Input search text"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={async (value) => {await onSearch(value)}}
                />
            </Row>
            <Row>
                <Col span={18}>
                    <h3 id="tracks">Tracks</h3>
                    <Row justify="space-around">
                    {renderTracks()}
                    </Row>
                    <h3 id="artists">Artists</h3>
                    <Row justify="space-around">
                    {renderArtists()}
                    </Row>
                    <h3 id="albums">Albums</h3>
                    <Row justify="space-around">
                    {renderAlbums()}
                    </Row>
                    <h3 id="playlists">Playlists</h3>
                    <Row justify="space-around" >
                    {renderPlaylists()}
                    </Row>
                    <h3 id="users">Users</h3>
                    <Row justify="space-around">
                    {renderUsers()}
                    </Row>
                    
                </Col>
                <Col span={6}>
                    <Anchor
                        items={[
                        {
                            key: 'search',
                            href: '#search',
                            title: 'Search',
                        },
                        {
                            key: 'tracks',
                            href: '#tracks',
                            title: 'Tracks',
                        },
                        {
                            key: 'artists',
                            href: '#artists',
                            title: 'Artists',
                        },
                        {
                            key: 'albums',
                            href: '#albums',
                            title: 'Albums',
                        },
                        {
                            key: 'playlists',
                            href: '#playlists',
                            title: 'Playlists',
                        },
                        {
                            key: 'users',
                            href: '#users',
                            title: 'Users',
                        },
                        ]}
                    />
                </Col>
            </Row>
        </Space>
    )
}