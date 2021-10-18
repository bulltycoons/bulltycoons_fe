import { CSSProperties } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Card, Image } from 'semantic-ui-react';

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

const TeamSection = () => {

    return (
        <section id="team" style={{padding:'5%', background:'#dddddd'}}>
            <div style={{marginBottom:'1em', textAlign:'center'}}>
                <h1 style={{color:"#3f3f3f"}}>Team</h1>
            </div>
            <div style={{alignItems:'center', padding:'1em'}}>
                <Card.Group itemsPerRow={useMediaQuery({maxWidth:700}) ? 2 : 5}>
                    <CardItem image='/assets/team/33.png' name='Dev Tycoon' description='Developer' style={{margin:'.5em'}} />
                    <CardItem image='/assets/team/52.png' name='Tycoonist' description='Artist' style={{margin:'.5em'}} />
                    <CardItem image='/assets/team/87.png' name='Tycoon Safu' description='Community Moderator' style={{margin:'.5em'}} />
                    <CardItem image='/assets/team/118.png' name='Twycoon' description='Public Relations' style={{margin:'.5em'}} />
                    <CardItem image='/assets/team/140.png' name='Stycoon' description='Marketer' style={{margin:'.5em'}} />
                </Card.Group>
            </div>
        </section>
    )
}

export default TeamSection;