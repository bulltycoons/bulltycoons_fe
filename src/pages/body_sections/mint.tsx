import { useMediaQuery } from 'react-responsive';
import { Button, Icon } from 'semantic-ui-react';
import './mint.css';
import UserAuth from '../../components/widgets/userauth';
import { useEthers, useContractFunction, useContractCall } from '@usedapp/core';
import { BullTycoonsContractABI, BullTycoonsContractAddress, BullTycoonsFactoryContract, BullTycoonsFactoryContractABI, BullTycoonsFactoryContractAddress, WethABI, WethAddress, WethContract } from '../../utils/contracts';
import { Contract } from '@ethersproject/contracts';
import { Interface } from '@ethersproject/abi/lib/interface';
import {  ethers, utils } from 'ethers';
import { useEffect, useState } from 'react';
import Logger from '../../utils/logger';
import { displayErrorMessage } from '../../utils/utility';
import Config from '../../utils/config';
import Slider from 'react-input-slider';

const startDate = new Date("11-01-2021 16:10").getTime();

interface MintBtnProps {
    mintCost: string;
    mints: number;
    mintFinished: () => void;
    disabled: boolean;
}

const MintButton= ({ mintCost, mints, mintFinished, disabled }:MintBtnProps) => {
    const mintAmount = mintCost ? utils.parseUnits(mintCost).mul(mints) : 0;
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const { account } = useEthers();
    const mintTycoonFunction = useContractFunction(BullTycoonsFactoryContract, 'presaleMint', { transactionName:'presaleMint' });
    const approveSpending = useContractFunction(WethContract, 'increaseAllowance', { transactionName:'increaseAllowance' });
    

    const mintTycoon = async () => {
        setIsLoading(true);
        mintTycoonFunction.send(mints);        
    }

    useEffect(() => {
        if (mintTycoonFunction.state.status !== 'Mining') {
            setIsLoading(false);
            mintFinished();
        }
        Logger.log(mintTycoonFunction.state.status, "<== Status");
        // Logger.log(JSON.stringify(mintTycoonFunction.state.errorMessage), "<== Error Message");
        if (mintTycoonFunction.state.errorMessage) displayErrorMessage({message: mintTycoonFunction.state.errorMessage});
    }, [mintTycoonFunction.state]);

    const setApproval = async () => {
        setIsLoading(true);
        const amountToApprove = (Number(utils.formatUnits(mintAmount)) * mints) - Number(ethers.utils.formatUnits(allowance ? allowance[0] : 0));
        approveSpending.send(BullTycoonsFactoryContractAddress, utils.parseUnits(amountToApprove.toFixed(2)));
    }

    useEffect(() => {
        if (approveSpending.state.status !== 'Mining') {
            setIsLoading(false);
        }
        Logger.log(approveSpending.state.status, "<== Status");
        // Logger.log(JSON.stringify(approveSpending.state.errorMessage), "<== Error Message");
        if(approveSpending.state.errorMessage) displayErrorMessage({message: approveSpending.state.errorMessage});
    }, [approveSpending.state]);

    const allowance = useContractCall({abi: new Interface(WethABI), address:WethAddress, method:'allowance', args:[account, BullTycoonsFactoryContractAddress]});
    // Logger.log(allowance && ethers.utils.formatUnits(allowance[0]), "<== Allowance");
    

    return (account) ? ((allowance && Number(ethers.utils.formatUnits(allowance[0])) >= (Number(utils.formatUnits(mintAmount)) * mints)) ? (
        <Button disabled={disabled || mintAmount == 0} color='blue' size='big' onClick={mintTycoon} loading={isLoading} >Mint</Button>
    ) : (
        <Button disabled={disabled} color='blue' size='big' onClick={setApproval} loading={isLoading} >Approve</Button>
    )) : (
        <UserAuth connectText="Connect Wallet" />
    )
}

