import {Space, Row, Col, Image, Divider, message} from 'antd'
import { TrackList } from '../components/TrackList'
import "../assets/Pages.css"
import { CoverCard } from '../components/CoverCard'
import { useParams } from 'react-router-dom'
import { useState, useRef, useEffect, useContext } from 'react'
import axios from "axios"
import { LikeButton } from '../components/LikeButton'
import { faCirclePlay, faBarsStaggered, faSquarePlus, faLink, faFlag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { QueueContext, SongContext } from '../App'



export function ArtistPage(params){

    const [copySuccess, setCopySuccess] = useState("")
    const textAreaRef = useRef(null)
    const [messageApi, contextHolder] = message.useMessage();
    const [artist, setArtist] = useState([]);
    const [loaded, setLoaded] = useState(false)
    const [queue, setQueue] = useContext(QueueContext);
    const [song, setSong] = useContext(SongContext);
    const [IDList, setIDList] = useState([]);

    let { artistID } = useParams();

    async function copyToClip() {
        await navigator.clipboard.writeText(location.href);
        setCopySuccess("Copied");
        messageApi.open({
            type: 'success',
            content: 'Link copied to clipboard',
        });
    }

    useEffect(() => {
        async function load_artist(){
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + `api/user/artist/${artistID}/`,);
                setArtist(response.data);
                setIDList(response.data.track_list.map(a => a.id));
                setLoaded(true)
            }
            catch (error) {
                console.error(error);
            }
        }
        load_artist()
    }, []);

    function renderAlbums() {
        var albums = artist.album_list?.slice(0, 6).map(album => {
            return <Col span={4} key={album.id}><CoverCard
                id={album.id}
                img={album.cover}
                name={album.name} desc={album.artist[0].name} type={"album"} className="playlist-card" />
            </Col>
        }
        )
        return albums
    }

    if (loaded) {
        return(
            <Space direction="vertical" className="header-img-name">
                <Row align="bottom"
                    justify="start"
                    gutter={16} > 
                    <Col span={6}>
                        <Image src={artist?.picture}
                        style={{overflow: "hidden"}}/>
                    </Col >     
                    <Col span={18} align='bottom'>
                        <h1>{artist?.name}</h1>
                    </Col> 
                </Row>
                <Divider></Divider>
                <Row gutter={16} align="bottom" justify="start">
                    <Col>
                        <h4><FontAwesomeIcon icon={faCirclePlay} onClick={() => {setQueue(IDList); setSong(0)}} style={{ cursor: "pointer" }}/></h4>
                    </Col>
                    <Col>
                        <div>
                            <h4><LikeButton url={import.meta.env.VITE_API_URL + 'api/user/like/artist/'} body={{id: artistID}} /></h4>
                        </div>
                    </Col>
                    <Col>
                        <h4 style={{ cursor: "pointer" }} onClick={() => { var newQueue = queue.slice(0, song + 1); newQueue.push(...IDList, ...queue.slice(song + 1)); setQueue(newQueue) }}><FontAwesomeIcon icon={faBarsStaggered} /> Add to queue</h4>
                    </Col>
                    <Col>
                        <h4 style={{ cursor: "pointer" }} onClick={copyToClip}><FontAwesomeIcon icon={faLink} /> Share</h4>
                    </Col>
                </Row>
                <Divider orientation="left">Popular Tracks</Divider>
                    <TrackList songs={artist?.track_list} album={false}/>
                <Divider orientation="left">Discography</Divider>
                <Row justify="space-around" type="flex">
                    {renderAlbums()}
                </Row>
            </Space>
        )
    }
    else{
        return <> loading </>
    }
    
}