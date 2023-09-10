import { Card } from 'antd';
import "/src/assets/CoverCard.css"
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

export function CoverCard(props) {
    
    let navigate = useNavigate();
    
    return(
        <Card cover={<img alt="img cover" src={props.img} className='card-cover'/>} style={{overflow: "clip", cursor: "pointer"}} className={props.className}
            onClick={() => navigate(`/${props.type}/${props.id}`)}>
            <Meta title={props.name} description={<div onClick={e => {e.stopPropagation(); navigate('/artist/' + props.desc)}} className='card-meta-artist'>{props.desc}</div>} >
                
            </Meta>
        </Card>
        
    
    )
}