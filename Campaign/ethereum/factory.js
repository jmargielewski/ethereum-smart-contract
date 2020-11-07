import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x6310C933BE3F1122642cC5f1e38fAbdAAA451F6B'
);

export default instance;
