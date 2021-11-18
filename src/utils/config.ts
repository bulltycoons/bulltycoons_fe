import { ChainId, Config as DapConfig } from "@usedapp/core";
import assert from "assert";

const {
    REACT_APP_CHAIN_ID,
    REACT_APP_PROVIDER_URL,
    REACT_APP_PROVIDER_ID,
    REACT_APP_ENV_BASE,
    REACT_APP_OPENSEA_URL,
    REACT_APP_SMART_CONTRACT_EXPLORER_BASE_URL,
    REACT_APP_START_DATE
} = process.env;

assert(REACT_APP_START_DATE, "REACT_APP_START_DATE is required");

const devConfig:DapConfig = {
    readOnlyChainId: ChainId.Localhost,
    /* readOnlyUrls:{
        [ChainId.Localhost]: 'https://localhost:8545/'
    } */
}

const testnetConfig: DapConfig = {
    readOnlyChainId: ChainId.Mumbai,
    readOnlyUrls: {
        [ChainId.Mumbai]: `https://rpc-mumbai.maticvigil.com/v1/${REACT_APP_PROVIDER_ID}` //who knows?
    }
}

const mainnetConfig: DapConfig = {
    readOnlyChainId: ChainId.Polygon,
    readOnlyUrls: {
        [ChainId.Polygon]: '' //who knows?
    }
}

const rpcConfig = (REACT_APP_ENV_BASE === 'development') ? devConfig : (REACT_APP_ENV_BASE === 'testnet') ? testnetConfig : mainnetConfig

const Config = {
    CHAIN_ID: REACT_APP_CHAIN_ID || 1337,
    RPC_PROVIDER: REACT_APP_PROVIDER_URL || 'http://localhost:8545',
    ZERO_ADDRESS: '0x0000000000000000000000000000000000000000',
    OPENSEA_URL: REACT_APP_OPENSEA_URL,
    BLOCKCHAIN_EXPLORER_BASE_URL: REACT_APP_SMART_CONTRACT_EXPLORER_BASE_URL,
    devConfig,
    testnetConfig,
    mainnetConfig,
    rpcConfig,
    START_DATE: REACT_APP_START_DATE || ""
}

export default Config;