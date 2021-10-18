import React from 'react';
import { im_tick } from '../assets';
import { Grid } from "semantic-ui-react";

const Farmcard = ({ pair1="", pair2="", isCore=false, multiplier='1X', pair1_logo, pair2_logo, apr, earn="", isActive=false }) => {

    return (
        
        <Grid.Column mobile={16} tablet={8} computer={4} width={8} className="farms">
            <div className="farms-intro">
                {pair1_logo && (<img src={pair1_logo} alt="bull" width="100" height="100" />)}
                {pair2_logo && (<div classname="img-subscript">
                    <img src={pair2_logo} alt="binance" width="20" height="20" />
                </div>)}
                <div className="farms-description">
                    <p className="bull-pair">{pair1}-{pair2}</p>
                    <p className="bull-pair-description">
                        {isCore && (<span className="core"><img src={im_tick} alt="tick" width="15" height="15"className="tick" />
                        core
                        </span>)}
                        <span className="times-figure">
                            {multiplier}
                        </span>
                    </p>
                </div>   
            </div>
            
            <div className="farm-values">
                <p>APR: <span className="space-out color-hover">{apr}</span></p>
                <p>earn: <span className="space-out color-hover">{earn}</span></p>
                <p>multiplier: <span className="space-out make-bold">{multiplier}</span></p>
            </div>
            {!isActive && (<div className="coming-container">
                <span className="coming">coming soon</span>
            </div>)}
        </Grid.Column>
    )
}

export default Farmcard;