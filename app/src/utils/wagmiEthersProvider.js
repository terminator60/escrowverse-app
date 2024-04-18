import { BrowserProvider } from "ethers"

export async function clientToProvider(client) {
    const { account, chain, transport } = client;
    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address
    }
    const provider = new BrowserProvider(transport, network);
    const signer = await provider.getSigner(account?.address);
    return { provider, signer };
}
