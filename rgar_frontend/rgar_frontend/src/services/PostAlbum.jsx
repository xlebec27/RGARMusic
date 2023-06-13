import { createAlbum } from "../lib/AxiosServices";


export function PostAlbum({album, trackList}) {
    const albumToPost = {name: album?.name, genre: album?.genre, artist: album?.artist,  tracks: trackList, cover: album?.cover}
    return createAlbum( albumToPost
    );
  }