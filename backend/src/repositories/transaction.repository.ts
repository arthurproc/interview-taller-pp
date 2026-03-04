import { Transaction } from "../types";

const transactions = new Map<string, Transaction>();

export async function saveTransaction(transaction: Omit<Transaction, "id">) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const id = `${Date.now()}`;

      const toSave = { id, ...transaction };

      transactions.set(id, toSave);
      resolve(toSave);
    }, 1000);
  });
}

export async function getTransactionById(id: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const transaction = transactions.get(id);

      if (!transaction) {
        reject(new Error("Transaction not found"));
        return;
      }

      resolve(transaction);
    }, 1000);
  });
}

export async function getAllTransactions() {
  // Fetch fast to appear more responsive, but still async to simulate real database call
  return Array.from(transactions.values());
}
