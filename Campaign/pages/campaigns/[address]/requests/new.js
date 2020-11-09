import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Form, Message, Button, Input } from 'semantic-ui-react';

import Layout from '../../../../components/Layout';

import web3 from '../../../../ethereum/web3';
import Campaign from '../../../../ethereum/campaign';

export async function getServerSideProps(ctx) {
  const { address } = ctx.query;

  return {
    props: {
      address,
    },
  };
}

const RequestNew = ({ address }) => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [recipient, setRecipient] = useState('');
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
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value), recipient)
        .send({
          from: accounts[0],
        });

      router.replace(`/campaigns/${address}/requests`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setDescription('');
      setValue('');
      setRecipient('');
    }
  };

  return (
    <Layout>
      <Link href={`/campaigns/${address}/requests`}>
        <a>Back</a>
      </Link>
      <h3>Create a Request</h3>
      <Form onSubmit={onSubmit} error={!!error}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Value in Ether</label>
          <Input
            label="wei"
            labelPosition="right"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </Form.Field>
        <Message error header="Oops!" content={error} />
        <Button loading={loading} primary>
          Create!
        </Button>
      </Form>
    </Layout>
  );
};

export default RequestNew;
