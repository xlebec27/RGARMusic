import { Card, Avatar } from 'antd';
import "/src/assets/CoverCard.css"
import { Link } from "react-router-dom";

const { Meta } = Card;

export function UserCard(props) {
    
    let id = props.id

    return(
        <Link to={"/user/" + id}>
            <Card className={"card-artist " + props.className} cover={<img alt="img artist" src={props.img} style={{borderRadius: "50%"}} />}>
                <Meta title={props.name}/>
            </Card>
        </Link>
    
        
    
    )
}