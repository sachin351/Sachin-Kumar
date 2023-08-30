import React, { useState } from "react";
import './ExpenseForm.css';
const ExpenseForm = ({ onExpenseAdd,onCancel }) => {
    const [userInput, setUserInput] = useState({
        enterTitle: '',
        enterAmount: '',
        enterDate: "",
    });
    const titleChangeHandler = (event) => {
        setUserInput({
            ...userInput,
            enterTitle: event.target.value,
        });
    };
    
    const amountChnageHandler = (event) => {
        setUserInput({
            ...userInput,
            enterAmount: event.target.value,
        })
    };
    const dateChnageHandler = (event) => {
        console.log("====>",event.target.value)
        setUserInput({
            ...userInput,
            enterDate: new Date(event.target.value),
        })
    };
    const submitHandler = (event) => {
        event.preventDefault();

        onExpenseAdd(userInput);
        setUserInput({
            enterTitle: '',
            enterAmount: '',
            enterDate: '',
        })
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Title</label>
                    <input type="text" value={userInput.enterTitle} onChange={titleChangeHandler} />
                </div>
                <div className="new-expense__control">
                    <label>Amount</label>
                    <input type="number" value={userInput.enterAmount} min="0.01" step="0.01" onChange={amountChnageHandler} />
                </div>
                <div className="new-expense__control">
                    <label>Date</label>
                    <input type="date" value={userInput.enterDate} onChange={dateChnageHandler} />
                </div>
            </div>
            <div className="new-expense__actions">
                <button type="button" onClick={()=>onCancel()}>Cancel</button>
                <button type="submit">Add Expense</button>
            </div>
        </form>
    );
}
export default ExpenseForm;