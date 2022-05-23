import './Reward.css'
import useRefresh from '../../hooks/useRefresh';
import metamask from '../../metamask.js';
import {Button} from "@material-ui/core";
import React, {useEffect} from 'react';;

const handleApprove = async() => {
  await metamask.approve();
}

const handleBridge = async() => {
  await metamask.bridgeTokens();
}

export default function RewardToken(wallet) {

  const [v1Holdings, setV1Holdings] = React.useState('0');
  const [v2Holdings, setV2Holdings] = React.useState('0');
  const [allowance, setAllowance] = React.useState(0);
  const {fastRefresh} = useRefresh();

  useEffect(()=>{
    const updateRewards = async () => {
      try {
        const v1HoldingData = await metamask.getUserTokenBalanceV1()
        setV1Holdings(parseFloat(v1HoldingData.tokenBalance).toFixed(1).toString())
        const v2HoldingData = await metamask.getUserTokenBalanceV2()
        setV2Holdings(parseFloat(v2HoldingData.tokenBalance).toFixed(1).toString())
        const walletAllowance = await metamask.getAllowance()
        setAllowance(walletAllowance);
      } catch (err) {
          console.log(err); 
      }
    }
    updateRewards()
  },[wallet, fastRefresh])

  return (
    <div>
      <div>
        Step 1: Approve tokens for bridge <br/>
        Step 2: Bridge V1 Tokens to V2<br/>
      </div>
        <div className='btn-connect'>
          <Button onClick={handleApprove}>
                Approve Tokens for Bridge
          </Button>
        </div>
      <br/>
      {allowance >= v1Holdings && v1Holdings > 0 ?
         <div className='btn-connect'>
          <Button onClick={handleBridge}>
                Bridge All V1 Tokens
          </Button>
        </div> :
        <br / >
      }
      
      <br />
      <div className='content'>
        <div>
            <h5><center>V1 Tokens</center></h5>
            <div style={{textAlign: 'center'}} className='gradient-div'>{`${v1Holdings}`}</div>
        </div>
        <div>
            <h5><center>V2 Tokens</center></h5>
            <div style={{textAlign: 'center'}} className='gradient-div'>{`${v2Holdings}`}</div>
        </div>
      </div>
      
    </div>
  )
}

  