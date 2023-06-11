import {Space, Row, Col} from 'antd';
import {useNavigate} from 'react-router-dom';
import { CoverCard } from '../components/CoverCard';

export function HomePage(){
    let navigate = useNavigate();

    const routeChange = () =>{
        navigate('/login');
      }

    return (
        <Space direction="vertical" style={{width: '100%'}}>
            <h3>Popular</h3>
            <Row justify="space-around">
                <Col span={4}><CoverCard 
                    img="https://lastfm.freetls.fastly.net/i/u/ar0/f75fb3b1b05042e35dd3597efe3d8f27.jpg" 
                    name="Rouge Carpet Disaster" desc="Static Dress"/>
                </Col>
                <Col span={4}><CoverCard img="https://upload.wikimedia.org/wikipedia/ru/0/05/Deftones_White_Pony.jpeg" name="White Pony" desc="Deftones"/></Col>
                <Col span={4}><CoverCard img="https://lastfm.freetls.fastly.net/i/u/ar0/f75fb3b1b05042e35dd3597efe3d8f27.jpg" name="aaaa" desc="bbb"/></Col>
                <Col span={4}><CoverCard img="https://upload.wikimedia.org/wikipedia/ru/0/05/Deftones_White_Pony.jpeg" name="aaaa" desc="bbb"/></Col>
            </Row>
            <h3>Recommended</h3>
            <Row justify="space-around">
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
            </Row>
            <h3>Latest</h3>
            <Row justify="space-around">
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
            </Row>
        </Space>

    )
}