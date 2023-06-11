import {Avatar, Space, Divider, Row, Col} from 'antd'
import { CoverCard } from '../components/CoverCard'
import "/src/assets/ProfilePage.css"
import  { ArtistCard } from '../components/ArtistCard'
import { TrackList } from '../components/TrackList'
import { useParams } from 'react-router-dom';
import { LikeButton } from '../components/LikeButton'

export function UserPage(params) {

    let { id } = useParams();
        //TODO add avatar link
    return(
        <Space direction="vertical">  
            <Row gutter={32}>
                <Col><Avatar size={150}/> </Col>
                <Col><h2>Profile Name {id}</h2></Col>
                <Col><h2><LikeButton/> </h2></Col> 
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
            <Divider></Divider>
        </Space>
    )
    
}