// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WalletList {
    address public owner;
    mapping(address => bool) public walletList;

    event WalletAdded(address indexed wallet);
    event WalletRemoved(address indexed wallet);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Function to add a new wallet address to the list
    function addWallet(address newWallet) external onlyOwner {
        require(newWallet != address(0) && !walletList[newWallet], "Invalid or already listed wallet");
        walletList[newWallet] = true;
        emit WalletAdded(newWallet);
    }

    // Function to remove a wallet address from the list
    function removeWallet(address wallet) external onlyOwner {
        require(walletList[wallet], "Wallet not found in the list");
        walletList[wallet] = false;
        emit WalletRemoved(wallet);
    }

    // Function to check if a wallet is listed
    function isWalletListed(address wallet) external view returns (bool) {
        return walletList[wallet];
    }
}
