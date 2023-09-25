import { Table, Space } from 'antd'
import { getTrackFile } from '../services/GetTrackFile';
import { useContext, useState, useEffect } from 'react';
import { SongContext, QueueContext } from '../App';
import axios from 'axios'
import { AddToPlaylistModal } from './AddToPlaylistModal';


export function TrackList(props) {

    

    const [song, setSong] = useContext(SongContext);
    const [queue, setQueue] = useContext(QueueContext);

    const [data, setData] = useState([])
    const [columns, setColumns] = useState([])
    const [IDList, setIDList] = useState([])

    const artistColumns = [
        {
            title: 'N',
            render: (item, record, index) => { return index + 1 },
            width: '20%'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <AddToPlaylistModal track_id={record.key}/>
                    <a onClick={e => { e.stopPropagation(); var newQueue = queue.slice(0, song + 1); newQueue.push(record.key, ...queue.slice(song + 1)); setQueue(newQueue) }}>Add to Queue</a>
                </Space>
            ),
            width: '20%'
        }
    ];

    const albumColumns = [
        {
            title: 'N',
            render: (item, record, index) => { return index + 1 },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Artist',
            dataIndex: 'artist',
            key: 'artist',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <AddToPlaylistModal track_id={record.key}/>
                    <a onClick={e => { e.stopPropagation(); var newQueue = queue.slice(0, song + 1); newQueue.push(record.key, ...queue.slice(song + 1)); setQueue(newQueue) }}>Add to Queue</a>
                </Space>
            ),
            width: '20%'
        }
    ];


    useEffect(() => {
        if (props.album) {
            setColumns(albumColumns)
            setData(props.songs?.map(song => ({
                key: song.id, name: song.name,
                artist: song.artist.toString()
            })))
        }
        else {
            setColumns(artistColumns)
            setData(props.songs?.map(song => ({ key: song.id, name: song.name })))
        }
        setIDList(props.songs?.map(song => song.id))
    }, [])

    if (props.songs == undefined) {
        return (
            <></>
        )
    }
    else {
        return (
            <Table dataSource={data} columns={columns} pagination={false}
            onRow={(record, rowIndex) => {
                return {
                    onClick: async () => {setQueue(IDList); setSong(rowIndex);},
                };
            }} 
            />
        )
    }


}