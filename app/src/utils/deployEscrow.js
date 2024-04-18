import { ContractFactory } from 'ethers';
import Escrow from '../artifacts/contracts/Escrow.sol/Escrow';
import EscrowERC20 from '../artifacts/contracts/EscrowERC20.sol/EscrowERC20';
import EscrowERC20ToERC20 from '../artifacts/contracts/EscrowERC20ToERC20.sol/EscrowERC20ToERC20';


export async function deployEscrow(signer, arbiter, beneficiary, value) {
  
  const factory = new ContractFactory(
    Escrow.abi,
    Escrow.bytecode,
    signer
  );
  console.log("Deploying Escrow Contract!!!")
  return await factory.deploy(arbiter, beneficiary, { value });
}

export async function deployEscrowERC20(signer, tokenAddress, beneficiary, value, tokenAmount) {
  const factory = new ContractFactory(
    EscrowERC20.abi,
    EscrowERC20.bytecode,
    signer
  );
  console.log("Deploying ERC20 Escrow Contract!!!")
  return await factory.deploy(tokenAddress, tokenAmount, beneficiary, { value });
}

export async function deployEscrowERC20ToERC20(signer, beneficiary, beneficiaryTokenAddress, depositorTokenAddress, depositorAmount, beneficiaryAmount) {
  const factory = new ContractFactory(
    EscrowERC20ToERC20.abi,
    EscrowERC20ToERC20.bytecode,
    signer
  );
  console.log("Deploying ERC20 To ERC20 Escrow Contract!!!")
  return await factory.deploy(beneficiary, beneficiaryTokenAddress, depositorTokenAddress, depositorAmount, beneficiaryAmount);
}
