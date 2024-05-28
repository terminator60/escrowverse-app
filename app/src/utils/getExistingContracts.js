import axios from 'axios';
import { getERC20Contract, approveERC20, transfer, approve, getEscrowContract } from './contactInteraction';
import { parseEther } from 'ethers';

export async function getEscrowContracts(signer, setEscrows, explorer) {
  try {
    const escrowApiUrl = process.env.REACT_APP_ESCROW_API_URL;
    const deafultExplorer = process.env.REACT_APP_ESCROW_DEFAULT_EXPLORER_URL;
    const response = await axios.get(`${escrowApiUrl}/api/escrow`);
    const blockExplorer = explorer ? explorer : deafultExplorer;
    if (response.data.length >= 0) {
      await displayEscrows(response.data, signer, setEscrows, blockExplorer);
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function displayEscrows(input, signer, setEscrows, explorer) {
  const contracts = []
  input.forEach(data => {
    const contract = {
      address: data.address,
      depositor: data.depositor,
      arbiter: data.arbiter,
      beneficiary: data.beneficiary,
      beneficiaryTokenAddress: data.beneficiaryTokenAddress,
      depositorTokenAddress: data.depositorTokenAddress,
      depositorAmount: data.depositorAmount,
      beneficiaryAmount: data.beneficiaryAmount,
      value: data.value,
      handleApprove: () => { approveHandler(data.address, data.type, signer) },
      handleBeneficiaryTokenApprove: () => { tokenApproveHandler(data.address, data.beneficiaryTokenAddress, data.beneficiaryAmount, signer, 'beneficiary') },
      handleDepositerTokenApprove: () => { tokenApproveHandler(data.address, data.depositorTokenAddress, data.depositorAmount, signer, 'depositor') },
      handleTransfer: () => { transferHandler(data.address, data.type, signer) },
      type: data.type,
      beneficiaryToken: data.beneficiaryToken,
      depositorToken: data.depositorToken,
      blockExplorer: explorer
    }
    contracts.push(contract);
  })
  setEscrows(contracts);
}

export async function tokenApproveHandler(address, tokenAddress, amount, signer, type) {
  if (signer) {
    const erc20Contract = await getERC20Contract(tokenAddress, signer);
    erc20Contract.on('Approval', (owner, spender, value) => {
      if (spender === address && value >= parseEther(amount)) {
        document.getElementById(`${address}-${type}-approve`).className =
          'complete';
        document.getElementById(`${address}-${type}-approve`).innerText =
          `✓ ${type}'s Token Has been Approved!`;
      }
    });
    await approveERC20(tokenAddress, address, parseEther(amount), signer);
  } else {
    alert('Wallet is not connected');
  }
}

export async function approveHandler(address, type, signer) {
  if (signer) {
    const escrowContract = await getEscrowContract(address, type, signer);
    escrowContract.on('Approved', (value) => {
      document.getElementById(`${address}-escrow-approve`).className =
        'complete';
      document.getElementById(`${address}-escrow-approve`).innerText =
        `✓ Escrow Has been Approved!`;
    });
    await approve(escrowContract, signer);
  } else {
    alert('Wallet is not connected');
  }
}

export async function transferHandler(address, type, signer) {
  if (signer) {
    const escrowContract = await getEscrowContract(address, type, signer);
    escrowContract.on('TransferCompleted', () => {
      document.getElementById(`${address}-escrow-transfer`).className =
        'complete';
      document.getElementById(`${address}-escrow-transfer`).innerText =
        `✓ ERC20 Token Has been Transfered!`;
    });
    await transfer(escrowContract, signer);
  } else {
    alert('Wallet is not connected');
  }
}