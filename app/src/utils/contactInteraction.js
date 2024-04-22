import IERC20 from '../artifacts/contracts/IERC20.sol/IERC20';
import Escrow from '../artifacts/contracts/Escrow.sol/Escrow';
import EscrowERC20 from '../artifacts/contracts/EscrowERC20.sol/EscrowERC20';
import EscrowERC20ToERC20 from '../artifacts/contracts/EscrowERC20ToERC20.sol/EscrowERC20ToERC20';
import { Contract } from 'ethers';

const options = ['Arbitary Escrow', 'ETH -> ERC20 Escrow', 'ERC20 -> ERC20 Escrow'];

export async function getEscrowContract(escrowAddress, type, signer) {
  const escrowContract = new Contract(
    escrowAddress,
    type === options[0] ? Escrow.abi : (type === options[1] ? EscrowERC20.abi : EscrowERC20ToERC20.abi),
    signer
  );
  return escrowContract;
}

export async function approve(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).approve();
  await approveTxn.wait();
}

export async function approveERC20(tokenAddress, contractAddress, tokenAmount, signer) {
  const erc20Contract = new Contract(
    tokenAddress,
    IERC20.abi,
    signer
  );
  const approveTxn = await erc20Contract.connect(signer).approve(contractAddress, tokenAmount);
  await approveTxn.wait();
}

export async function getERC20Contract(tokenAddress, signer) {
  const erc20Contract = new Contract(
    tokenAddress,
    IERC20.abi,
    signer
  );
  return erc20Contract;
}

export async function getTokenName(tokenAddress, signer) {
  const erc20Contract = new Contract(
    tokenAddress,
    IERC20.abi,
    signer
  );
  const name = await erc20Contract.name();
  return name;
}

export async function transfer(escrowContract, signer) {
  const transferTxn = await escrowContract.connect(signer).transfer();
  await transferTxn.wait();
}