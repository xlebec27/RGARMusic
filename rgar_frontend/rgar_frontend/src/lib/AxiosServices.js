import { client } from "./AxiosClient";

export function register({ email, password }) {
  return client.post(
    "/auth/users/",
    { email, password },
    { authorization: false }
  );
}

// export const login = async ({ email, password }) => {
//     console.log( email, ' ', password)
//     const response = await client.post(
//       "/auth/jwt/create/",
//         JSON.stringify({ email, password }),
//       { authorization: false }
//     );

//     return response
//   }
// export const login = async ({ email, password }) => {
//         console.log( email, ' ', password)
//         const response = await client.post(
//           "/auth/jwt/create/",
//             JSON.stringify({ email, password }),
//           { authorization: false }
//         );
    
//         return response
//       }

export function login({ email, password }) {
return client.post(
    "/auth/jwt/create/",
    { email, password },
    { authorization: false }
);
}

export function createArtist(name, picture, genre) {
  return client.post(
    "/api/admin/createArtist/",
    {name, picture, genre},
    { authorization: true }
    );
}

export function createAlbum({album}) {
    return client.post(
      "/api/admin/createAlbum/",
      {album},
      { authorization: true }
      );
  }