const transactionsUl = document.querySelector("#transactions");
const balanceDisplay = document.querySelector("#balance");
const incomeDisplay = document.querySelector("#money-plus");
const expanseDisplay = document.querySelector("#money-minus");

let transactionsArray = [
  {id: 1, name: 'Bolo', amount: -200},
  {id: 2, name: 'Aluguel', amount: 100},
  {id: 3, name: 'Teste', amount: 200}
];

const showTransactions = (transaction) => {
  let transactionType = transaction.amount > 0 ? 'plus' : 'minus';

  let transactionElement = `
    <li class=${transactionType}>
      ${transaction.name}
      <span>R$ ${transaction.amount}</span>
      <button class="delete-btn">x</button>
    </li>
  `
  transactionsUl.innerHTML += transactionElement;
  updateBalanceValues();
};

const updateBalanceValues = () => {
  const transactionAmounts = transactionsArray
    .map(transaction => transaction.amount);
  const totalBalance = transactionAmounts
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2);
  const income = transactionAmounts
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2);
  const expense = transactionAmounts
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2);

  incomeDisplay.innerHTML = `+${income}`;
  expanseDisplay.innerHTML = `${expense}`;
  balanceDisplay.innerHTML = `R$ ${totalBalance}`;
}

transactionsArray.forEach(showTransactions);
