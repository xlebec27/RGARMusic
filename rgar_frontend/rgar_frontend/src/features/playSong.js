import { getTrackFile } from "../services/GetTrackFile";
import { SongContext, QueueContext } from '../App';
import { useContext } from 'react';


export function playSong(id){

    link = import.meta.env.VITE_API_URL + getTrackFile(id);

}