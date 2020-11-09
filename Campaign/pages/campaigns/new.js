import { useState } from 'react';
import { useRouter } from 'next/router';
import factory from '../../ethereum/factory';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';

import Layout from '../../components/Layout';

const CampaignNew = () => {
  const [minimumContribution, setMinimumContribution] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      const accounts = await web3.eth.getAccounts();

      await factory.methods.createCampaign(minimumContribution).send({
        from: accounts[0],
      });
      router.push('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h3> Create a Campaign</h3>
      <Form onSubmit={onSubmit} error={!!error}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            value={minimumContribution}
            onChange={(e) => setMinimumContribution(e.target.value)}
            label="wei"
            labelPosition="right"
          />
        </Form.Field>
        <Message error header="Oops!" content={error} />
        <Button loading={loading} primary type="submit">
          Create!
        </Button>
      </Form>
    </Layout>
  );
};

export default CampaignNew;
