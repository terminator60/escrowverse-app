// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {IERC20} from "./IERC20.sol";

contract EscrowERC20 {
    IERC20 tokenContract;
    address public beneficiary;
    address public depositor;
    uint public tokenAmount;

    //bool public isApproved;

    event TransferCompleted(
        address beneficiary,
        address depositor,
        uint tokenAmount,
        uint ethAmount
    );

    constructor(
        address _erc20TokenContract,
        uint _tokenAmount,
        address _beneficiary
    ) payable {
        tokenContract = IERC20(_erc20TokenContract);
        beneficiary = _beneficiary;
        tokenAmount = _tokenAmount;
        depositor = msg.sender;
    }

    //event ERC20Transferd(address from, address to, uint amount);
    //event ERC20Transferd(address from, address to, uint amount);

    function allowanceCheck() public view returns(bool allowed) {
        uint allowanceAmount = tokenContract.allowance(beneficiary, address(this));
        return allowanceAmount >= tokenAmount;
    }

    function transfer() external {
        require(allowanceCheck(), "ERC20 Token is not yet approve or allowance!!");
        bool erc20Sent = tokenContract.transferFrom(
            beneficiary,
            depositor,
            tokenAmount
        );
        require(erc20Sent, "Failed to transfer the ERC20 Token");
        uint balance = address(this).balance;
        (bool ethSent, ) = beneficiary.call{value: balance}("");
        require(ethSent, "Failed to transfer the Ether");
        emit TransferCompleted(beneficiary, depositor, tokenAmount, balance);
    }
}
