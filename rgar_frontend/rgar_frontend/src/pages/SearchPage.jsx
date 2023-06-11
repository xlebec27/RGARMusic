import {Row, Col, Space, Input, Anchor} from 'antd'
import { CoverCard } from '../components/CoverCard';

const { Search } = Input;

export function SearchPage(params) {
    return(
        <Space direction="vertical" style={{width: '98%'}}>
            <Row id="search">
            <Search
                placeholder="Input search text"
                allowClear
                enterButton="Search"
                size="large"
                // onSearch={onSearch}
                />
            </Row>
            <Row>
                <Col span={18}>
                    <h3 id="tracks">Tracks</h3>
                    <Row justify="space-around">
                        <Col span={4}><CoverCard 
                            img="https://lastfm.freetls.fastly.net/i/u/ar0/f75fb3b1b05042e35dd3597efe3d8f27.jpg" 
                            name="Rouge Carpet Disaster" desc="Static Dress"/>
                        </Col>
                    <Col span={4}><CoverCard img="https://upload.wikimedia.org/wikipedia/ru/0/05/Deftones_White_Pony.jpeg" name="White Pony" desc="Deftones"/></Col>
                    <Col span={4}><CoverCard img="https://lastfm.freetls.fastly.net/i/u/ar0/f75fb3b1b05042e35dd3597efe3d8f27.jpg" name="aaaa" desc="bbb"/></Col>
                    <Col span={4}><CoverCard img="https://upload.wikimedia.org/wikipedia/ru/0/05/Deftones_White_Pony.jpeg" name="aaaa" desc="bbb"/></Col>
                    </Row>
                    <h3 id="artists">Artists</h3>
                    <Row justify="space-around">
                    <Col span={4}><CoverCard img="https://lastfm.freetls.fastly.net/i/u/ar0/f75fb3b1b05042e35dd3597efe3d8f27.jpg" name="aaaa" desc="bbb"/></Col>
                    <Col span={4}><CoverCard img="https://upload.wikimedia.org/wikipedia/ru/0/05/Deftones_White_Pony.jpeg" name="aaaa" desc="bbb"/></Col>
                    </Row>
                    <h3 id="albums">Albums</h3>
                    <Row justify="space-around">
                    <Col span={4}><CoverCard img="https://lastfm.freetls.fastly.net/i/u/ar0/f75fb3b1b05042e35dd3597efe3d8f27.jpg" name="aaaa" desc="bbb"/></Col>
                    <Col span={4}><CoverCard img="https://upload.wikimedia.org/wikipedia/ru/0/05/Deftones_White_Pony.jpeg" name="aaaa" desc="bbb"/></Col>
                    </Row>
                    <h3 id="playlists">Playlists</h3>
                    <Row justify="space-around" >
                    <Col span={4}><CoverCard img="https://lastfm.freetls.fastly.net/i/u/ar0/f75fb3b1b05042e35dd3597efe3d8f27.jpg" name="aaaa" desc="bbb"/></Col>
                    <Col span={4}><CoverCard img="https://upload.wikimedia.org/wikipedia/ru/0/05/Deftones_White_Pony.jpeg" name="aaaa" desc="bbb"/></Col>
                    </Row>
                    <h3 id="users">Users</h3>
                    <Row justify="space-around">
                    <Col span={4}><CoverCard img="https://lastfm.freetls.fastly.net/i/u/ar0/f75fb3b1b05042e35dd3597efe3d8f27.jpg" name="aaaa" desc="bbb"/></Col>
                    <Col span={4}><CoverCard img="https://upload.wikimedia.org/wikipedia/ru/0/05/Deftones_White_Pony.jpeg" name="aaaa" desc="bbb"/></Col>
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