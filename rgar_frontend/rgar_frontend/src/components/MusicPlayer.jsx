import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useContext, useState, useEffect } from 'react';
import { SongContext, QueueContext } from '../App';
import { getTrackFile } from '../services/GetTrackFile';
import { Col, Row } from 'antd'
import { useNavigate} from 'react-router-dom';




// export const MusicPlayer = () => (
//     <AudioPlayer
//       autoPlay
//       src = {song}
//       onPlay={e => console.log("onPlay")}
//       // other props here
//     />
//   );


export function MusicPlayer() {

    const [queue, setQueue] = useContext(QueueContext);
    const [song, setSong] = useContext(SongContext);
    const [src, setSrc] = useState('');
    const [songData, setSongData] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        async function load_song() {
            try {
                await getTrackFile(queue[song]).then((song) => { setSrc(song.link); setSongData(song) })
            }
            catch (error) {
                console.error(error);
            }
        }
        load_song()
    }, [queue, song])

    const handleClickNext = () => {
        console.log('click next')
        setSong((song) =>
            song < queue.length - 1 ? song + 1 : 0
        );
    };

    const handleClickPrevious = () => {
        console.log('click prev')
        setSong((song) =>
            song > 0 ? song - 1 : 0
        );
    }

    const handleEnd = () => {
        console.log('end')
        setSong((song) =>
            song < queue.length - 1 ? song + 1 : 0
        );
    }

    return (
        <Row style={{ width: "100%" }}>
            <Col flex="170px">
                <div style={{ fontWeight: "bold" }}><div style={{cursor: "pointer"}} onClick={ e => {e.preventDefault(); navigate(`/album/${songData.album_id}`)}}>{songData.name}</div></div>
                <br/>
                <div style={{cursor: "pointer"}} onClick={ e => {e.preventDefault(); navigate(`/artist/${songData.artist?.toString()}`)}}>{songData.artist?.toString()}</div>
            </Col>
            <Col flex="auto">
                <AudioPlayer
                    volume="0.5"
                    src={src}
                    showSkipControls
                    showFilledVolume
                    onClickNext={handleClickNext}
                    onEnded={handleEnd}
                    onClickPrevious={handleClickPrevious}
                    onPlay={() => console.log("onPlay")}
                />
            </Col>
        </Row>

    )

}