import { ethers, providers } from "ethers";
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { useState, useEffect } from 'react';

// Your React component
function MyComponent() {
  const [provider, setProvider] = useState<providers.Web3Provider | null>(null);

  useEffect(() => {
    const web3Modal = new Web3Modal({
      // Configure your connectors here (e.g., WalletConnect, MetaMask)
      // ...
    });

    const connectWallet = async () => {
      try {
        const externalProvider = await web3Modal.connect();
        const ethersProvider = new ethers.providers.Web3Provider(externalProvider);
        setProvider(ethersProvider);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    };

    connectWallet();
  }, []);

  // Use the `provider` in your app
  // ...
}
