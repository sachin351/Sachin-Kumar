import React from "react";
import './NewExpense.css';
import ExpenseForm from "./ExpenseForm";
const NewExpense = ({ onExpenseAdd }) => {
    return (
        <div className="new-expense">
            <ExpenseForm onExpenseAdd={onExpenseAdd} />
        </div>
    );
}
export default NewExpense;