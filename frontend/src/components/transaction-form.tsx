import { useState } from "react";
import type { Transaction } from "../types";

type TransactionFormProps = {
  onSubmit: (data: Transaction) => Promise<void>;
}

export function TransactionForm(props: TransactionFormProps) {

  const [formState, setFormState] = useState<Transaction>({
    amount: 0,
    description: "",
  });

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); props.onSubmit(formState)}}
    >
      <div>
        <h1>Create your transaction</h1>
        <label>
          Description:
          <input
            id="amount"
            name="amount"
            type="number"
            value={formState.amount}
            onChange={(e) => setFormState({ ...formState, amount: Number(e.target.value) })}
          />
        </label>
        <label>
          Amount:
          <input
            id="description"
            name="description"
            value={formState.description}
            onChange={(e) => setFormState({ ...formState, description: e.target.value })}
          />
        </label>
      </div>

      <button
        type="submit"
      >
        Submit
      </button>
    </form>
  )
}