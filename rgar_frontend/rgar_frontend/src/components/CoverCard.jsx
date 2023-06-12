import { Card } from 'antd';
import "/src/assets/CoverCard.css"
import { Link } from "react-router-dom";

const { Meta } = Card;

export function CoverCard(props) {
    
    return(
        <Link to={"/album"}>
            <Card cover={<img alt="img cover" src={props.img} className='card-cover'/>} style={{overflow: "clip"}} className={props.className}>
                <Meta title={props.name} description={props.desc} >
                    Play
                </Meta>
            </Card>
       </Link>
        
    
    )
}