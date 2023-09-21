import {Space, Row, Col, Button} from 'antd';
import {useNavigate} from 'react-router-dom';
import { CoverCard } from '../components/CoverCard';
import { useContext, useState, useEffect } from 'react';
import { SongContext, QueueContext } from '../App';
import axios from "axios"

export function HomePage(){
    let navigate = useNavigate();

    const [song, setSong] = useContext(SongContext);
    const [queue, setQueue] = useContext(QueueContext);

    const [recs, setRecs] = useState([]);
    const [latest, setLatest] = useState([]);

    useEffect(() => {
        async function load_homepage() {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + "api/user/recommend/?n=4",
                    {
                        headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
                    }
                );
                console.log(response.data);
                setRecs(response.data);
            }
            catch (error) {
                console.error(error);
            }
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + "api/user/albums/get-last/?n=4",
                );
                console.log(response.data);
                setLatest(response.data);
            }
            catch (error) {
                console.error(error);
            }
        }
        load_homepage()
    }, []);


    function renderRecs() {
        var albums = recs?.map(album => {
            return <Col span={4} key={album.id}><CoverCard
                id={album.id}
                img={import.meta.env.VITE_API_URL + album.cover}
                name={album.name} desc={album.artist[0].name} type={"album"}/>
            </Col>
        }
        )
        return albums
    }


    function renderLatest() {
        var albums = latest?.map(album => {
            return <Col span={4} key={album.id}><CoverCard
                id={album.id}
                img={album.cover}
                name={album.name} desc={album.artist[0].name} type={"album"}/>
            </Col>
        }
        )
        return albums
    }


    const routeChange = () =>{
        navigate('/login');
      }

    return (
        <Space direction="vertical" style={{width: '100%'}}>
            <h3>Popular</h3>
            <Row justify="space-around">
                {renderLatest()}
            </Row>
            <h3>Recommended</h3>
            <Row justify="space-around">
                {renderRecs()}
            </Row>
            <h3>Latest</h3>
            <Row justify="space-around">
                {renderLatest()}
            </Row>
        </Space>

    )
}