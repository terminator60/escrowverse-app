import IERC20 from '../artifacts/contracts/IERC20.sol/IERC20';
import { Contract } from 'ethers';

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
  //console.log(erc20Contract);
  const approveTxn = await erc20Contract.connect(signer).approve(contractAddress, tokenAmount);
  await approveTxn.wait();
}

export async function getERC20Contract(tokenAddress, signer) {
  const erc20Contract = new Contract(
    tokenAddress,
    IERC20.abi,
    signer
  );
  //console.log(erc20Contract);
  return erc20Contract;
}

export async function getTokenName(tokenAddress, signer) {
  const erc20Contract = new Contract(
    tokenAddress,
    IERC20.abi,
    signer
  );
  const name = await erc20Contract.name();
  console.log(name);
  return name;
}

export async function transfer(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).transfer();
  await approveTxn.wait();
}