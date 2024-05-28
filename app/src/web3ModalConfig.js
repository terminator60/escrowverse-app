import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { WagmiProvider } from 'wagmi';
import { arbitrum, mainnet, sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const projectId = process.env.REACT_APP_WALLETCONNECT_PROJECT_ID;
// Get your project ID from WalletConnect Cloud
const metadata = {
  name: 'EscrowVerse',
  description: 'Create & Deploy Decentralized Escrow Contracts',
  url: `https://${window.location.hostname}:3000`, // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [sepolia, mainnet, arbitrum];

const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  // Other optional parameters
});

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true // Optional - false as default
})

export function Web3ModalProvider({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
