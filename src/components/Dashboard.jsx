import React, { useState, useEffect } from 'react';
import Card from './Card';
import Model from './Model';
import Chart from './Chart';

function Dashboard({
  expenses,
  balance,
  spendAmount,
  setExpenses,
  setBalance,
  setSpendAmount
}) {
  const [isIncomeFormVisible, setIsIncomeFormVisible] = useState(false);
  const [isExpenseFormVisible, setIsExpenseFormVisible] = useState(false);
  const [newIncome, setNewIncome] = useState('');
  const [expenseDetails, setExpenseDetails] = useState({
    title: '',
    price: '',
    category: '',
  });

  // Sync state with localStorage
  useEffect(() => {
    localStorage.setItem('balance', balance);
    localStorage.setItem('spendAmount', spendAmount);
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [balance, spendAmount, expenses]);

  const aggregateExpensesByCategory = () => {
    const aggregatedData = expenses.reduce((acc, expense) => {
      const { category, price } = expense;
      if (acc[category]) {
        acc[category] += price;
      } else {
        acc[category] = price;
      }
      return acc;
    }, {});

    return Object.keys(aggregatedData).map((category) => ({
      name: category,
      value: aggregatedData[category],
    }));
  };

  const handleIncomeFormSubmit = (e) => {
    e.preventDefault();
    const income = parseFloat(newIncome);
    if (!isNaN(income) && income > 0) {
      const updatedBalance = balance + income;
      setBalance(updatedBalance);
      setNewIncome('');
      setIsIncomeFormVisible(false);
    }
  };

  const handleExpenseFormSubmit = (e) => {
    e.preventDefault();
    const expense = {
      ...expenseDetails,
      price: parseFloat(expenseDetails.price),
    };

    if (!isNaN(expense.price) && expense.price > 0) {
      const updatedSpendAmount = spendAmount + expense.price;
      const updatedBalance = balance - expense.price;

      if (updatedBalance >= 0) {
        setSpendAmount(updatedSpendAmount);
        setBalance(updatedBalance);
        setExpenses([...expenses, expense]); // Update global state
        setExpenseDetails({ title: '', price: '', category: '' });
        setIsExpenseFormVisible(false);
      } else {
        alert('Insufficient balance to add this expense.');
      }
    }
  };

  return (
    <div style={{ color: "white", width: "100%", margin: "10px" }}>
      <h2>Expense Tracker</h2>
      <div style={{
          backgroundColor: "#626262",
          width: "97%",
          height: "300px",
          borderRadius: "10px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "center",
          margin: "10px"
      }}>
        <Card balance={balance} type="Income" onAddIncome={() => setIsIncomeFormVisible(true)} />
        <Card balance={spendAmount} type="Expenses" onAddIncome={() => setIsExpenseFormVisible(true)} />
        <div>
          <Chart data={aggregateExpensesByCategory()} />
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <div style={{ width: "26px", height: "8px", backgroundColor: "#A000FF" }}></div>
              <span style={{ color: "white" }}>Food</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <div style={{ width: "26px", height: "8px", backgroundColor: "#FF9304" }}></div>
              <span style={{ color: "white" }}>Entertainment</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <div style={{ width: "26px", height: "8px", backgroundColor: "#FDE006" }}></div>
              <span style={{ color: "white" }}>Travel</span>
            </div>
          </div>
        </div>
      </div>
      <Model
        isIncomeFormVisible={isIncomeFormVisible}
        setIsIncomeFormVisible={setIsIncomeFormVisible}
        isExpenseFormVisible={isExpenseFormVisible}
        setIsExpenseFormVisible={setIsExpenseFormVisible}
        newIncome={newIncome}
        setNewIncome={setNewIncome}
        handleIncomeFormSubmit={handleIncomeFormSubmit}
        expenseDetails={expenseDetails}
        setExpenseDetails={setExpenseDetails}
        handleExpenseFormSubmit={handleExpenseFormSubmit}
      />
    </div>
  );
}

export default Dashboard;
