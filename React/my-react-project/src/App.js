import { useState } from 'react';
import Expenses from './component/Expenses';
import NewExpense from './NewExpense/NewExpense';

import './App.css';

function App() {
  const [expenses, setExpenses] = useState([
    {
      id: 'e1',
      title: 'Toilet Paper',
      amount: 94.12,
      date: new Date(2020, 7, 14),
    },
    {
      id: 'e2',
      title: 'New TV',
      amount: 799.49,
      date: new Date(2021, 2, 12),
    },
    {
      id: 'e3',
      title: 'Car Insurence',
      amount: 294.67,
      date: new Date(2021, 2, 28),
    },
    {
      id: 'e4',
      title: 'New Wooden',
      amount: 94.12,
      date: new Date(2020, 7, 14),
    },
  ]);
  const addNewExpense = (expense) => {
    console.log('expense', expense)
    console.log("expenses", expenses[0])
    setExpenses(prev => [...prev, { title: expense.enterTitle, amount: +expense.enterAmount, date: expense.enterDate, id: Math.random() }])
  }
  return (
    <div>
      <NewExpense onExpenseAdd={addNewExpense} />
      <Expenses items={expenses}></Expenses>
    </div>
  );
}

export default App;
