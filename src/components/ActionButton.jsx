import React from 'react';
import { useWallet } from 'react-binance-wallet';
import UserAuth from './widgets/userauth';

export const ActionButton = ({ onClick, children, ...otherProps }) => {

    const { account, status } = useWallet();

    return (account && status !== 'disconnected') ? (
        <button onClick={onClick} {...otherProps}>
            {children}
        </button>
    ): (
        <UserAuth connectText="Unlock Wallet" />
    )
}