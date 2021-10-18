// import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Button, Icon } from 'semantic-ui-react';
import './mint.css';
import { useWallet } from 'use-wallet';
import UserAuth from '../../components/widgets/userauth';

const startDate = new Date("10-17-2021 16:10").getTime();
const dateNow = new Date().getTime();

const MintButton = () => {
    const { account, status } = useWallet();

    const mintTycoon = () => {
        alert("Bulltycoons minting...");
    }

    return  (account && status == 'connected') ? (
        <Button color='blue' size='big' onClick={mintTycoon}>Mint</Button>
    ) : (
        <UserAuth connectText="Connect Wallet" />
    )
}

const MintSection = () => {

    return (
        <section id="mint" style={{padding:'5%', background:'#000', color:'#ffffff'}}>
            <div style={{flexDirection:useMediaQuery({maxWidth:600}) ? 'column' : 'row', display:'flex', alignItems:'center'}}>
                <div style={{flex:2, textAlign:'left', padding:'1em'}}>
                    <h2 style={{color:"#fff"}}>Mint Your BullTycoons</h2>
                    <p style={{display:'flex',flexDirection:'row'}}><Icon name="bullseye" style={{color:"#fff"}} /> <span style={{flex:1}}>Connect your Metamask wallet</span></p>
                    <p style={{display:'flex',flexDirection:'row'}}><Icon name="bullseye" style={{color:"#fff"}} /> <span style={{flex:1}}>Configure and change your network to Polygon Network ( see how to set it up <a href="https://docs.polygon.technology/docs/develop/network-details/network/" target="_blank">here</a> )</span></p>
                    <p style={{display:'flex',flexDirection:'row'}}><Icon name="bullseye" style={{color:"#fff"}} /> <span style={{flex:1}}>Select the number of BullTycoons you want (0.05 ETH per one)</span></p>
                    <p style={{display:'flex',flexDirection:'row'}}><Icon name="bullseye" style={{color:"#fff"}} /> <span style={{flex:1}}>Click on Mint</span></p>
                    <p style={{display:'flex',flexDirection:'row'}}><Icon name="bullseye" style={{color:"#fff"}} /> <span style={{flex:1}}>Approve the transaction</span></p>
                    <p style={{display:'flex',flexDirection:'row'}}><Icon name="bullseye" style={{color:"#fff"}} /> <span style={{flex:1}}>Click on the transaction ID for more details about your transaction</span></p>
                </div>
                {useMediaQuery({maxWidth:600}) && (<div style={{width:'100%', height:'1px', background:'#ffffff88', marginTop:'1.5em', marginBottom:'1.5em'}} />)}
                {(dateNow < startDate) && (
                    <div style={{flex:1}}>
                        <h2>Mint Starts:</h2>
                        <h3>{new Date(startDate).toDateString()}</h3>
                        <Button color='blue' size='big'>Remind Me</Button>
                    </div>
                )}
                {((dateNow >= startDate) /* && minted amount < 1000 */) && (
                    <div style={{flex:1}}>
                        <h3>Already Minted (0/1000)</h3>
                        <hr />
                        <h2>Mint Cost:</h2>
                        <p style={{fontSize:'medium'}}>0.05ETH + gas fee</p>
                        <MintButton />
                    </div>
                )}

                {/* {((dateNow > startDate) /* && minted amount >= 1000 *) && (
                    <div style={{flex:1}}>
                        <h2>Mint Finished since:</h2>
                        <h3>Nov 3, 2021 15:54 CST</h3>
                    </div>
                )} */}
            </div>
        </section>
    )
}

export default MintSection;