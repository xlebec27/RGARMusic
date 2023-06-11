import {Space, Row, Col, Image, Divider} from 'antd'
import { TrackList } from '../components/TrackList'
import "../assets/Pages.css"
import { CoverCard } from '../components/CoverCard'

export function ArtistPage(params){
    return(
        <Space direction="vertical" className="header-img-name">
            <Row align="bottom"
                justify="start"
                gutter={16} > 
                <Col span={6}>
                    <Image src="https://i.scdn.co/image/ab67616d0000b2737e776053ccbbd4b5ed1422b0"
                    style={{overflow: "hidden"}}/>
                </Col >     
                <Col span={18} align='bottom'>
                    <h1>deep blue</h1>
                </Col> 
            </Row>
            <Divider></Divider>
            <Row gutter={16}> 
                <Col>
                    Play  
                </Col>     
                <Col>
                    Add to Favourite
                </Col> 
                <Col>
                    Add to Queue
                </Col> 
                <Col>
                    Add to Playlist
                </Col>
                <Col>
                    Share
                </Col> 
                <Col>
                    Report
                </Col> 
            </Row>
            <Divider orientation="left">Popular Tracks</Divider>
            <TrackList id={params.id}/>
            <Divider orientation="left">Discography</Divider>
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
        </Space>
    )
}