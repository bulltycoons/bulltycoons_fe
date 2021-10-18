import React, { useState } from 'react';
import { useWallet } from 'use-wallet';
import BullModal from '../modal';
import './userauth.css';
import { Button } from 'semantic-ui-react';
import { ethers } from 'ethers';
import Config from '../../../utils/config';
import { displayErrorMessage } from '../../../utils/utility';
import Logger from '../../../utils/logger';

const UserAuth = ({ connectText="Connect" }) => {

    const { account, connect, reset, status, error, balance } = useWallet();
    const [ openModal, setOpenModal ] = useState(false);
    const [ openConnectModal, setOpenConnectModal ] = useState(false);

    const setConnectWith = (type='injected', config) => {
        config ? connect(type, config) :  connect(type);
        setOpenConnectModal(false);
        error && Logger.log(error);
    }
    

    return (
        <>
            {(status === 'disconnected' || error) ? (
                <>
                <BullModal 
                    isOpen={openConnectModal}
                    setOpen={(open) => {
                        setOpenConnectModal(open);
                    }}
                    title={"Connect using"}
                    trigger={(
                        <div>
                            <Button primary>{connectText}</Button>
                        </div>
                    )}
                    closeBtn
                    size="mini"
                >
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <Button style={{flex:1, marginBottom:'.25rem'}} primary onClick={() => setConnectWith()}>Metamask</Button>
                        <Button style={{flex:1, marginBottom:'.25rem'}} primary onClick={() => setConnectWith()}>Trustwallet</Button>
                        <Button style={{flex:1, marginBottom:'.25rem'}} primary onClick={() => setConnectWith('bsc')}>Binance Chain Wallet</Button>
                        <Button style={{flex:1, marginBottom:'.25rem'}} primary onClick={() => setConnectWith('frame')}>Frame</Button>
                        <Button style={{flex:1, marginBottom:'.25rem'}} primary onClick={() => setConnectWith('portis')}>Portis</Button>
                        <Button style={{flex:1, marginBottom:'.25rem'}} primary onClick={() => setConnectWith('authereum')}>Authereum</Button>
                        <Button style={{flex:1, marginBottom:'.25rem'}} primary onClick={() => setConnectWith('walletconnect', { rpcUrl: Config.RPC_PROVIDER })}>Walletconnect</Button>
                    </div>
                </BullModal>
            </>
                
            ) : (
                <>
                    {account && (
                        <>
                            <BullModal 
                                isOpen={openModal}
                                setOpen={(open) => {
                                    setOpenModal(open);
                                }}
                                title={"Your wallet"}
                                trigger={(
                                    <div>
                                        <Button primary className="user-btn">
                                            {account}
                                        </Button>
                                    </div>
                                )}
                                closeBtn
                                size="tiny"
                            >
                                <div>
                                    <p>{account}</p>
                                    <p><b>Balance:</b> {ethers.utils.formatEther(balance)} ETH</p>
                                    <Button color='red' onClick={() => {
                                        setOpenModal(false)
                                        reset();
                                    }}>Disconnect</Button>
                                </div>
                            </BullModal>
                        </>
                    )}
                </>
            )}
            
        </>
    )
}

export default UserAuth;