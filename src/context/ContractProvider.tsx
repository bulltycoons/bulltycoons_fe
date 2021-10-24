import { ethers } from 'ethers';
import {createContext, useEffect, useState, SetStateAction, Dispatch} from 'react';
import useWallet from 'use-wallet';
import Config from '../utils/config';
import Logger from '../utils/logger';

const BullTycoonFactoryContractInterface = require('../utils/contracts/BullTycoonsFactoryMock.json');
const BullTycoonContractInterface = require('../utils/contracts/BullTycoons.json');

export const BULLTYCOONFACTORY_ADDRESS = BullTycoonFactoryContractInterface.networks[Config.CHAIN_ID].address;
export const BULLTYCOON_ADDRESS = BullTycoonContractInterface.networks[Config.CHAIN_ID].address;

export type StateType = {
    BullTycoonFactoryContract: any;
    BullTycoonContract: any;
    provider: any;
    signer: any;
}

export interface ContractContextInterface {
    state:  StateType;
    setState: Dispatch<SetStateAction<any>>
}

const initReducer:ContractContextInterface = {
    state: {
        BullTycoonFactoryContract: null,
        BullTycoonContract: null,
        provider: null,
        signer:null
    },
    setState: (data) => {}
}

// export const ContractContext = createContext<ContractContextInterface>(initReducer);
export const ContractContext = createContext(initReducer);

export const ContractProvider:any = ({ children }:any) => {

    const [ state, setState ] = useState(initReducer.state);
    const { account } = useWallet();

    const setContracts = async () => {
        const provider = await new ethers.providers.JsonRpcProvider(Config.RPC_PROVIDER, { chainId: Number(Config.CHAIN_ID), name:'Local Ethereum' });
        const bullTycoonContract = new ethers.Contract(
            BULLTYCOON_ADDRESS,
            BullTycoonContractInterface.abi,
            provider
        );
        const bullTycoonFactoryContract = new ethers.Contract(
            BULLTYCOONFACTORY_ADDRESS,
            BullTycoonFactoryContractInterface.abi,
            provider
        )

        setState({
            ...state,
            ...{
                BullTycoonContract: bullTycoonContract,
                BullTycoonFactoryContract: bullTycoonFactoryContract,
                provider
            }
        });
    }

    const setSigner = async () => {
        try {
            const walletProvider = await new ethers.providers.Web3Provider(window.ethereum);
            const signer = await walletProvider.getSigner();

            setState({
                ...state,
                ...{
                    provider: walletProvider,
                    signer
                }
            });

            Logger.log(signer, "<== Signer");
        } catch (error) {
            Logger.log(error, "<== An error occurred");
            // displayErrorMessage({message: "Ethereum Provider not found"});
        }
    }

    useEffect(() => {
        setContracts();
        return () => {
            // do some clean ups
        };
    }, []);

    useEffect(() => {
        setSigner();
    }, [account]);

    return (
        <ContractContext.Provider value={{state, setState}}>
            {children}
        </ContractContext.Provider>
    );
}