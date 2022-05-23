import Header from './components/Header/index'
import { UseWalletProvider } from 'use-wallet'
import './App.css';

function App() {

  return (
    <>
      <UseWalletProvider
        chainId={1}
        connectors={{
          walletconnect: { rpcUrl: 'https://mainnet.infura.io/v3/' },
        }}
      >
        <Header />
      </UseWalletProvider>
    </>
  );
}

export default App;
