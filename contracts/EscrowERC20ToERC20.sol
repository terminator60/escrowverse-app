// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {IERC20} from "./IERC20.sol";

contract EscrowERC20ToERC20 {
    IERC20 beneficiaryTokenContract;
    IERC20 depositorTokenContract;
    address public beneficiary;
    address public depositor;
    uint public depositorAmount;
    uint public beneficiaryAmount;

    //bool public isApproved;

    event TransferCompleted(
        address depositor,
        address beneficiary,
        uint depositorAmount,
        uint beneficiaryAmount
    );

    constructor(
        address _beneficiary,
        address _beneficiaryTokenAddress,
        address _depositorTokenAddress,
        uint _depositorAmount,
        uint _beneficiaryAmount
    ) payable {
        beneficiaryTokenContract = IERC20(_beneficiaryTokenAddress);
        depositorTokenContract = IERC20(_depositorTokenAddress);
        beneficiary = _beneficiary;
        depositorAmount = _depositorAmount;
        beneficiaryAmount = _beneficiaryAmount;
        depositor = msg.sender;
    }

    //event ERC20Transferd(address from, address to, uint amount);
    //event ERC20Transferd(address from, address to, uint amount);

    function allowanceCheck(
        IERC20 tokenContract,
        address tokenOwner,
        uint tokenAmount
    ) internal view returns (bool allowed) {
        uint allowanceAmount = tokenContract.allowance(
            tokenOwner,
            address(this)
        );
        return allowanceAmount >= tokenAmount;
    }

    function transfer() external {
        require(
            allowanceCheck(depositorTokenContract, depositor, depositorAmount),
            "Depositor ERC20 Token has not yet approved or allowance is less!!"
        );
        require(
            allowanceCheck(
                beneficiaryTokenContract,
                beneficiary,
                beneficiaryAmount
            ),
            "Beneficiary ERC20 Token has not yet approved or allowance is less!!"
        );
        bool depositorErc20Sent = depositorTokenContract.transferFrom(
            depositor,
            beneficiary,
            depositorAmount
        );
        bool beneficiaryErc20Sent = beneficiaryTokenContract.transferFrom(
            beneficiary,
            depositor,
            beneficiaryAmount
        );
        require(
            depositorErc20Sent && beneficiaryErc20Sent,
            "Failed to transfer the ERC20 Token"
        );
        emit TransferCompleted(
            depositor,
            beneficiary,
            depositorAmount,
            beneficiaryAmount
        );
    }
}
