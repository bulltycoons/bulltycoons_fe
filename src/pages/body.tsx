import React, { CSSProperties } from 'react';
import AboutSection from './body_sections/about';
import MintSection from './body_sections/mint';
import RoadmapSection from './body_sections/roadmap';
import TeamSection from './body_sections/team';

interface BodyPropTypes {
    background?: String;
    children?: React.ReactHTML;
    style?: CSSProperties;
}

const Body = ({ style }: BodyPropTypes) => {

    return (
        <div style={style}>
            <AboutSection />
            <MintSection />
            <RoadmapSection />
            <TeamSection />
        </div>
    );
}

export default Body;