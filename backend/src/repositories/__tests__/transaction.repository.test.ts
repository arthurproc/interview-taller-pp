import { saveTransaction } from "../transaction.repository";

describe("Transaction Repository", () => {
  it("should save a transaction and return it with a generated id", async () => {
    const input = { amount: 100, description: "Test payment" };

    const saved = (await saveTransaction(input)) as {
      id: string;
      amount: number;
      description: string;
    };

    expect(saved).toHaveProperty("id");
    expect(saved.id).toBeTruthy();
    expect(saved.amount).toBe(input.amount);
    expect(saved.description).toBe(input.description);
  });
});
