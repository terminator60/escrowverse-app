import { parseEther, formatEther } from 'ethers';
import { deployEscrow, deployEscrowERC20, deployEscrowERC20ToERC20}  from './deployEscrow';
import { approve, approveERC20, transfer, getERC20Contract, getTokenName } from './contactInteraction';
import { escrowDataStringfy } from './EscrowDataStringfy';
import axios from 'axios';

export async function newContract(selectedOption, options, signer, escrows, setEscrows, account) {
    console.log("Creating Contract!!!")
    console.log('Singer -',signer)
    const beneficiary = document.getElementById('beneficiary').value;
    let escrowContract;
    if (selectedOption === options[0]) {
        const arbiter = document.getElementById('arbiter').value;
        //const value = parseUnits(`${document.getElementById('amount').value}`, unit);
        const value = parseEther(`${document.getElementById('amount').value}`);
        escrowContract = await deployEscrow(signer, arbiter, beneficiary, value);
    } else if (selectedOption === options[1]) {
        const tokenAddress = document.getElementById('arbiter').value;
        //const value = parseUnits(`${document.getElementById('amount').value}`, unit);
        const value = parseEther(`${document.getElementById('amount').value}`);
        const tokenAmount = parseEther(document.getElementById('token-amount').value);
        escrowContract =  await deployEscrowERC20(signer, tokenAddress, beneficiary, value, tokenAmount);
    } else {
        const beneficiaryTokenAddress = document.getElementById('beneficiaryERC20Address').value;
        const depositorTokenAddress = document.getElementById('depositorERC20Address').value;
        const depositorAmount = parseEther(document.getElementById('depositor-token-amount').value);
        const beneficiaryAmount = parseEther(document.getElementById('beneficiary-token-amount').value);
        console.log(beneficiary, beneficiaryTokenAddress, depositorTokenAddress, depositorAmount, beneficiaryAmount);
        escrowContract =  await deployEscrowERC20ToERC20(signer, beneficiary, beneficiaryTokenAddress, depositorTokenAddress, depositorAmount, beneficiaryAmount);
    }
    console.log('Contract Deployed!!')
    console.log(escrowContract.target);
    console.log(escrowContract);
    let escrow;
    if (selectedOption === options[0]) {
        const arbiter = document.getElementById('arbiter').value;
        const value = document.getElementById('amount').value;
        escrow = {
            address: escrowContract.target,
            depositor: account,
            arbiter: arbiter,
            beneficiary: beneficiary,
            value: value.toString(),
            handleApprove: async () => {
                escrowContract.on('Approved', () => {
                    document.getElementById(escrowContract.address).className =
                        'complete';
                    document.getElementById(escrowContract.address).innerText =
                        "✓ It's been approved!";
                });

                await approve(escrowContract, signer);
            },
            type: selectedOption
        };
    } else if (selectedOption === options[1]) {
        const arbiter = document.getElementById('arbiter').value;
        const value = document.getElementById('amount').value;
        const tokenAmount = parseEther(`${document.getElementById('token-amount').value}`);
        const beneficiaryTokenName = await getTokenName(arbiter, signer);
        escrow = {
            address: escrowContract.target,
            depositor: account,
            value: value,
            beneficiary: beneficiary,
            beneficiaryTokenAddress: arbiter,
            beneficiaryAmount: formatEther(tokenAmount),
            handleApprove: async () => {
                /*escrowContract.on('Approved', () => {
                  document.getElementById(escrowContract.address).className =
                    'complete';
                  document.getElementById(escrowContract.address).innerText =
                    "✓ It's been approved!";
                });*/
                await approveERC20(arbiter, escrowContract.address, tokenAmount, signer);
            },
            handleTransfer: async () => {
                escrowContract.on('TransferCompleted', () => {
                    document.getElementById(escrowContract.address).className =
                        'complete';
                    document.getElementById(escrowContract.address).innerText =
                        "✓ It's been transfered!";
                });

                await transfer(escrowContract, signer);
            },
            beneficiaryToken: beneficiaryTokenName,
            type: selectedOption,
        };
    } else if (selectedOption === options[2]) {
        const beneficiaryTokenAddress = document.getElementById('beneficiaryERC20Address').value;
        const depositorTokenAddress = document.getElementById('depositorERC20Address').value;
        const depositorAmount = parseEther(document.getElementById('depositor-token-amount').value);
        const beneficiaryAmount = parseEther(document.getElementById('beneficiary-token-amount').value);
        const beneficiaryTokenName = await getTokenName(beneficiaryTokenAddress, signer);
        const depositorTokenName = await getTokenName(depositorTokenAddress, signer);
        escrow = {
            address: escrowContract.target,
            depositor: account,
            beneficiary: beneficiary,
            beneficiaryTokenAddress: beneficiaryTokenAddress,
            depositorTokenAddress: depositorTokenAddress,
            beneficiaryAmount: formatEther(beneficiaryAmount),
            depositorAmount: formatEther(depositorAmount),
            handleBeneficiaryTokenApprove: async () => {
                const erc20Contract = await getERC20Contract(beneficiaryTokenAddress, signer);
                erc20Contract.on('Approval', (owner, spender, value) => {
                    // console.log(owner, spender, value);
                    // console.log(beneficiaryAmount)
                    if (spender === escrowContract.address && value >= beneficiaryAmount) {
                        document.getElementById(`${escrowContract.address}-beneficiary-approve`).className =
                            'complete';
                        document.getElementById(`${escrowContract.address}-beneficiary-approve`).innerText =
                            "✓ Beneficiary's Token Has been Approved!";
                    }
                });
                await approveERC20(beneficiaryTokenAddress, escrowContract.address, beneficiaryAmount, signer);
            },
            handleDepositerTokenApprove: async () => {
                const erc20Contract = await getERC20Contract(depositorTokenAddress, signer);
                erc20Contract.on('Approval', (owner, spender, value) => {
                    // console.log(owner, spender, value);
                    // console.log(depositorAmount)
                    if (spender === escrowContract.address && value >= depositorAmount) {
                        document.getElementById(`${escrowContract.address}-depositor-approve`).className =
                            'complete';
                        document.getElementById(`${escrowContract.address}-depositor-approve`).innerText =
                            "✓ Depositor's Token Has been Approved!";
                    }
                });
                await approveERC20(depositorTokenAddress, escrowContract.address, depositorAmount, signer);
            },
            handleTransfer: async () => {
                escrowContract.on('TransferCompleted', (depositor, beneficiary, depositorAmount, beneficiaryAmount) => {
                    console.log(depositor, beneficiary, depositorAmount, beneficiaryAmount)
                    document.getElementById(escrowContract.address).className =
                        'complete';
                    document.getElementById(escrowContract.address).innerText =
                        "✓ Token's has been transfered!";
                });

                await transfer(escrowContract, signer);
            },
            type: selectedOption,
            beneficiaryToken: beneficiaryTokenName,
            depositorToken: depositorTokenName
        };
    };
    const data = escrowDataStringfy(escrow);
    console.log(escrow);
    console.log(data);
    const response = await axios.post('http://localhost:5000/api/escrow', data);
    console.log(response);
    setEscrows([...escrows, escrow]);
}