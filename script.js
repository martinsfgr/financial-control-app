let transactions = [
  {id: 1, name: 'Bolo', amount: -200},
  {id: 2, name: 'Aluguel', amount: 100}
];

const transactionsDiv = document.querySelector("#transactions");

const showTransactions = (transaction) => {
  let transactionType = transaction.amount > 0 ? 'plus' : 'minus';
  console.log('A transação é:', transactionType);

  let transactionElement = `
    <li class=${transactionType}>
      ${transaction.name}
      <span>R$ ${transaction.amount}</span>
      <button class="delete-btn">x</button>
    </li>
  `

  transactionsDiv.innerHTML += transactionElement;
};

transactions.forEach(showTransactions);
