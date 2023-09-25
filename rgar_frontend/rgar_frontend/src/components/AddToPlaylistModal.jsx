import { Button, Modal, Row, Col, Space, Input, Upload, Card } from 'antd';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const { Meta } = Card;

export function AddToPlaylistModal(props) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loaded, setLoaded] = useState(false);

    function showModal () {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [playlists, setPlaylists] = useState([])

    let navigate = useNavigate();

    useEffect(() => {
        async function load_playlists() {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + "api/user/user-playlist/",
                    {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
                    }
                );
                console.log(response.data);
                setPlaylists(response.data);
                setLoaded(true)
            }
            catch (error) {
                console.error(error);
            }
        }
        load_playlists()
    }, []);

    const update_playlist = async (track_id, playlist_id) => {
        console.log(track_id);
        try {
            await axios.put(import.meta.env.VITE_API_URL + "api/user/playlist/update/",
                { track_id: track_id, playlist_id: playlist_id },
                {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },

                }
            )
            setIsModalOpen(false);
        } catch (error) {
            if (error?.response?.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
            console.error(error);
        }

    }

    function renderPlaylists() {
        var cards = []
        cards.push(playlists?.map(playlist => {
            console.log(props.track_id);
            console.log(playlist.id);
            return <Card cover={<img alt="img cover" src={playlist.cover} />} style={{ overflow: "clip", cursor: "pointer" }} className="playlist-card"
                onClick={ () =>  update_playlist(props?.track_id, playlist?.id)}>
                <Meta title={playlist.name} />
            </Card>
        }))
        return cards;

    }

    return (
        <>
            <div onClick={e => {e.stopPropagation(); showModal();}} style={{ cursor: "pointer" }}>
                <a>Add to Playlist</a>
            </div>
            <Modal title="Add To Playlist" open={isModalOpen} onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>]}>

                <Space direction="vertical" wrap style={{ textAlign: "center", paddingTop: "5%" }}>
                    {(loaded) ? renderPlaylists() : "loading"}
                </Space>
            </Modal>

        </>

    )
};