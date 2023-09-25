import { Card, Avatar } from 'antd';
import "/src/assets/CoverCard.css"
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

export function CoverCard(props) {
    
    let navigate = useNavigate();
    
    return(
        <Card cover={<Avatar alt="img cover" src={props.img} shape="square" className='card-cover' style={{ width: "100%", height: "100%",aspectRatio: '1/1' }}/>}
            style={{overflow: "clip", cursor: "pointer"}} className={props.className}
            onClick={() => navigate(`/${props.type}/${props.id}`)}>
            <Meta title={props.name} description={<div onClick={e => {e.stopPropagation(); navigate('/artist/' + props.desc)}} className='card-meta-artist'>{props.desc}</div>} >
            </Meta>
        </Card>
        
    
    )
}