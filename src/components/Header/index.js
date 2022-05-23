import './Header.css'
import { Button } from "@material-ui/core";
import { useWallet } from 'use-wallet'
import metamask from '../../metamask.js';
import RewardToken from "../RewardToken";
import React, { useEffect } from 'react';
export default function Header(props) {

    const { account, ethereum, connect, reset } = useWallet();
    const [provider, setProvider] = React.useState("");

    const activate = (connector) => connect(connector);

    const handleWalletConnect = async () => {
        await reset();
        activate('walletconnect');
        setProvider('walletconnect');
    }

    const handleInjectedConnect = async () => {
        await reset();
        activate('injected');
        setProvider('injected');
    }

    useEffect(() => {
        metamask.connectWallet(ethereum);
     },   
    [ethereum, account])

    return(
        <div>
        <div className="Header">
            <div className="logo-text">
                <div className="logo">
                    <img alt='' src='https://secureservercdn.net/198.71.233.71/171.a15.myftpupload.com/wp-content/uploads/2022/03/imageedit_100_5249473439-1.png' width="64" height="64" />
                    <span>Dogger V1 to V2 Bridge</span>
                </div>
                <div className="connect-btn">
                    <div className='btn-connect'>
                        {provider === "unselected" || provider === 'walletconnect' || account == null ?
                            <Button className='btn-connect' onClick={handleWalletConnect}>
                                {account > 0 ? account.substring(0,5) + "..." + account.substring(38,44) : "Wallet Connect"}
                            </Button>
                        : ""}
                        {provider === "unselected" || provider === 'injected' || account == null ?
                            <Button className='btn-connect' onClick={handleInjectedConnect}>
                                {account > 0 ? account.substring(0,5) + "..." + account.substring(38,44) : "Metamask Connect"}
                            </Button>
                        : ""}
                    </div>
                    {account > 0 ?
                    <div className='btn-connect'>
                        <Button className='btn-connect' onClick={async () => {
                            reset()
                            setProvider("unselected")
                        }}
                        > Disconnect</Button>
                    </div>
                        : <Button className='btn-connect'></Button>
                    }
                </div>
            </div>
        </div>
        {account > 0 ?
            <div className='container'>
                <RewardToken wallet={account}/>
            </div>: ""
        }   
        </div>
    );
}