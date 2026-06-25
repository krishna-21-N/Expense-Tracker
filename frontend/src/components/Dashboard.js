import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { expenseService } from '../services/expenseService';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [expensesData, summaryData] = await Promise.all([
        expenseService.getExpenses(),
        expenseService.getSummary(),
      ]);
      setExpenses(expensesData);
      setSummary(summaryData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expenseData) => {
    try {
      await expenseService.createExpense(expenseData);
      setShowForm(false);
      loadData();
    } catch (error) {
      console.error('Error adding expense:', error);
      throw error;
    }
  };

  const handleUpdateExpense = async (id, expenseData) => {
    try {
      await expenseService.updateExpense(id, expenseData);
      setEditingExpense(null);
      loadData();
    } catch (error) {
      console.error('Error updating expense:', error);
      throw error;
    }
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await expenseService.deleteExpense(id);
        loadData();
      } catch (error) {
        console.error('Error deleting expense:', error);
      }
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingExpense(null);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Expense Tracker</h1>
        <div className="header-actions">
          <span>Welcome, {user?.username}!</span>
          <button onClick={logout} className="btn-secondary">
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        {summary && (
          <div className="summary-section">
            <div className="summary-card">
              <h3>Total Expenses</h3>
              <p className="amount">₹{summary.total_amount.toFixed(2)}</p>
              <p className="count">{summary.total_count} expenses</p>
            </div>
            <div className="summary-card">
              <h3>By Category</h3>
              <div className="category-list">
                {Object.entries(summary.by_category).map(([category, amount]) => (
                  <div key={category} className="category-item">
                    <span className="category-name">{category}</span>
                    <span className="category-amount">₹{amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="actions-section">
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary"
            disabled={showForm}
          >
            + Add Expense
          </button>
        </div>

        {showForm && (
          <ExpenseForm
            expense={editingExpense}
            onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
            onCancel={handleCancelForm}
          />
        )}

        <ExpenseList
          expenses={expenses}
          onEdit={handleEdit}
          onDelete={handleDeleteExpense}
        />
      </div>
    </div>
  );
};

export default Dashboard;
