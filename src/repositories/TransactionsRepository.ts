import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: "income" | "outcome";
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    const initialBalance: Balance = {income: 0, outcome: 0, total: 0};

    const balance = this.transactions.reduce((sum, transaction) => {
      if (transaction.type === "income") {
        sum.income += transaction.value;
        sum.total += transaction.value;
      } else {
        sum.outcome += transaction.value;
        sum.total -= transaction.value;
      }
      return sum;
    }, initialBalance);

    return balance;
  }

  public create({title, value, type}: CreateTransactionDTO): Transaction {

    const transaction = new Transaction({title, value, type});

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
