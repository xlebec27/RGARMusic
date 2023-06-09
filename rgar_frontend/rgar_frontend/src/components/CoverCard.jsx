import { Card } from 'antd';
import "/src/assets/CoverCard.css"

const { Meta } = Card;

export function CoverCard(props) {
    
    return(
    <Card cover={<img alt="example" src={props.coverLink} className='card-cover'/>} style={{overflow: "hidden"}}>
        <Meta title={props.name} description={props.desc} >
            Play
        </Meta>
    </Card>
        
    
    )
}