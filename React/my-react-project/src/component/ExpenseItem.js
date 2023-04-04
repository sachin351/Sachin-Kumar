import ExpenseDate from './ExpenseDate';
import Card from './Card';
import './ExpenseItem.css';
function ExpenseItem(props) {
    const clickHandler = () =>{
        console.log('clicked!');
    };
    return (
        <Card className="expense-item">
            <ExpenseDate date={props.date}></ExpenseDate>
            <div className="expense-item__description">
                <h2>{props.title}</h2>
                <div className="expense-item__price">${props.amount}</div>
            </div>
            <button onClick={clickHandler}>Change Title</button>
        </Card>
    );
}
export default ExpenseItem;