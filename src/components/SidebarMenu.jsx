import React from "react";
import { useHistory } from "react-router-dom";
import {
    Grid,
    Menu,
    Sidebar,
    Button,
    Icon
  } from 'semantic-ui-react';
import { BULLCOIN_ADDRESS } from "../context/ContractProvider";

const SidebarMenu = ({ isVisible=false, setVisible=()=>{} }) => {
    const history = useHistory();

    return (
        <div style={{zIndex:9999}}>
            <Grid  className="menu-page-container">
                <Grid.Column className="menu-container">
                    <Sidebar 
                        as={Menu}
                        animation='overlay'
                        icon='labeled'
                        inverted
                        onHide={() => setVisible(false)}
                        vertical
                        visible={isVisible}
                        width='thin'
                    >
                        <Menu.Item as='a' className="menu-item" onClick={() => history.push("/")}>Dashboard</Menu.Item>
                        <Menu.Item as='a' className="menu-item-0" onClick={() => history.push("/options")}>Options</Menu.Item>
                        <Menu.Item as='a' className="menu-item" onClick={() => history.push("/explorer")}>Explorer</Menu.Item>
                        <Menu.Item as='a' className="menu-item" onClick={() => history.push("/roadmap")}>Roadmap</Menu.Item>
                        <Menu.Item as='a' className="menu-item" onClick={() => history.push("/whitepaper")}>Whitepaper</Menu.Item>
                        {/* <Menu.Item as="a">
                            <a href="https://google.com" id="space-link">Whitepaper</a>
                        </Menu.Item> */}
                        <Menu.Item as="a">
                            <a href={`${process.env.REACT_APP_SMART_CONTRACT_EXPLORER_BASE_URL}/token/${BULLCOIN_ADDRESS}`} target="_blank" rel="noreferrer noopener">Smart Contract</a>
                        </Menu.Item>
                        <Menu.Item as="a">
                            <a href="https://t.me/marketbullfin" target="_blank" rel="noreferrer noopener"><Button><Icon name="telegram" /></Button></a>
                        </Menu.Item>
                        <Menu.Item as="a">
                            <a href="https://twitter.com/MarketBullFin" target="_blank" rel="noreferrer noopener"><Button><Icon name="twitter" /></Button></a>
                        </Menu.Item>
                        
                    </Sidebar>
                </Grid.Column>
                
            </Grid>
        </div>
    );
};

export default SidebarMenu;