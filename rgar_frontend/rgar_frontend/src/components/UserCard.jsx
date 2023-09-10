import { Card, Avatar } from 'antd';
import "/src/assets/CoverCard.css"
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

export function UserCard(props) {

    let navigate = useNavigate();

    return (
        <Card className={"card-artist " + props.className} cover={<img alt="img artist" src={props.img} style={{ borderRadius: "50%" }} />}
            style={{ cursor: "pointer" }}
            onClick={() => navigate('/user/' + props.id)}>
            <Meta title={props.name} />
        </Card>



    )
}