const MintSection = () => {
    const mintCost = useContractCall({abi: new Interface(BullTycoonsFactoryContractABI), address:BullTycoonsFactoryContractAddress, method:'PRESALE_AMOUNT', args:[]});
    const mintAmount = mintCost ? mintCost[0] : 0;
    // const minted = 0;
    const { account } = useEthers();
    const [ totalMints, setTotalMints ] = useState(0);
    const [ mintable, setMintable ] = useState(0);

    const minted = useContractCall({abi: new Interface(BullTycoonsContractABI), address:BullTycoonsContractAddress, method:'totalSupply', args:[]});
    Logger.log(minted ? Number(minted[0]) : minted, "<== Minted");

    const isMintStarted = useContractCall({abi: new Interface(BullTycoonsFactoryContractABI), address:BullTycoonsFactoryContractAddress, method:'MINT_START', args:[]});
    Logger.log(isMintStarted ? isMintStarted[0] : isMintStarted, "<== Mint Started?");

    const numberMinted = useContractCall({abi: new Interface(BullTycoonsFactoryContractABI), address:BullTycoonsFactoryContractAddress, method:'getNumberMinted', args:[account]});
    const mintPerPerson = useContractCall({abi: new Interface(BullTycoonsFactoryContractABI), address:BullTycoonsFactoryContractAddress, method:'MINT_PER_PERSON', args:[]});
    const maxSupply = useContractCall({abi: new Interface(BullTycoonsFactoryContractABI), address:BullTycoonsFactoryContractAddress, method:'getMaxSupply', args:[]});
    Logger.log(numberMinted && Number(numberMinted[0]), "<== Number Minted");

    useEffect(() => {
        if (mintPerPerson && numberMinted) {
            setMintable(Number(mintPerPerson[0]) - Number(numberMinted[0]));
        }
    }, [mintPerPerson, numberMinted])

    return (
        <section id="mint" style={{padding:'5%', background:'#000', color:'#ffffff'}}>
            <div style={{flexDirection:useMediaQuery({maxWidth:600}) ? 'column' : 'row', display:'flex', alignItems:'center'}}>
                <div style={{flex:2, textAlign:'left', padding:'1em'}}>
                    <h2 style={{color:"#fff"}}>Mint Your BullTycoons</h2>
                    <p style={{display:'flex',flexDirection:'row'}}><Icon name="bullseye" style={{color:"#fff"}} /> <span style={{flex:1}}>Connect your Metamask wallet</span></p>
                    <p style={{display:'flex',flexDirection:'row'}}><Icon name="bullseye" style={{color:"#fff"}} /> <span style={{flex:1}}>Configure and change your network to Polygon Network ( see how to set it up <a href="https://docs.polygon.technology/docs/develop/network-details/network/" target="_blank" rel="noreferrer noopener">here</a> )</span></p>
                    <p style={{display:'flex',flexDirection:'row'}}><Icon name="bullseye" style={{color:"#fff"}} /> <span style={{flex:1}}>Note that you can mint up to {mintPerPerson ? Number(mintPerPerson[0]) : 1} BullTycoon per account ({utils.formatEther(mintAmount)} ETH per one)</span></p>
                    <p style={{display:'flex',flexDirection:'row'}}><Icon name="bullseye" style={{color:"#fff"}} /> <span style={{flex:1}}>Click on Mint</span></p>
                    <p style={{display:'flex',flexDirection:'row'}}><Icon name="bullseye" style={{color:"#fff"}} /> <span style={{flex:1}}>Approve the transaction</span></p>
                    <p style={{display:'flex',flexDirection:'row'}}><Icon name="bullseye" style={{color:"#fff"}} /> <span style={{flex:1}}>Goto <a href={Config.OPENSEA_URL} target="_blank" rel="noreferrer noopener">Opensea</a> to view your newly minted BullTycoon</span></p>
                </div>
                {useMediaQuery({maxWidth:600}) && (<div style={{width:'100%', height:'1px', background:'#ffffff88', marginTop:'1.5em', marginBottom:'1.5em'}} />)}
                {(isMintStarted && isMintStarted[0]) ? (
                    <div style={{flex:1}}>
                        <h3>Already Minted ({minted ? Number(minted[0]) : '-'}/{maxSupply ? Number(maxSupply[0]) : '-'})</h3>
                        <hr />
                        {(mintable > 0) ? (
                            <>
                                <div style={{justifyContent:'center'}}>
                                    <h3>How many BullTycoons do you want to mint?</h3>
                                    <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                        <Slider axis="x" x={totalMints} onChange={val => setTotalMints(val.x)} xmin={0} xmax={mintable} xstep={1} styles={{
                                            track: {
                                                backgroundColor: '#ffffff'
                                            },
                                            active: {
                                                backgroundColor: '#2185d0;'
                                            },
                                            thumb: {
                                                width: 15,
                                                height: 15,
                                                backgroundColor: '#3296e1'
                                            }
                                        }} />
                                        <span style={{padding:'1em', fontSize:'2em'}}>{totalMints}</span>
                                    </div>
                                </div>
                                <h3>Mint Cost:</h3>
                                {(mintAmount === 0) ? (
                                    <div className="ui placeholder">
                                        <div className="line"></div>
                                    </div>
                                ) : (
                                    <>
                                        <p style={{fontSize:'medium'}}>{(Number(utils.formatEther(mintAmount)) * totalMints).toFixed(2)}ETH + gas fee</p>
                                        <MintButton disabled={totalMints == 0} mintCost={utils.formatEther(mintAmount)} mints={totalMints} mintFinished={() => {
                                            setTotalMints(0);
                                        }} />
                                    </>
                                )}
                            </>
                        ): (
                            <Button style={{marginTop:'1em'}} color='red' size='big' disabled={true}>Already Minted</Button>
                        )}
                    </div>
                ) : (
                    <div style={{flex:1}}>
                        <h2>Mint Starts:</h2>
                        <h3>{new Date(startDate).toDateString()}</h3>
                        <p>Join our social media channels to get reminded</p>
                        <a href="https://instagram.com/bulltycoons" target="_blank" rel="noreferrer noopener"><Icon name="instagram" style={{color:'#ffffff'}} size="big" /></a>
                        <a href="https://twitter.com/bulltycoons" target="_blank" rel="noreferrer noopener"><Icon name="twitter" style={{color:'#ffffff'}} size="big" /></a>
                        <a href="https://t.me/bulltycoons" target="_blank" rel="noreferrer noopener"><Icon name="telegram" style={{color:'#ffffff'}} size="big" /></a>
                        <a href="https://discord.gg/sTXnEBXzGe" target="_blank" rel="noreferrer noopener"><Icon name="discord" style={{color:'#ffffff'}} size="big" /></a>
                    </div>
                )}
            </div>
        </section>
    )
}

export default MintSection;