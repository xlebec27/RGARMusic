import { Space, Row, Col, Image, message } from 'antd'
import { TrackList } from '../components/TrackList'
import { Link, useParams } from "react-router-dom"
import "../assets/Pages.css"
import { LikeButton } from '../components/LikeButton'
import { faCirclePlay, faBarsStaggered, faSquarePlus, faLink, faFlag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useRef, useEffect, useContext } from 'react'
import axios from 'axios'
import { QueueContext, SongContext } from '../App'

export function PlaylistPage(params) {

    const [copySuccess, setCopySuccess] = useState("")
    const textAreaRef = useRef(null)
    const [messageApi, contextHolder] = message.useMessage();
    const [playlist, setPlaylist] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [queue, setQueue] = useContext(QueueContext);
    const [song, setSong] = useContext(SongContext);
    const [IDList, setIDList] = useState([]);


    let { playlistID } = useParams();

    async function copyToClip() {
        await navigator.clipboard.writeText(location.href);
        setCopySuccess("Copied");
        messageApi.open({
            type: 'success',
            content: 'Link copied to clipboard',
        });
    }

    useEffect(() => {
        async function load_playlist() {
            try {
                const response = await axios.get(`http://localhost:8000/api/user/playlist/${playlistID}/`,);
                setPlaylist(response.data);
                setIDList(response.data.track.map(a => a.id));
                setLoaded(true)
            } catch (error) {
                console.log(error);
            }
        }
        load_playlist();
    }, []);

    if (loaded) {
        return (
            <Space direction="vertical" className="header-img-name">
                {contextHolder}
                <Row align="bottom"
                    justify="start"
                    gutter={16}>
                    <Col span={6}>
                        <Image src={playlist?.cover} width={"90%"} />
                    </Col >
                    <Col span={18}>
                        <h1>{playlist?.name}</h1>
                        <Link to={`/user/${playlist?.user.id}`}><h2>{playlist?.user.name}</h2></Link>
                        <div>{playlist?.track?.length} {playlist?.track?.length == 1 ? "track" : "tracks"}</div>
                    </Col>
                </Row>
                <Row gutter={16} align="bottom" justify="start">
                    <Col>
                        <h4><FontAwesomeIcon icon={faCirclePlay} onClick={() => {setQueue(IDList); setSong(0)}} style={{ cursor: "pointer" }}/></h4>
                    </Col>
                    <Col>
                        <div>
                            <h4><LikeButton url={'http://localhost:8000/api/user/like/playlist/'} body={{id: playlistID}} /></h4>
                        </div>
                    </Col>
                    <Col>
                        <h4 style={{ cursor: "pointer" }} onClick={() => { var newQueue = queue.slice(0, song + 1); newQueue.push(...IDList, ...queue.slice(song + 1)); setQueue(newQueue) }}><FontAwesomeIcon icon={faBarsStaggered} /> Add to queue</h4>
                    </Col>
                    {/* <Col>
                        <h4 style={{ cursor: "pointer" }}><FontAwesomeIcon icon={faSquarePlus} /> Add to Playlist</h4>
                    </Col> */}
                    <Col>
                        <h4 style={{ cursor: "pointer" }} onClick={copyToClip}><FontAwesomeIcon icon={faLink} /> Share</h4>
                    </Col>
                    {/* <Col>
                        <h4 style={{ cursor: "pointer" }}><ReportModal /></h4>
                    </Col> */}
                </Row>
                <TrackList songs={playlist?.track} album={true} />
            </Space>
        )
    }
    else {
        return (<> loading </>)
    }
}
