import { useMediaQuery } from "react-responsive";
import {  Icon } from "semantic-ui-react";
import { BULLTYCOON_ADDRESS } from "../context/ContractProvider";
import Config from "../utils/config";

const Footer = () => {
    return (
        <div style={{background:'#000', padding:'1em', color:'#fff'}}>
            <div style={{display:'flex', flexDirection:useMediaQuery({maxWidth:600}) ? 'column' : 'row', marginBottom:'1em', marginLeft:'1em', marginRight:'1em'}}>
                <div style={{flex:1, justifyContent:'right', padding:'1em'}}>
                    <div style={{textAlign:'left'}}>
                        <h3>Quick Links</h3>
                        <a href="#about" style={{color:'#fff'}}><Icon name="hashtag" /> About</a><br/>
                        <a href="#mint" style={{color:'#fff'}}><Icon name="hashtag" /> Mint</a><br/>
                        <a href="#roadmap" style={{color:'#fff'}}><Icon name="hashtag" /> Roadmap</a><br/>
                        <a href="#team" style={{color:'#fff'}}><Icon name="hashtag" /> Team</a><br/>
                        <a style={{color:'#fff'}} href={`${Config.BLOCKCHAIN_EXPLORER_BASE_URL}/${BULLTYCOON_ADDRESS}`} target="_blank" rel="noreferrer noopener"><Icon name="external" /> Smart Contract</a><br/>
                    </div>
                </div>
                <div style={{flex:1, justifyContent:'right', padding:'1em'}}>
                    <div style={{textAlign:'left'}}>
                        <h3>Join the Community!</h3>
                        <a href="https://twitter.com/bulltycoons" style={{color:'#fff'}} target="_blank" rel="noreferrer noopener"><Icon name="twitter" /> Twitter</a><br/>
                        <a href="https://instagram.com/bulltycoons" style={{color:'#fff'}} target="_blank" rel="noreferrer noopener"><Icon name="instagram" /> Instagram</a><br/>
                        <a href="https://t.me/bulltycoons" style={{color:'#fff'}} target="_blank" rel="noreferrer noopener"><Icon name="telegram" /> Telegram</a><br/>
                        <a href="https://discord.gg/sTXnEBXzGe" style={{color:'#fff'}} target="_blank" rel="noreferrer noopener"><Icon name="discord" /> Discord</a><br/>
                    </div>
                </div>
                {!useMediaQuery({maxWidth:600}) && (<div style={{flex:1}}></div>)}
                {!useMediaQuery({maxWidth:600}) && (<div style={{flex:1}}></div>)}
            </div> 
            {/* <div>
                
            </div> */}
            <span>
                2021 &#169; BullTycoons
            </span>
        </div>
    );
}

export default Footer;