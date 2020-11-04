const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const { MNEMONIC, INFURA_NODE } = require('./secrets');

const provider = new HDWalletProvider(MNEMONIC, INFURA_NODE);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('accounts', accounts);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('interface', interface);
  console.log('Deployed to:', result.options.address);
};

deploy();
