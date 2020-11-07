import Web3 from 'web3';
import { INFURA_NODE } from '../../secrets';
// const web3 = new Web3(window.web3.currentProvider);

let web3;

if (typeof window !== 'undefined' && window.ethereum !== 'undefined') {
  web3 = new Web3(window.ethereum);
  window.ethereum.enable();
} else {
  const provider = new Web3.providers.HttpProvider(INFURA_NODE);

  web3 = new Web3(provider);
}

export default web3;
