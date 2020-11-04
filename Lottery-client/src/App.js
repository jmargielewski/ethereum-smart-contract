import { useState, useEffect } from 'react';
import web3 from './web3';
import lottery from './lottery';

function App() {
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState('');
  const [state, setState] = useState({ manager: '', players: [], balance: '' });

  useEffect(async () => {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    setState({ manager, players, balance });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const accounts = await web3.eth.getAccounts();

    setMessage('Waiting on transaction success...');

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(amount, 'ether'),
    });

    setMessage('You have been entered!');
  };

  const onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    setMessage('Waiting on transaction success...');

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    setMessage('A winner has been picked!');
  };

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>
        This Contract is managed by {state.manager}
        There are currently {state.players.length} people entered, competing to
        win {web3.utils.fromWei(state.balance, 'ether')} ether!
      </p>

      <hr />

      <form onSubmit={onSubmit}>
        <h4>Want to try your luck?</h4>

        <div>
          <label>Amount of ether to enter</label>
          <input onChange={(e) => setAmount(e.target.value)} value={amount} />
        </div>
        <button>Enter</button>
      </form>

      <hr />

      <h4>Ready to pick up a winner</h4>
      <button onClick={onClick}> Pick a winner!</button>

      <hr />

      <h1>{message}</h1>
    </div>
  );
}

export default App;
