import { useEffect } from 'react';
import factory from '../ethereum/factory';

export async function getServerSideProps() {
  const campaigns = await factory.methods.getDeployedCampaigns().call();

  return { props: { campaigns } };
}

const HomePage = (props) => {
  return <div>{props.campaigns[0]}</div>;
};

export default HomePage;
