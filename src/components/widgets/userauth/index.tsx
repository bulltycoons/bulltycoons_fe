import { useState } from 'react';
// import { useWallet } from 'use-wallet';
import BullModal from '../modal';
import './userauth.css';
import { Button } from 'semantic-ui-react';
import { ethers } from 'ethers';
import { useEthers, useEtherBalance } from '@usedapp/core';

const UserAuth = ({ connectText="Connect" }: any) => {

    // const { /* account, connect, */ reset, status, error, balance } = useWallet();
    const [ openModal, setOpenModal ] = useState(false);
    // const [ openConnectModal, setOpenConnectModal ] = useState(false);

    const { activateBrowserWallet, account, deactivate } = useEthers();
    const ethBalance = useEtherBalance(account);

    // const setConnectWith = (type='injected', config) => {
    //     config ? connect(type, config) :  connect(type);
    //     setOpenConnectModal(false);
    //     error && Logger.log(error);
    // }
    

    return (
        <>
            {(!account) ? (
                <>
                    <div>
                        <Button primary onClick={() => activateBrowserWallet()}>{connectText}</Button>
                    </div>
                    {/* <BullModal 
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
                    </BullModal> */}
                </>
                
            ) : (
                <>
                    <BullModal 
                        isOpen={openModal}
                        setOpen={() => {
                            setOpenModal(true);
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
                            {ethBalance && (<p><b>Balance:</b> {ethers.utils.formatEther(ethBalance)} ETH</p>)}
                            <Button color='red' onClick={() => {
                                setOpenModal(false)
                                // reset();
                                deactivate();
                            }}>Disconnect</Button>
                        </div>
                    </BullModal>
                </>
            )}
        </>
    )
}

export default UserAuth;