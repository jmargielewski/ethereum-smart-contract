import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Input, Message, Button } from 'semantic-ui-react';

import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

const ContributeForm = ({ address }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    const campaign = Campaign(address);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, 'ether'),
      });

      router.replace(`/campaigns/${address}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setValue('');
    }
  };

  return (
    <Form onSubmit={onSubmit} error={!!error}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          label="ether"
          labelPosition="right"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Form.Field>
      <Message error header="Oops!" content={error} />
      <Button primary loading={loading} type="submit">
        Contribute!
      </Button>
    </Form>
  );
};

export default ContributeForm;
