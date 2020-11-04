import Web3 from 'web3';

// const web3 = new Web3(window.web3.currentProvider);

const web3 = new Web3(window.ethereum);
window.ethereum.enable();
export default web3;

// const result = await new web3.eth.Contract(JSON.parse(interface))
//     .deploy({ data: bytecode })
//     .send({ gas: '1000000', from: accounts[0] });
