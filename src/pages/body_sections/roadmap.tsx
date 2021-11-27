import { useState, useEffect } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import Config from '../../utils/config';
import axios from 'axios';
import Logger from '../../utils/logger';

interface RoadmapInterface {
    title: string;
    todos: {
        contents: string;
        completed: boolean;
    }[],
    bg?: string;
    color?: string;
}

const RoadmapSection = () => {

    const [ roadMap, setRoadMap ] = useState<RoadmapInterface[]>();
    const [ isLoading, setLoading ] = useState(true);
    const [ retries, setRetries ] = useState(0);

    const getRoadmap = async () => {
        if (!Config.API_BASE_URI) return;
        if (retries >= 3) return; // just abort if retries is more than expected
        await axios.get(`${Config.API_BASE_URI}/roadmap`)
        .then(response => {
            setRoadMap(response.data);
            setLoading(false);
            setRetries(0); // reset it.
        })
        .catch(e => {
            Logger.log(e, "<== Error fetching roadmap");
            setRetries(retries + 1);
            getRoadmap();
        });
    }

    useEffect(() => {
        getRoadmap();

        return () => {
            // clear all clearables here
        }
    }, []);

    return (!isLoading && roadMap) ? (
        <section id="roadmap" style={{padding:'5%', background:'#0004'}}>
            <div style={{marginBottom:'1em', textAlign:'center'}}>
                <h1 style={{color:"#fff"}}>Roadmap</h1>
            </div>
            <div style={{padding:'1em'}}>
                <Card.Group /* itemsPerRow={2} */ flex>
                    {(Object.values(roadMap).map((mapItem, index) => {
                        return (
                            <Card fluid style={{background:mapItem.bg, color:mapItem.color}}>
                                <Card.Content>
                                    <Card.Header style={{color:mapItem.color}}>{mapItem.title}</Card.Header>
                                    <div style={{height:'.5px', background:`${mapItem.color}55`, marginTop:'1em'}} />
                                    <div style={{textAlign:'left', padding:'1em'}}>
                                    {(Object.values(mapItem.todos).map((itemList, i) => {
                                        return (
                                            <div style={{flexDirection:'row', display:'flex', padding:'.5em'}}>
                                                {itemList.completed ? <Icon name="check" color="green" /> : <Icon name="minus" style={{color:`${mapItem.color}aa`}} />}
                                                <Card.Description style={{flex:1, marginLeft:'1em', fontSize:'medium'}}>{itemList.contents}</Card.Description>
                                            </div>
                                        )
                                    }))}
                                    </div>
                                </Card.Content>
                            </Card>
                        )
                    }))}
                </Card.Group>
            </div>
        </section>
    ) : null;
}

export default RoadmapSection;