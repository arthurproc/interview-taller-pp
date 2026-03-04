import { Request, Response } from "express";
import { TransactionService } from "../services/transaction.service";
import { isNullOrUndefined } from "../helpers/validation";

export const TransactionController = {
  createTransaction: async (req: Request, res: Response) => {
    try {
      const { amount, description } = validateBody(req.body);

      const result = await TransactionService.createTransaction(
        amount,
        description,
      );

      res.status(201).json({
        message: "Transaction created successfully",
        data: result,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error creating transaction:", error.message);
        res.status(400).json({ message: error?.message });
        return;
      }

      console.error("Unexpected error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getTransaction: async (req: Request, res: Response) => {
    try {
      const id = req.params?.id;
      if (isNullOrUndefined(id)) {
        res.status(400).json({ message: "Transaction ID is required" });
        return;
      }

      const singleId = Array.isArray(id) ? id[0] : id;
      const result = await TransactionService.getTransaction(singleId);

      res.status(200).json({
        message: "Transaction retrieved successfully",
        data: result,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error retrieving transaction:", error.message);
        res.status(404).json({ message: error?.message });
        return;
      }

      console.error("Unexpected error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getAllTransactions: async (req: Request, res: Response) => {
    try {
      const result = await TransactionService.getAll();

      res.status(200).json({
        message: "Transactions retrieved successfully",
        data: result,
      });
    } catch (error) {
      console.error("Error retrieving transactions:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

function validateBody(body: any): { amount: number; description: string } {
  if (
    !body ||
    isNullOrUndefined(body.amount) ||
    isNullOrUndefined(body.description)
  ) {
    throw new Error("Amount and description are required");
  }

  if (typeof body.amount !== "number") {
    throw new Error("Amount must be a number");
  }

  if (typeof body.description !== "string") {
    throw new Error("Description must be a string");
  }

  return { amount: body.amount, description: body.description };
}
