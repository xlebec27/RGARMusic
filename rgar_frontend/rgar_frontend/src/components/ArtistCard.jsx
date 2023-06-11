import { Card, Avatar } from 'antd';
import "/src/assets/CoverCard.css"
import { Link } from "react-router-dom";

const { Meta } = Card;

export function ArtistCard(props) {
    
    return(
        <Link to={"/artist"}>
            <Card className={"card-artist " + props.className} cover={<img alt="img artist" src={props.img} style={{borderRadius: "50%"}} />}>
                <Meta title={props.name}/>
            </Card>
        </Link>
    
        
    
    )
}