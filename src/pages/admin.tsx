import { Button } from 'semantic-ui-react';
import { useContractFunction, useContractCall } from '@usedapp/core';
import { BullTycoonsFactoryContractABI, BullTycoonsFactoryContractAddress } from '../utils/contracts';
import { Contract } from '@ethersproject/contracts';
import { Interface } from '@ethersproject/abi/lib/interface';
import { utils } from 'ethers';
import { useEffect, useState } from 'react';
import Logger from '../utils/logger';
import { displayErrorMessage } from '../utils/utility';
import Header from '../components/Header/Header';

const Admin = () => {

    const [ isLoading, setIsLoading ] = useState(false);

    const bullTycoonsFactoryContract = new Contract(BullTycoonsFactoryContractAddress, new utils.Interface(BullTycoonsFactoryContractABI))
    const startMinting = useContractFunction(bullTycoonsFactoryContract, 'setStartMinting', { transactionName:'setStartMinting' });
    const isMintStarted = useContractCall({abi: new Interface(BullTycoonsFactoryContractABI), address:BullTycoonsFactoryContractAddress, method:'MINT_START', args:[]});
    Logger.log(isMintStarted ? isMintStarted[0] : isMintStarted, "<== Mint Started?");
    
    const startMintingProcess = (start:boolean) => {
        setIsLoading(true);
        startMinting.send(start);
    }

    useEffect(() => {
        if (startMinting.state.status !== 'Mining') {
            setIsLoading(false);
        }
        Logger.log(startMinting.state.status, "<== Status");
        // Logger.log(JSON.stringify(startMinting.state.errorMessage), "<== Error Message");
        if (startMinting.state.errorMessage) displayErrorMessage({message: startMinting.state.errorMessage});
    }, [startMinting.state]);

    return (
        <div>
            <Header id="header" />
            <div style={{padding:'2em'}}>
                {(isMintStarted && !isMintStarted[0]) ? (
                    <Button size="big" color="green" loading={isLoading} onClick={() => startMintingProcess(true)}>Start Minting Process</Button>
                ) : (
                    <Button size="big" color="red" loading={isLoading} onClick={() => startMintingProcess(false)}>Stop Minting Process</Button>
                )}
            </div>
        </div>
    )
}

export default Admin;