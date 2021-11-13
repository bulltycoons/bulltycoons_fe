import { Contract } from '@ethersproject/contracts';
import { utils } from 'ethers';
import Config from '../config';

const BullTycoonFactoryContractInterface = require('./BullTycoonsFactoryMock.json');
const BullTycoonContractInterface = require('./BullTycoons.json');
const WethInterface = require('./WETHMock.json');

const chaindId = Config.CHAIN_ID;

export const BullTycoonsContractABI = BullTycoonContractInterface.abi;
export const BullTycoonsContractAddress = BullTycoonContractInterface.networks[chaindId].address;

export const BullTycoonsFactoryContractABI = BullTycoonFactoryContractInterface.abi;
export const BullTycoonsFactoryContractAddress = BullTycoonFactoryContractInterface.networks[chaindId].address;

export const WethABI = WethInterface.abi;
export const WethAddress = WethInterface.networks[chaindId].address;

export const BullTycoonsContract = new Contract(BullTycoonsContractAddress, new utils.Interface(BullTycoonsContractABI));
export const BullTycoonsFactoryContract = new Contract(BullTycoonsFactoryContractAddress, new utils.Interface(BullTycoonsFactoryContractABI));
export const WethContract = new Contract(WethAddress, new utils.Interface(WethABI));