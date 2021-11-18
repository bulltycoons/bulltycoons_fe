import { useMediaQuery } from 'react-responsive';
import { Button, Icon, Image } from 'semantic-ui-react';
import './about.css';

const AboutSection = () => {

    return (
        <section id="about" style={{padding:'1em'}}>
            <div style={{flexDirection:useMediaQuery({maxWidth:600}) ? 'column' : 'row', display:'flex', alignItems:'center'}}>
                <div style={{flex:2, textAlign:'left', padding:'4em'}}>
                    <h2 style={{color:"#3f3f3f"}}>About BullTycoons</h2>
                    <p style={{textAlign:'justify', fontSize:'1.3rem'}}>
                        BullTycoons is a layered NFT project randomly generated, having distinct properties to form a genus with each property depicting a particular Tycoon. 
                        <br />
                        The NFT project is community based, with the aim of empowering the community through animated series and gamified technology.
                    </p>
                    <p style={{textAlign:'justify', fontSize:'1.3rem'}}>
                        <span style={{marginBottom:'0.5em'}}>Join our community</span>
                        <br />
                        <div style={{marginTop:'1em', marginBottom:'1em'}}>
                            <a href="https://instagram.com/bulltycoons" target="_blank" rel="noreferrer noopener"><Icon name="instagram"color='black' size="big" /></a>
                            <a href="https://twitter.com/bulltycoons" target="_blank" rel="noreferrer noopener"><Icon name="twitter" color='black' size="big" /></a>
                            <a href="https://t.me/bulltycoons" target="_blank" rel="noreferrer noopener"><Icon name="telegram" color='black' size="big" /></a>
                            <a href="https://discord.gg/sTXnEBXzGe" target="_blank" rel="noreferrer noopener"><Icon name="discord" color='black' size="big" /></a>
                        </div>
                    </p>
                </div>
                {useMediaQuery({maxWidth:600}) && (<div style={{width:'100%', height:'1px', background:'#ffffff88', marginTop:'1.5em', marginBottom:'1.5em'}} />)}
                <div style={{flex:1}}>
                    <Image src='/assets/display_pic.gif' size="huge" style={{border:'.5em solid black'}} />
                </div>
            </div>
        </section>
    )
}

export default AboutSection;