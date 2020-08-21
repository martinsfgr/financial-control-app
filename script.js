let transactions = [
  {id: 1, name: 'Bolo', amount: -200},
  {id: 2, name: 'Aluguel', amount: 100}
];

const transactionsDiv = document.querySelector("#transactions");

const showTransactions = (transaction) => {
  let transactionType = transaction.amount > 0 ? 'plus' : 'minus';
  console.log(transactionType);
};

transactions.forEach(showTransactions);
