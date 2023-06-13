import axios from 'axios'

export function axiosGet(url, data){
    try {
        axios.get
    } catch (error) {
        
    }
}

export async function axiosPost(url, data){
    try {
        const response = await axios.post(url,
            JSON.stringify(data),
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );
        console.log(JSON.stringify(response.data));
        return response;
      } catch (error) {
        console.error(error);
        return error;
      }
}