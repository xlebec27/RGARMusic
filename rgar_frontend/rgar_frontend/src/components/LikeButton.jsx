import { useState } from "react";
import '../assets/LikeButton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export function LikeButton() {
    const [liked, setLiked] = useState(false);
    const [clicked, setClicked] = useState('');

    let btnClass = liked ? 'liked': '';

    return (
        <FontAwesomeIcon
        icon={faHeart}
        className={`like-button-wrapper ${btnClass}`}
        onClick={() => {
            setLiked(!liked);
            setClicked(false);
        }}
        />
    );
};