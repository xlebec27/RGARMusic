import axios from "axios"

export async function getTrackFile(id){
        try {
            console.log(id);
            const link = await axios.get(import.meta.env.VITE_API_URL + "/api/user/trackfile/" + id + "/",
                {
                    headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
                }
            );
            const songData = await axios.get(import.meta.env.VITE_API_URL + "/api/user/track/" + id + "/",
                {
                    headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
                }
            );
            return {link: import.meta.env.VITE_API_URL + link.data.link, name: songData.data.name, artist: songData.data.artist, album_id: songData.data.album.id};
        }
        catch (error) {
            console.error(error);
        }
    
}