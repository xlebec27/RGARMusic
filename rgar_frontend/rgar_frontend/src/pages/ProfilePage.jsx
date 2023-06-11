import {Avatar, Space, Divider, Row, Col} from 'antd'
import { CoverCard } from '../components/CoverCard'
import "/src/assets/ProfilePage.css"
import  { ArtistCard } from '../components/ArtistCard'
import { TrackList } from '../components/TrackList'
import { UserCard } from '../components/UserCard'


export function ProfilePage(params) {

    let name = "Profile Name"
        //TODO add avatar link
    return(
        <Space direction="vertical">  
            <Row gutter={32}>
                <Col><Avatar size={150} src="https://i.pinimg.com/736x/06/24/d3/0624d330276b6c0df9bcd4c8fc3269e8.jpg"/> </Col>
                <Col><h2>{name} </h2></Col>     
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
            <Divider>Favourite</Divider>
            <Row justify="space-evenly">
                <Col span={4} ><CoverCard 
                    img="https://lastfm.freetls.fastly.net/i/u/ar0/f75fb3b1b05042e35dd3597efe3d8f27.jpg" 
                    name="Rouge Carpet Disaster" desc="Static Dress" className="playlist-card"/>
                </Col>
            </Row>
            <Divider>Statistics</Divider>
            <>Top Tracks</>
            <TrackList id={params.id}/>
            Top Artists
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
                    <UserCard img="https://i.scdn.co/image/ab6761610000e5ebe0b26c1c00a538ef485f74cf" name="Invent Animate" className="playlist-card" id="3"/>
                </Col>
                <Col span={4} >
                <UserCard img="https://i.scdn.co/image/ab6761610000e5ebe0b26c1c00a538ef485f74cf" name="AAAAAAA" className="playlist-card"/>
                </Col>
            </Row>
        </Space>
    )
    
}