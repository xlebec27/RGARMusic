import { getTrackFile } from "../services/GetTrackFile";
import { SongContext, QueueContext } from '../App';
import { useContext } from 'react';


export function playSong(id){

    link = "http://localhost:8000/" + getTrackFile(id);

}