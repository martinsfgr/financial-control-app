const transactionsUl = document.querySelector("#transactions");
const balanceDisplay = document.querySelector("#balance");
const incomeDisplay = document.querySelector("#money-plus");
const expanseDisplay = document.querySelector("#money-minus");

let transactionsArray = [
  {id: 1, name: 'Transação 1', amount: -200},
  {id: 2, name: 'Transação 2', amount: 100},
];

const showTransactions = ({ name, amount }) => {
  let amountType = amount > 0 ? "plus" : "minus";
  let operator = amount > 0 ? "+" : "-";
  let amountWithoutOperator = Math.abs(amount);

  const li = document.createElement('li');

  li.classList.add(amountType);
  li.innerHTML = `
    ${name} <span>${operator} R$ ${amountWithoutOperator}</span>
    <button class="delete-btn">x</button>
  `;

  transactionsUl.append(li);
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

  incomeDisplay.innerHTML = `${income}`;
  expanseDisplay.innerHTML = `${expense}`;
  balanceDisplay.innerHTML = `R$ ${totalBalance}`;
}

const init = () => {
  transactionsArray.forEach(showTransactions);
  updateBalanceValues();
}

init();
