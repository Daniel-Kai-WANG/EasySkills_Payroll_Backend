export type Expenses = {
  id: string;
  type: string;
  attributes: ExpensesAttributes;
};

export type ExpensesAttributes = {
  closed: boolean;
  term: string;
  state: string;
  paid: boolean;
  toPay: number;
  currencyAgency: number;
  exchangeRateAgency: number;
};
