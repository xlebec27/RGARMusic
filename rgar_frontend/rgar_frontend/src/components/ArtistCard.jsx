import { Card, Avatar } from 'antd';
import "/src/assets/CoverCard.css"
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

export function ArtistCard(props) {

    let navigate = useNavigate();

    return (
        <Card className={"card-artist " + props.className} cover={<Avatar alt="img artist" src={props.img} style={{ width: "100%", height: "100%",aspectRatio: '1/1' }} />}
            style={{ cursor: "pointer" }}
            onClick={() => navigate('/artist/' + props.id)}>
            <Meta title={props.name} />
        </Card>



    )
}