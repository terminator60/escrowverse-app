import axios from 'axios';
import { getERC20Contract, approveERC20 } from './contactInteraction';
import { parseEther } from 'ethers';

export async function getEscrowContracts(signer, setEscrows) {
    try {
      const response = await axios.get('http://localhost:5000/api/escrow');
      if (response.data.length >= 0) {
        await displayEscrows(response.data, signer, setEscrows);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function displayEscrows(input, signer, setEscrows) {
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
        handleApprove: () => { approveHandler(data.address, signer) },
        handleBeneficiaryTokenApprove: () => { tokenApproveHandler(data.address, data.beneficiaryTokenAddress, data.beneficiaryAmount, signer, 'beneficiary') },
        handleDepositerTokenApprove: () => { tokenApproveHandler(data.address, data.depositorTokenAddress, data.depositorAmount, signer, 'depositor') },
        handleTransfer: data.handleTransfer,
        type: data.type,
        beneficiaryToken: data.beneficiaryToken,
        depositorToken: data.depositorToken
      }
      contracts.push(contract);
    })
    setEscrows(contracts);
  }

  async function tokenApproveHandler(address, beneficiaryTokenAddress, beneficiaryAmount, signer, type) {
    //console.log(window.ethereum);
    console.log(signer);
    if (signer) {
      const erc20Contract = await getERC20Contract(beneficiaryTokenAddress, signer);
      erc20Contract.on('Approval', (owner, spender, value) => {
        // console.log(owner, spender, value);
        // console.log(beneficiaryAmount)
        if (spender === address && value >= parseEther(beneficiaryAmount)) {
          document.getElementById(`${address}-${type}-approve`).className =
            'complete';
          document.getElementById(`${address}-${type}-approve`).innerText =
            `✓ ${type}'s Token Has been Approved!`;
        }
      });
      await approveERC20(beneficiaryTokenAddress, address, parseEther(beneficiaryAmount), signer);
    } else {
      alert('Wallet is not connected');
    }
  }

  async function approveHandler(address, signer, type) {
    // const erc20Contract = await getERC20Contract(beneficiaryTokenAddress, signer);
    // erc20Contract.on('Approval', (owner, spender, value) => {
    //   // console.log(owner, spender, value);
    //   // console.log(beneficiaryAmount)
    //   if (spender === address && value >= parseEther(beneficiaryAmount)) {
    //     document.getElementById(`${address}-${type}-approve`).className =
    //       'complete';
    //     document.getElementById(`${address}-${type}-approve`).innerText =
    //       `✓ ${type}'s Token Has been Approved!`;
    //   }
    // });
    // console.log(signer);
    // await approveERC20(beneficiaryTokenAddress, address, parseEther(beneficiaryAmount), signer);
  }