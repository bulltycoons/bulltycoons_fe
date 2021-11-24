import React, { CSSProperties } from 'react';
import AboutSection from './body_sections/about';
import MintSection from './body_sections/mint';
import RoadmapSection from './body_sections/roadmap';
import TeamSection from './body_sections/team';
// import '../assets/css/stars.css';

interface BodyPropTypes {
    background?: String;
    children?: React.ReactHTML;
    style?: CSSProperties;
    id?: string;
}

const Body = ({ style, ...otherProps }: BodyPropTypes) => {

    return (
        <div id="mainbody" style={style} {...otherProps}>
            {/* <div className="galaxy">
                <div className="stars1"></div>
                <div className="stars2"></div>
                <div className="stars3"></div>
            </div> */}
            <AboutSection />
            <MintSection />
            <RoadmapSection />
            <TeamSection />
        </div>
    );
}

export default Body;