import { Button } from 'semantic-ui-react';
import { useContractFunction, useContractCall } from '@usedapp/core';
import { BullTycoonsContract, BullTycoonsFactoryContract, BullTycoonsFactoryContractABI, BullTycoonsFactoryContractAddress } from '../utils/contracts';
import { Interface } from '@ethersproject/abi/lib/interface';
import { utils } from 'ethers';
import { useEffect, useState } from 'react';
import Logger from '../utils/logger';
import { displayErrorMessage } from '../utils/utility';
import Header from '../components/Header/Header';
import moment from 'moment';

const Admin = () => {

    const [ isLoading, setIsLoading ] = useState(false);
    const [ isTransferLoading, setIsTransferLoading ] = useState(false);
    const [ maxIsLoading, setMaxIsLoading ] = useState(false);
    const [ transferAddress, setTransferAddress ] = useState<string>();
    const [ fromAddress, setFromAddress ] = useState("address");
    const [ maxMintNumber, setMaxMintNumber ] = useState<number>();
    const [ maxSupply, setMaxSupplyNo ] = useState<number>();
    const [ isMaxSupplyLoading, setIsMaxSupplyLoading ] = useState(false);
    const [ mintDate, setMintStartDate ] = useState<string>();

    const setStartMintDate = useContractFunction(BullTycoonsFactoryContract, 'setMintStartDate', { transactionName:'setMintStartDate' });
    const transferNFTFactory = useContractFunction(BullTycoonsContract, 'transferOwnership', { transactionName:'transferOwnership' });
    const transferNFTFactoryFromFactory = useContractFunction(BullTycoonsFactoryContract, 'transferNFTAdminRole', { transactionName:'transferNFTAdminRole' });
    const setMaxMintPerPerson = useContractFunction(BullTycoonsFactoryContract, 'setMaxMintPerPerson', { transactionName:'setMaxMintPerPerson' });
    const setMaxSupply = useContractFunction(BullTycoonsFactoryContract, 'setMaxSupply', { transactionName:'setMaxSupply' });
    
    // const isMintStarted = useContractCall({abi: new Interface(BullTycoonsFactoryContractABI), address:BullTycoonsFactoryContractAddress, method:'MINT_START', args:[]});const mintStartDate = useContractCall({abi: new Interface(BullTycoonsFactoryContractABI), address:BullTycoonsFactoryContractAddress, method:'MINT_START_DATE', args:[]});
    // const mintStartDate = useContractCall({abi: new Interface(BullTycoonsFactoryContractABI), address:BullTycoonsFactoryContractAddress, method:'MINT_START_DATE', args:[]});

    // Logger.log(isMintStarted ? isMintStarted[0] : isMintStarted, "<== Mint Started?");
    
    const setMintingDate = () => {
        // Logger.log(mintDate, mintDate ? !isNaN(new Date(mintDate).getTime()) : 'No Date', "<== MintDate");
        if (!mintDate || isNaN(new Date(mintDate).getTime())) return displayErrorMessage({ message: "Invalid date inserted!" });
        setIsLoading(true);
        setStartMintDate.send((new Date(mintDate).getTime())/1000);
    }

    const transferOwnership = () => {
        if (!transferAddress || !utils.isAddress(transferAddress)) return displayErrorMessage({message: "Invalid address"});
        setIsTransferLoading(true);
        if (fromAddress == "address") {
            Logger.log("Running from address");
            transferNFTFactory.send(transferAddress);
        } else {
            Logger.log("Running from factory");
            transferNFTFactoryFromFactory.send(transferAddress);
        }
    }

    const setMaxMintPerAccount = () => {
        if (!maxMintNumber || Number(maxMintNumber) == 0) return;
        setMaxIsLoading(true);
        setMaxMintPerPerson.send(maxMintNumber);
    }

    const setMaximumSupply = () => {
        if (!maxSupply || Number(maxSupply) == 0) return;
        setMaxSupply.send(maxSupply);
    }

    useEffect(() => {
        if (setStartMintDate.state.status !== 'Mining') {
            setIsLoading(false);
        }
        Logger.log(setStartMintDate.state.status, "<== Status");
        if (setStartMintDate.state.errorMessage) displayErrorMessage({message: setStartMintDate.state.errorMessage});
    }, [setStartMintDate.state]);

    useEffect(() => {
        if (transferNFTFactory.state.status !== 'Mining' && transferNFTFactoryFromFactory.state.status !== 'Mining') {
            setIsTransferLoading(false);
        }
        Logger.log(transferNFTFactory.state.status, transferNFTFactoryFromFactory.state.status, "<== Transfer Factory Status");
        if (transferNFTFactory.state.errorMessage || transferNFTFactoryFromFactory.state.errorMessage) displayErrorMessage({message: (transferNFTFactory.state.errorMessage || transferNFTFactoryFromFactory.state.errorMessage)});
    }, [transferNFTFactory.state, transferNFTFactoryFromFactory.state]);

    useEffect(() => {
        if (setMaxMintPerPerson.state.status !== 'Mining') {
            setMaxIsLoading(false);
            setMaxMintNumber(undefined);
        }
        Logger.log(setMaxMintPerPerson.state.status, "<== Status");
        if (setMaxMintPerPerson.state.errorMessage) displayErrorMessage({message: setMaxMintPerPerson.state.errorMessage});
    }, [setMaxMintPerPerson.state]);

    useEffect(() => {
        if (setMaxSupply.state.status !== 'Mining') {
            setIsMaxSupplyLoading(false);
            setMaxSupplyNo(undefined);
        }
    }, [setMaxSupply.state]);

    return (
        <div>
            <Header id="header" />
            <div style={{padding:'2em'}}>
                {/* {(isMintStarted && !isMintStarted[0]) ? (
                    <Button size="big" color="green" loading={isLoading} onClick={() => startMintingProcess(true)}>Start Minting Process</Button>
                ) : (
                    <Button size="big" color="red" loading={isLoading} onClick={() => startMintingProcess(false)}>Stop Minting Process</Button>
                )} */}
                <section style={{padding:'2em'}}>
                    <h2>Set Start Mint Date</h2>
                    <div style={{display:'flex', flexDirection:'row'}}>
                        <input value={mintDate} type="text" onChange={e => {
                            // Logger.log(e.target.value);
                            setMintStartDate(e.target.value);
                        }} style={{flex:2}} />
                        <Button size="big" style={{flex:1, marginLeft: '1em'}} color="red" loading={isLoading} onClick={() => setMintingDate()}>Set Mint Date</Button>
                    </div>
                </section>
                <hr />
                <section style={{padding:'2em'}}>
                    <h2>Transfer Ownership of Contract</h2>
                    <div style={{display:'flex', flexDirection:'row'}}>
                        <input type="text" onChange={e => {
                            // Logger.log(e.target.value);
                            setTransferAddress(e.target.value);
                        }} defaultValue={transferAddress} style={{flex:2}} />
                        <div>
                            <select onChange={e => {
                                setFromAddress(e.target.value);
                            }}>
                                <option value="address">From Address</option>
                                <option value="factory">From Factory</option>
                            </select>
                        </div>
                        <Button size="big" style={{flex:1, marginLeft: '1em'}} color="red" loading={isTransferLoading} onClick={() => transferOwnership()}>Transfer Ownership</Button>
                    </div>
                </section>
                <hr />
                <section style={{padding:'2em'}}>
                    <h2>Set Maximum Mint per Person</h2>
                    <div style={{display:'flex', flexDirection:'row'}}>
                        <input value={maxMintNumber} type="text" onChange={e => {
                            // Logger.log(e.target.value);
                            setMaxMintNumber(Number(e.target.value));
                        }} style={{flex:2}} />
                        <Button size="big" style={{flex:1, marginLeft: '1em'}} color="red" loading={maxIsLoading} onClick={() => setMaxMintPerAccount()}>Set Max</Button>
                    </div>
                
                </section>
                <hr />
                <section style={{padding:'2em'}}>
                    <h2>Set Total Mint Supply</h2>
                    <div style={{display:'flex', flexDirection:'row'}}>
                        <input value={maxSupply} type="text" onChange={e => {
                            // Logger.log(e.target.value);
                            setMaxSupplyNo(Number(e.target.value));
                        }} style={{flex:2}} />
                        <Button size="big" style={{flex:1, marginLeft: '1em'}} color="red" loading={isMaxSupplyLoading} onClick={() => setMaximumSupply()}>Set Max Supply</Button>
                    </div>
                
                </section>
            </div>
        </div>
    )
}

export default Admin;