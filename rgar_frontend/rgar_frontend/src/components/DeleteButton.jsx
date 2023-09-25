import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import axios from "axios"
import { useState } from "react";

export function DeleteButton(props){

    const [deleted, setDeleted] = useState(false)
    async function sendDelete(){
        try {
            const response = await axios.delete(props.url + props.id + "/",
                {
                    headers: {'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
                }
            );
            setDeleted(true)
        }
        catch (error) {
            console.error(error);
        }
    }

    return(
        <>{deleted ? <><FontAwesomeIcon
            icon={faTrashCan}
            /> Deleted </> : <FontAwesomeIcon
            icon={faTrashCan}
            onClick={sendDelete}
            style={{ cursor: "pointer" }}
            />}</>
        
    )
}