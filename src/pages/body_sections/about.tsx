import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Icon, Image } from 'semantic-ui-react';
import axios from 'axios';
import './about.css';
import Logger from '../../utils/logger';
import Config from '../../utils/config';

const AboutSection = () => {

    const [ isImgLoading, setImgLoading ] = useState(true);
    const [ imgUrl, setImgUrl ] = useState<string>();
    const [ tokenId, setTokenId ] = useState(Math.ceil(Math.random()*100));

    useEffect(() => {
        if (!Config.API_BASE_URI) return;
        axios.get(`${Config.API_BASE_URI}/${tokenId}`)
        .then(response => {
            setImgUrl(response.data.image);
            setImgLoading(false);
        })
        .catch(e => {
            Logger.log(e, "<== Error fetching metadata");
        })
        .finally(() => {
            // setTokenId(tokenId + 1);
        });
    }, []);

    return (
        <section id="about" style={{padding:'1em'}}>
            <div style={{flexDirection:useMediaQuery({maxWidth:600}) ? 'column' : 'row', display:'flex', alignItems:'center'}}>
                <div style={{flex:2, textAlign:'left', padding:'4em'}}>
                    <h2>About BullTycoons</h2>
                    <p style={{textAlign:'justify', fontSize:'1.3rem'}}>
                        BullTycoons is a layered NFT project randomly generated, having distinct properties to form a genus with each property depicting a particular Tycoon. 
                        <br />
                        The NFT project is community based, with the aim of empowering the community through animated series and gamified technology.
                    </p>
                    <p style={{textAlign:'justify', fontSize:'1.3rem'}}>
                        <span style={{marginBottom:'0.5em'}}>Join our community</span>
                        <br />
                        <div style={{marginTop:'1em', marginBottom:'1em'}}>
                            <a href="https://instagram.com/bulltycoons" target="_blank" rel="noreferrer noopener"><Icon name="instagram" size="big" /></a>
                            <a href="https://twitter.com/bulltycoons" target="_blank" rel="noreferrer noopener"><Icon name="twitter" size="big" /></a>
                            <a href="https://t.me/bulltycoons" target="_blank" rel="noreferrer noopener"><Icon name="telegram" size="big" /></a>
                            <a href="https://discord.gg/sTXnEBXzGe" target="_blank" rel="noreferrer noopener"><Icon name="discord" size="big" /></a>
                        </div>
                    </p>
                </div>
                {useMediaQuery({maxWidth:600}) && (<div style={{width:'100%', height:'1px', background:'#ffffff88', marginTop:'1.5em', marginBottom:'1.5em'}} />)}
                <div style={{flex:1}}>
                    {!isImgLoading && <div id="img_display"><Image src={imgUrl} size="huge" style={{border:'.5em solid white'}} /></div>}
                </div>
            </div>
        </section>
    )
}

export default AboutSection;