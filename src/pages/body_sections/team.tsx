import { CSSProperties, useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Card, Image } from 'semantic-ui-react';
import Config from '../../utils/config';
import axios from 'axios';
import Logger from '../../utils/logger';

interface CardProps {
    image: string;
    name: string;
    description: string;
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
    teamMetadata: {
        tokenId: number | string,
        name: string,
        role: string
    }[];
}

const TeamSection = () => {

    const [ teamResponse, setTeamResponse ] = useState<TeamResponseInterface>();
    const [ isLoading, setLoading ] = useState(true);

    const isSmallScreen = useMediaQuery({maxWidth:700});

    const getTeam = (retries=0) => {
        if (!Config.API_BASE_URI) return;
        if (retries >= 3) return; // just abort if retries is more than expected
        axios.get(`${Config.API_BASE_URI}/team`)
        .then(async (response) => {
            const data:TeamResponseInterface = response.data;
            setTeamResponse(data);
            setLoading(false);
        })
        .catch(e => {
            Logger.log(e, "<== Error fetching team");
            getTeam(retries + 1);
        });
    }

    useEffect(() => {
        getTeam();

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
                            <CardItem key={`${index}`} image={`${Config.API_BASE_URI}/image/${val.tokenId}`} name={val.name} description={val.role} style={{margin:'.5em'}} />
                        );
                    })}
                </Card.Group>
            </div>
        </section>
    ) : null;
}

export default TeamSection;