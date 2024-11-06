// src/components/ExpenseItem.js
import React, { useState } from 'react';
import ExpenseDate from './ExpenseDate';
import Card from './Card';
import './ExpenseItem.css';

function ExpenseItem(props) {
  const { id, title, amount, date, onUpdate, onDelete } = props;

  // Состояние для управления редактированием
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newAmount, setNewAmount] = useState(amount);

  // Обработчик для начала редактирования
  const startEditingHandler = () => {
    setIsEditing(true);
  };

  // Обработчик для отмены редактирования
  const stopEditingHandler = () => {
    setIsEditing(false);
    setNewTitle(title);  // возвращаем старое название
    setNewAmount(amount);  // возвращаем старую сумму
  };

  // Обработчик для отправки измененных данных
  const submitEditHandler = () => {
    const updatedExpense = {
      title: newTitle,
      amount: newAmount,
      date: date,
    };
    onUpdate(id, updatedExpense);  // передаем обновленные данные в родительский компонент
    setIsEditing(false);  // Закрываем форму редактирования
  };

  // Обработчик для удаления
  const deleteExpenseHandler = () => {
    onDelete(id);
  };

  return (
    <Card className="expense-item">
      <ExpenseDate date={date} />
      <div className="expense-item__description">
        {isEditing ? (
          <div>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}  // обновляем название
            />
            <input
              type="number"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}  // обновляем сумму
            />
            <button onClick={submitEditHandler}>Save</button>
            <button onClick={stopEditingHandler}>Cancel</button>
          </div>
        ) : (
          <>
            <h2>{title}</h2>
            <div className="expense-item__price">${amount}</div>
            <button onClick={startEditingHandler}>Edit</button>
            <button onClick={deleteExpenseHandler}>Delete</button>
          </>
        )}
      </div>
    </Card>
  );
}

export default ExpenseItem;
