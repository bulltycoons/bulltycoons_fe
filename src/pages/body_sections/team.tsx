import { CSSProperties, useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Card, Image } from 'semantic-ui-react';
import Config from '../../utils/config';
import axios from 'axios';
import Logger from '../../utils/logger';

interface CardProps {
    image: String;
    name: String;
    description: String;
    style?: CSSProperties;
}

const CardItem = ({ image, name, description, ...otherProps } : CardProps) => {
    return (
        <Card {...otherProps}>
            <Image src={image} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Description>
                    {description}
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

interface TeamResponseInterface {
    baseImageURI: string;
    teamMetadata: {
        tokenId: number | string,
        name: string,
        role: string
    }[];
}

const TeamSection = () => {

    const [ teamResponse, setTeamResponse ] = useState<TeamResponseInterface>();
    const [ isLoading, setLoading ] = useState(true);
    const [ retries, setRetries ] = useState(0);

    const isSmallScreen = useMediaQuery({maxWidth:700});

    const getRoadmap = async () => {
        if (!Config.API_BASE_URI) return;
        if (retries >= 3) return; // just abort if retries is more than expected
        await axios.get(`${Config.API_BASE_URI}/team`)
        .then(response => {
            setTeamResponse(response.data);
            setLoading(false);
            setRetries(0); // reset it.
        })
        .catch(e => {
            Logger.log(e, "<== Error fetching team");
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

    return (!isLoading && teamResponse) ? (
        <section id="team" style={{padding:'5%', background:'#0004'}}>
            <div style={{marginBottom:'1em', textAlign:'center'}}>
                <h1 style={{color:"#fff"}}>Team</h1>
            </div>
            <div style={{alignItems:'center', padding:'1em'}}>
                <Card.Group itemsPerRow={isSmallScreen ? 2 : 5}>
                    {Object.values(teamResponse.teamMetadata).map((val,index) => {
                        return (
                            <CardItem key={`${index}`} image={`${teamResponse.baseImageURI}/${val.tokenId}.png`} name={val.name} description={val.role} style={{margin:'.5em'}} />
                        );
                    })}
                </Card.Group>
            </div>
        </section>
    ) : null;
}

export default TeamSection;