import Config from '../config';

const BullTycoonFactoryContractInterface = require('./BullTycoonsFactory.json');
const BullTycoonContractInterface = require('./BullTycoons.json');

const chaindId = Config.CHAIN_ID;

export const BullTycoonsContractABI = BullTycoonContractInterface.abi;
export const BullTycoonsContractAddress = BullTycoonContractInterface.networks[chaindId].address;

export const BullTycoonsFactoryContractABI = BullTycoonFactoryContractInterface.abi;
export const BullTycoonsFactoryContractAddress = BullTycoonFactoryContractInterface.networks[chaindId].address;

