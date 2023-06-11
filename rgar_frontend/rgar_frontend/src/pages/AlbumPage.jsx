import {Space, Row, Col, Image, message} from 'antd'
import { TrackList } from '../components/TrackList'
import {Link} from "react-router-dom"
import "../assets/Pages.css"
import { LikeButton } from '../components/LikeButton'
import { faCirclePlay, faBarsStaggered, faSquarePlus, faLink, faFlag} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useRef } from 'react'
import { ReportModal } from '../components/ReportModal'

export function AlbumPage(params){

    const [copySuccess, setCopySuccess] = useState("")
    const textAreaRef = useRef(null)
    const [messageApi, contextHolder] = message.useMessage();

    async function copyToClip() {
        await navigator.clipboard.writeText(location.href);
        setCopySuccess("Copied");
        messageApi.open({
            type: 'success',
            content: 'Link copied to clipboard',
          });
    }

    return(
        <Space direction="vertical" className="header-img-name">
            {contextHolder}
            <Row align="bottom"
                justify="start"
                gutter={16}> 
                <Col span={6}>
                    <Image src="https://i.scdn.co/image/ab67616d0000b2737e776053ccbbd4b5ed1422b0" width={"90%"}/>
                </Col >     
                <Col span={18}>
                    <h1>You're Not You Anymore</h1>
                    <Link to={"/artist"}><h2>Counterparts</h2></Link>
                    <div>2017   -   11 tracks</div>
                </Col> 
            </Row>
            <Row gutter={16} align="bottom" justify="start"> 
                <Col>
                    <h4><FontAwesomeIcon icon={faCirclePlay} /></h4>  
                </Col>  
                <Col>
                    <div>
                    <h4><LikeButton/></h4> 
                    </div> 
                </Col> 
                <Col>
                    <h4 style={{cursor: "pointer"}}><FontAwesomeIcon icon={faBarsStaggered}/> Add to queue</h4>
                </Col> 
                <Col>
                    <h4 style={{cursor: "pointer"}}><FontAwesomeIcon icon={faSquarePlus} /> Add to Playlist</h4>
                </Col>
                <Col>
                    <h4 style={{cursor: "pointer"}} onClick={copyToClip}><FontAwesomeIcon icon={faLink} /> Share</h4>
                </Col> 
                <Col>
                    <h4 style={{cursor: "pointer"}}><ReportModal/></h4>
                </Col> 
            </Row>
            <TrackList id={params.id}/>
        </Space>
    )
}