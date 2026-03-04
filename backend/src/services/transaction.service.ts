import {
  getAllTransactions,
  getTransactionById,
  saveTransaction,
} from "../repositories/transaction.repository";

export const TransactionService = {
  createTransaction: async (amount: number, description: string) => {
    if (amount <= 0) {
      throw new Error("Amount must be greater than zero");
    }

    const descriptionTrimmed = description.trim();
    if (descriptionTrimmed.length === 0) {
      throw new Error("Description cannot be empty");
    }

    return saveTransaction({ amount, description: descriptionTrimmed });
  },

  getTransaction: async (id: string) => {
    if (id.trim().length === 0) {
      throw new Error("Transaction ID cannot be empty");
    }

    return getTransactionById(id);
  },

  getAll: async () => {
    return getAllTransactions();
  },
};
