import React, { useState } from "react";
import UserAuth from "../widgets/userauth";
import { Button, Icon, Image } from 'semantic-ui-react';
import './main.css';
import { useMediaQuery } from "react-responsive";


const Header = ({ ...otherProps}) => {

    const [ menuVisible, setMenuVisible ] = useState(false);
    const toggleMenu = () => {
        setMenuVisible(menuVisible ? false : true);
    }
     
    return (
        <div className="container" style={{background:'#000', padding:'1em'}} {...otherProps}>
        {/* <div className="container" style={{background:'#0155c5', padding:'1em'}} {...otherProps}> */}
            <nav className="navbar" style={{flexDirection:'row', display:'flex', alignItems:'center'}}>
                <div className="siteName" style={{flexDirection:'row',display:'flex',alignItems:'center', marginLeft:'1em', marginRight:'1em'}}>
                    <span style={{marginRight:'-0.5em', color:'#fff', fontSize:'2em'}}>Bull</span>
                    <Image style={{width:'4.5em',height:'4.5em'}} src='/assets/14.png' circular />
                    <span style={{color:'#fff', fontSize:'2em', marginLeft:'-0.5em'}}>Tycoons</span>
                </div>
                {!useMediaQuery({maxWidth: 600}) && (<div style={{flex:1}}>
                    <nav>
                        <ul className='header_nav'>
                            <li><a href="#about">About</a></li>
                            <li><a href="#mint">Mint</a></li>
                            <li><a href="#roadmap">Roadmap</a></li>
                            <li><a href="#team">Team</a></li>
                        </ul>
                    </nav>
                </div>)}
                <div>
                    <UserAuth />
                </div>
            </nav>
        </div>
    );
};

export default Header;