import { ethers } from 'ethers';
import React, { useContext, useMemo } from 'react';
import { ContractContext } from '../context/ContractProvider';
import { BullTycoonsContractABI, BullTycoonsContractAddress, BullTycoonsFactoryContractABI, BullTycoonsFactoryContractAddress } from '../utils/contracts';

export const useContract = () => {

    const { state, setState } = useContext(ContractContext);
    const { BullTycoonContract, BullTycoonFactoryContract, provider, signer, ...restOfState } = state;

    const getContract = (abi:any, address:any) => {
        const signerOrProvider = signer ? signer : provider
        return new ethers.Contract(address, abi, signerOrProvider);
    }

    const getBullTycoonsContract = () => {
        return getContract(
            BullTycoonsContractABI,
            BullTycoonsContractAddress
        );
    }

    const getBullTycoonsFactoryContract = () => {
        return getContract(
            BullTycoonsFactoryContractABI,
            BullTycoonsFactoryContractAddress
        );
    }


    return useMemo(() => ({
        BullTycoonFactoryContract,
        BullTycoonContract,
        getBullTycoonsContract,
        getBullTycoonsFactoryContract,
        ...restOfState
    }), [state]);

}