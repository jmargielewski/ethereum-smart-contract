import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xa29d346c124e65Eb8097DCBe31CFf076ef906eD1'
);

export default instance;
