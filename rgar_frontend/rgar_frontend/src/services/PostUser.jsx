import { createAlbum } from "../lib/AxiosServices";


export function PostUser({ email, password }) {
    return client.post(
      "auth/register",
      { email, password },
      { authorization: false }
    );
  }