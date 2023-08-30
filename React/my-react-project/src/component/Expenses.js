import ExpensesFilter from "./ExpensesFilter";
import ExpenseItem from "./ExpenseItem";
import ExpenseChart from './ExpensesChart';
import './Expenses.css';
function Expenses(props) {
  const filteredExpenses = props.items.filter((expense) => {
    return expense.date.getFullYear().toString();
  });
  return (
    <div className='expenses'>
      <ExpensesFilter filterByYear={props.filterByYear} />
      <ExpenseChart expenses={filteredExpenses}/>
      {props.items.length === 0 ?(
        <p className="no-data">No data found!</p>) : (
          props.items.map((item => (
            <ExpenseItem
              key={item.id}
              title={item.title}
              amount={item.amount}
              date={item.date}
            />

          )))
        )
        }
    </div>
  );
}

export default Expenses;