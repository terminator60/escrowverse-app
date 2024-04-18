import { useEffect, useState, useContext } from 'react';
import 'react-dropdown/style.css';
import Contract from './Contract';
import ExistingContracts from './ExistingContracts';
import { WalletContext } from '../WallerContext';
import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useClient, useWalletClient, WagmiContext } from 'wagmi'
import { clientToProvider } from '../utils/wagmiEthersProvider';
import { getEscrowContracts} from '../utils/getExistingContracts';

function App() {
  const [escrows, setEscrows] = useState([]);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();
  const [provider, setProvider] = useState();
  const options = ['Arbitary Escrow', 'ETH -> ERC20 Escrow', 'ERC20 -> ERC20 Escrow'];
  const { address, isConnected, chainId, status } = useAccount();
  const { config } = useContext(WagmiContext);
  const { data: walletClient } = useWalletClient(config);
  const { open } = useWeb3Modal();

  useEffect(() => {
    !isConnected && open()
  }, [])

  useEffect(() => {
    isConnected && walletClient && connectWallet()
    console.log(walletClient);
  }, [isConnected, walletClient])

  const connectWallet = async () => {
    if (!walletClient) return;
    const { signer, provider } = await clientToProvider(walletClient)
    setProvider(provider);
    setSigner(signer);
    setAccount();
    console.log(signer);
  };

  getEscrowContracts(signer, setEscrows);

  return (
    <>
      <div className='main-header'>
        <div className='site-name'>
          <h1>Escrow Contract Creator</h1>
        </div>
        <div className='web3-button'>
          <w3m-button />
        </div>
      </div>
      <div className='body'>
        <WalletContext.Provider value={{ signer, escrows, setEscrows, options, account, setSigner }}>
          <Contract />
          <ExistingContracts />
        </WalletContext.Provider>
      </div>
    </>
  );
}

export default App;
