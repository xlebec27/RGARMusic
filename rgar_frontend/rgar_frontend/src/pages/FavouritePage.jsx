import {Avatar, Space, Divider, Row, Col} from 'antd'
import { CoverCard } from '../components/CoverCard'
import "/src/assets/ProfilePage.css"
import  { ArtistCard } from '../components/ArtistCard'


export function FavouritePage(params) {
        
    return(
        <Space direction="vertical">  
            <Row>      
                <h3>
                Favourite
                </h3>
            </Row>      
            
            <Divider>Playlists</Divider>
            <Row justify="space-around" type="flex">
                <Col span={4} ><CoverCard 
                    img="https://lastfm.freetls.fastly.net/i/u/ar0/f75fb3b1b05042e35dd3597efe3d8f27.jpg" 
                    name="Rouge Carpet Disaster" desc="Static Dress" className="playlist-card"/>
                </Col>
                <Col span={4}><CoverCard img="https://upload.wikimedia.org/wikipedia/ru/0/05/Deftones_White_Pony.jpeg" 
                    name="White Pony" desc="Deftones" className="playlist-card"/></Col>
                <Col span={4}><CoverCard img="https://lastfm.freetls.fastly.net/i/u/ar0/f75fb3b1b05042e35dd3597efe3d8f27.jpg"
                    name="aaaa" desc="bbb" className="playlist-card"/></Col>
                <Col span={4}><CoverCard img="https://upload.wikimedia.org/wikipedia/ru/0/05/Deftones_White_Pony.jpeg" name="aaaa" desc="bbb" className="playlist-card"/></Col>
                <Col span={4}><CoverCard img="https://lastfm.freetls.fastly.net/i/u/ar0/f75fb3b1b05042e35dd3597efe3d8f27.jpg" 
                    name="aaaa" desc="bbb" className="playlist-card"/></Col>
                <Col span={4}><CoverCard img="https://upload.wikimedia.org/wikipedia/ru/0/05/Deftones_White_Pony.jpeg" name="aaaa" desc="bbb" className="playlist-card"/></Col>
            </Row>
            <Divider>Artists</Divider>
            <Row justify="space-evenly">
                <Col span={4} >
                    <ArtistCard img="https://i.scdn.co/image/ab6761610000e5ebe0b26c1c00a538ef485f74cf" name="Invent Animate" className="playlist-card"/>
                </Col>
                <Col span={4} >
                <ArtistCard img="https://i.scdn.co/image/ab6761610000e5ebe0b26c1c00a538ef485f74cf" name="AAAAAAA" className="playlist-card"/>
                </Col>
            </Row>
            <Divider>Users</Divider>
            <Row justify="space-evenly">
                <Col span={4} >
                    <ArtistCard img="https://i.scdn.co/image/ab6761610000e5ebe0b26c1c00a538ef485f74cf" name="Invent Animate" className="playlist-card"/>
                </Col>
                <Col span={4} >
                <ArtistCard img="https://i.scdn.co/image/ab6761610000e5ebe0b26c1c00a538ef485f74cf" name="AAAAAAA" className="playlist-card"/>
                </Col>
            </Row>
        </Space>
    )
    
}