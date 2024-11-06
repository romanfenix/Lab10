// src/App.js
import React, { useState, useEffect } from 'react';
import Expenses from './components/Expenses';
import Loader from './components/Loader';
import { getExpenses, addExpense, updateExpense, deleteExpense } from './firebase/firebase';
import './App.css';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadExpenses = async () => {
    setLoading(true);
    const expensesData = await getExpenses();
    setExpenses(expensesData);
    setLoading(false);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const addExpenseHandler = async (expense) => {
    await addExpense(expense);
    loadExpenses();
  };

  const updateExpenseHandler = async (id, updatedExpense) => {
    await updateExpense(id, updatedExpense);
    loadExpenses();
  };

  const deleteExpenseHandler = async (id) => {
    await deleteExpense(id);
    loadExpenses();
  };

  return (
    <div>
      {loading ? <Loader /> : 
        <Expenses 
          items={expenses} 
          onAddExpense={addExpenseHandler} 
          onUpdateExpense={updateExpenseHandler} 
          onDeleteExpense={deleteExpenseHandler} 
        />
      }
    </div>
  );
};

export default App;
