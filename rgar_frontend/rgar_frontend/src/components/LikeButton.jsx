import { useState, useEffect } from "react";
import '../assets/LikeButton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import axios from "axios"

export function LikeButton(props) {
    const [liked, setLiked] = useState(false);
    const [clicked, setClicked] = useState('');

    useEffect(() => {
        async function load_status() {
            try {
                const response = await axios.get(props.url,
                    
                    {
                        headers: {'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
                        params: props.body
                    }
                );
                var state = response.data.result ? true : false;
                setLiked(state);
            }
            catch (error) {
                console.error(error);
            }
        }
        load_status()
    }, []);

    async function post_like(){
        try {
            const response = await axios.post(props.url, props.body,
                {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
                }
            );
            console.log(response.data);
        }
        catch (error) {
            console.error(error);
        }
    }

    async function delete_like(){
        try {
            const response = await axios.delete(props.url, 
                {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
                    data: props.body
                }
            );
            console.log(response.data);
        }
        catch (error) {
            console.error(error);
        }
    }

    let btnClass = liked ? 'liked': '';

    return (
        <FontAwesomeIcon
        icon={faHeart}
        className={`like-button-wrapper ${btnClass}`}
        onClick={async() => {
            if(liked) {
                delete_like()
            }
            else{
                post_like();
            }
            setLiked(!liked);
            setClicked(false);
        }}
        style={{ cursor: "pointer" }}
        />
    );
};