import { useState } from "react";
import type { Transaction } from "../types";

type TransactionFormProps = {
  onSubmit: (data: Transaction) => Promise<void>;
}

export function TransactionForm(props: TransactionFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState<Transaction>({
    amount: 0,
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await props.onSubmit(formState);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h1>Create your transaction</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <label htmlFor="amount" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            Amount:
            <input
              id="amount"
              name="amount"
              type="number"
              value={formState.amount}
              onChange={(e) => setFormState({ ...formState, amount: Number(e.target.value) })}
            />
          </label>
          <label htmlFor="description" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            Description:
            <input
              id="description"
              name="description"
              value={formState.description}
              onChange={(e) => setFormState({ ...formState, description: e.target.value })}
            />
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        style={{ marginTop: 16, padding: "8px 16px", fontSize: 16 }}
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  )
}