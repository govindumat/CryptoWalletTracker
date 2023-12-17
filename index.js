const { ethers } = require('ethers');
const fs = require('fs'); // For reading the contract ABI from a file
const config = require('./config');

// Infura provider setup
const infuraProvider = new ethers.getDefaultProvider(`https://goerli.infura.io/v3/${config.infuraProjectId}`);

// ABI file
const contractAbiPath = './WalletList.json';
const contractAbi = JSON.parse(fs.readFileSync(contractAbiPath));

// contract address
const contractAddress = '0x6C5568E71fC5768432b2a58eF0Ef59A1650976CE';

// Wallet setup with private key
const wallet = new ethers.Wallet(config.privateKey, infuraProvider);

// Contract instance setup
const contract = new ethers.Contract(contractAddress, contractAbi, wallet);

// Event filter for WalletAdded and WalletRemoved events
const walletAddedFilter = contract.filters.WalletAdded();
const walletRemovedFilter = contract.filters.WalletRemoved();

// Event listeners
contract.on(walletAddedFilter, (event) => {
    const wallet = event.args.wallet;
    console.log(`Wallet Added: ${wallet}`);
  });
  
  contract.on(walletRemovedFilter, (event) => {
    const wallet = event.args.wallet;
    console.log(`Wallet Removed: ${wallet}`);
  });

console.log('Event listeners are active. Waiting for events...');
