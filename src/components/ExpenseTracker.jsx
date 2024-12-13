import React, { useState } from 'react';
import Dashboard from './Dashboard';
import TopExpenses from './TopExpenses';
import RecentTransactions from './RecentTransactions';

function ExpenseTracker() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });
  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem('balance');
    return savedBalance ? parseFloat(savedBalance) : 5000;
  });
  const [spendAmount, setSpendAmount] = useState(() => {
    const savedSpendAmount = localStorage.getItem('spendAmount');
    return savedSpendAmount ? parseFloat(savedSpendAmount) : 0;
  });

  // You can also get aggregated data if needed
  const getAggregatedData = () => {
    const categories = ['Food', 'Entertainment', 'Travel'];
    const aggregatedData = categories.map((category) => {
      const total = expenses
        .filter((expense) => expense.category === category)
        .reduce((sum, expense) => sum + expense.price, 0);
      return { name: category, value: total };
    });
    return aggregatedData;
  };

  return (
    <div>
      <div>
        <Dashboard setExpenses={setExpenses} />
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '60%' }}>
          <RecentTransactions 
            expenses={expenses} 
            setExpenses={setExpenses} 
            setBalance={setBalance} 
            setSpendAmount={setSpendAmount} 
          />
        </div>
        <div style={{ width: '40%' }}>
          <TopExpenses data={getAggregatedData()} />
        </div>
      </div>
    </div>
  );
}

export default ExpenseTracker;
