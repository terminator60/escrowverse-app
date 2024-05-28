# Decentralized Escrow Application

This project is a decentralized escrow application built using React and Hardhat. It allows users to create escrow smart contracts with an arbiter and supports ERC20 token escrow.

## Introduction

The Decentralized Escrow React App built with Hardhat which enables users to create and manage escrow contracts on the Ethereum blockchain. The escrow contract involves three parties: a sender, a recipient, and an arbiter. The sender deposits ETH or ERC20 tokens into the escrow contract, and the arbiter or On-chain Event decides whether to release the funds to the recipient or return them to the sender.

## Features

- **Create Escrow Contracts**: Users can create new escrow contracts by specifying the sender, recipient, and arbiter/ERC20 Token addresses.
- **ERC20 Token Support**: The app supports escrowing of ERC20 tokens.
- **Arbiter Decision**: The arbiter can release the funds to the recipient or return them to the sender.
- **On-Chain Decision**: The on-chain approval can release the funds to the recipient or return them to the sender.
- **User-friendly Interface**: A React-based interface for interacting with the escrow contracts.

## Project Layout

There are three top-level folders:

1. `/app` - contains the front-end application
1. `/server` - contains the back-end application
2. `/contracts` - contains the solidity contract
3. `/tests` - contains tests for the solidity contract

## Setup

Install dependencies in the top-level directory with `npm install`.

After you have installed hardhat locally, you can use commands to test and compile the contracts, among other things. To learn more about these commands run `npx hardhat help`.

Compile the contracts using `npx hardhat compile`. The artifacts will be placed in the `/app` folder, which will make it available to the front-end. This path configuration can be found in the `hardhat.config.js` file.

## Front-End

`cd` into the `/app` directory and run `npm install`

To run the front-end application run `npm start` from the `/app` directory. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Back-End

`cd` into the `/server` directory and run `npm install`

To run the back-end application run `node index.js` from the `/server` directory.
