import React from 'react';
import './ExpenseList.css';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  if (expenses.length === 0) {
    return (
      <div className="no-expenses">
        <p>No expenses yet. Add your first expense to get started!</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="expense-list">
      <h3>Recent Expenses</h3>
      <div className="expense-items">
        {expenses.map((expense) => (
          <div key={expense.id} className="expense-item">
            <div className="expense-main">
              <div className="expense-info">
                <h4>{expense.title}</h4>
                <p className="expense-description">{expense.description}</p>
                <div className="expense-meta">
                  <span className="expense-category">{expense.category}</span>
                  <span className="expense-date">{formatDate(expense.date)}</span>
                </div>
              </div>
              <div className="expense-amount">
                <span className="amount-value">₹{expense.amount.toFixed(2)}</span>
              </div>
            </div>
            <div className="expense-actions">
              <button
                onClick={() => onEdit(expense)}
                className="btn-edit"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(expense.id)}
                className="btn-delete"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
