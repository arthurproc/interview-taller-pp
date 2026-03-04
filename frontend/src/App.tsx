import { useState } from 'react';
import { TransactionForm } from './components/transaction-form'
import type { Transaction } from './types';

function App() {
  const [savedTransactions, setSavedTransactions] = useState<Array<Transaction & { id: string }>>([]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`http://localhost:3000/transactions`);

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult?.message || "Failed to fetch transaction");
      }
  
      const result = await response.json();
      console.log(result);
      setSavedTransactions(result.data);
    } catch (error) {
      console.error("Error fetching transaction:", error);
      alert(`Error fetching transaction: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  const saveTransaction = async (data: Transaction) => {
    try {
      const response = await fetch('http://localhost:3000/transactions', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json"
        }
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult?.message || "Failed to save transaction");
      }
  
      const result = await response.json();
      console.log(result);
      alert(`Transaction created: ${JSON.stringify(result.data)}`);
      fetchTransactions();
    } catch (error) {
      console.error("Error saving transaction:", error);
      alert(`Error saving transaction: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", padding: 32, gap: 32  }}>
      <TransactionForm onSubmit={async (data) => saveTransaction(data)}  />
      {savedTransactions.length > 0 && (
        <div style={{ marginTop: 32, flexDirection: "column", display: "flex", alignItems: "center" }}>
          <h2>Saved Transactions:</h2>
          {savedTransactions.map((transaction) => (
            <div key={transaction.id} style={{ marginBottom: 16, border: "1px solid #ccc", borderRadius: 8, padding: 16 }}>
              <strong>ID:</strong> {transaction.id} <br />
              <strong>Amount:</strong> {transaction.amount} <br />
              <strong>Description:</strong> {transaction.description}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
