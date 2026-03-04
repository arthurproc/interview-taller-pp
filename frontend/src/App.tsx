import './App.css'
import { TransactionForm } from './components/transaction-form'
import type { Transaction } from './types';

function App() {
  const saveTransaction = async (data: Transaction) => {
    const response = await fetch('http://localhost:3000/transaction', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json"
      }
    });

    const result = await response.json();

    console.log(result);
  }

  return (
    <>
      <TransactionForm onSubmit={async (data) => saveTransaction(data)}  />
    </>
  )
}

export default App
