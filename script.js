const transactionsDiv = document.querySelector("#transactions");
const balance = document.querySelector("#balance");
const moneyPlus = document.querySelector("#money-plus");
const moneyMinus = document.querySelector("#money-minus");

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
  transactionsDiv.innerHTML += transactionElement;
  updateBalance();
};

const updateBalance = () => {
  totalEntries = transactionsArray.reduce((accumulator, { amount }) => {
    if (amount > 0) {
      accumulator += amount;
    }

    return accumulator;
  }, 0);

  totalExpenses = transactionsArray.reduce((accumulator, { amount }) => {
    if (amount < 0) {
      accumulator += amount;
    }

    return accumulator;
  }, 0);

  totalBalance = totalEntries + totalExpenses;

  moneyPlus.innerHTML = `+${totalEntries}`;
  moneyMinus.innerHTML = `${totalExpenses}`;
  balance.innerHTML = `R$ ${totalBalance}`;
}

transactionsArray.forEach(showTransactions);
