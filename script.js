const transactionsUl = document.querySelector("#transactions");
const balanceDisplay = document.querySelector("#balance");
const incomeDisplay = document.querySelector("#money-plus");
const expanseDisplay = document.querySelector("#money-minus");
const form = document.querySelector("#form");
const inputTransactionName = document.querySelector("#text");
const inputTransactionAmount = document.querySelector("#amount");

let transactionsArray = JSON.parse(localStorage.getItem('transactions')) || [];

const showTransactions = (transaction) => {
  let amountType = transaction.amount > 0 ? "plus" : "minus";
  let operator = transaction.amount > 0 ? "+" : "-";
  let amountWithoutOperator = Math.abs(transaction.amount);
  let position = transactionsArray.indexOf(transaction);

  const li = document.createElement('li');

  li.classList.add(amountType);
  li.setAttribute("onclick", `deleteTransaction(${position})`);
  li.innerHTML = `
    ${transaction.name} <span>${operator} R$ ${amountWithoutOperator}</span>
    <button class="delete-btn">x</button>
  `;

  transactionsUl.append(li);
};

const getTransactionAmounts = () => transactionsArray
  .map(transaction => transaction.amount);

const getTotalBalance = () => getTransactionAmounts()
  .reduce((accumulator, transaction) => accumulator + transaction, 0).toFixed(2);

const getIncome = () => getTransactionAmounts()
  .filter(value => value > 0)
  .reduce((accumulator, value) => accumulator + value, 0)
  .toFixed(2);

const getExpense = () => getTransactionAmounts()
  .filter(value => value < 0)
  .reduce((accumulator, value) => accumulator + value, 0)
  .toFixed(2);

const updateBalanceValues = () => {
  const totalBalance = getTotalBalance();
  const income = getIncome();
  const expense = getExpense();

  incomeDisplay.innerHTML = `${income}`;
  expanseDisplay.innerHTML = `${expense}`;
  balanceDisplay.innerHTML = `R$ ${totalBalance}`;
}

const generateUniqueId = () => {
  return Math.round(Math.random() * 1000);
}

const addNewTransaction = (name, amount) => {
  const transaction = {
    id: generateUniqueId(),
    name: name,
    amount: Number(amount)
  };

  transactionsArray.push(transaction);

  inputTransactionName.value = "";
  inputTransactionAmount.value = "";
}

const deleteTransaction = (position) => {
  transactionsArray.splice(position, 1);
  updateLocalStorage();
  init();
}

const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactionsArray));
}

form.addEventListener("submit", event => {
  event.preventDefault();

  let transactionName = inputTransactionName.value.trim();
  let transactionAmount = inputTransactionAmount.value.trim();

  if (transactionName === "" || transactionAmount === "") {
    alert("O formulário não foi preenchido corretamente. Verifique e tente novamente.");
    return
  }

  addNewTransaction(transactionName, transactionAmount);
  updateLocalStorage();
  init();
});

const init = () => {
  transactionsUl.innerHTML = "";
  transactionsArray.forEach(showTransactions);
  updateBalanceValues();
}

init();
