import ExpenseItem from "./ExpenseItem";
import './Expenses.css';
function Expenses() {
    const expenses=[
        {
          id:'e1',
          title: 'Toilet Paper',
          amount: 94.12,
          date: new Date(2020,7,14),
        },
        {
          id:'e2',
          title: 'New TV',
          amount: 799.49,
          date: new Date(2021,2,12),
        },
        {
          id:'e3',
          title: 'Car Insurence',
          amount: 294.67,
          date: new Date(2021,2,28),
        },
        {
          id:'e4',
          title: 'New Wooden',
          amount: 94.12,
          date: new Date(2020,7,14),
        },
      ];
    return (
        <div className='expenses'>
            <ExpenseItem
                title={expenses[0].title}
                amount={expenses[0].amount}
                date={expenses[0].date}
            ></ExpenseItem>
            <ExpenseItem
                title={expenses[1].title}
                amount={expenses[1].amount}
                date={expenses[1].date}
            ></ExpenseItem>
            <ExpenseItem
                title={expenses[2].title}
                amount={expenses[2].amount}
                date={expenses[2].date}
            ></ExpenseItem>
            <ExpenseItem
                title={expenses[3].title}
                amount={expenses[3].amount}
                date={expenses[3].date}
            ></ExpenseItem>
        </div>
    );
}

export default Expenses;