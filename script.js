const transactionsUl = document.querySelector("#transactions");
const balanceDisplay = document.querySelector("#balance");
const incomeDisplay = document.querySelector("#money-plus");
const expanseDisplay = document.querySelector("#money-minus");
const form = document.querySelector("#form");
const inputTransactionName = document.querySelector("#text");
const inputTransactionAmount = document.querySelector("#amount");


let transactionsArray = new Array;

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
    .reduce((accumulator, transaction) => accumulator + transaction, 0).toFixed(2);
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

const generateUniqueId = () => {
  return Math.round(Math.random() * 1000);
}

form.addEventListener("submit", event => {
  event.preventDefault();

  if (inputTransactionAmount.value.trim() === "" || inputTransactionName.value.trim() === "") {
    alert("O formulário não foi preenchido corretamente. Verifique e tente novamente.");
    return
  }

  const transaction = {
    id: generateUniqueId(),
    name: inputTransactionName.value,
    amount: Number(inputTransactionAmount.value)
  };

  inputTransactionName.value = "";
  inputTransactionAmount.value = "";

  transactionsArray.push(transaction);
  init();
});

const init = () => {
  transactionsUl.innerHTML = "";
  transactionsArray.forEach(showTransactions);
  updateBalanceValues();

  console.log(transactionsArray);
}

init();
