import React from 'react';

function RecentTransactions({ expenses, setExpenses, setBalance, setSpendAmount }) {
  const handleDelete = (expenseToDelete) => {
    // Remove the expense from the list
    const updatedExpenses = expenses.filter(expense => expense !== expenseToDelete);

    // Update the localStorage and state
    setExpenses(updatedExpenses);
    setBalance((prevBalance) => prevBalance + expenseToDelete.price);  // Add back to balance (income)
    setSpendAmount((prevSpendAmount) => prevSpendAmount - expenseToDelete.price);  // Subtract from spend amount

    // Update the expenses in localStorage
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    localStorage.setItem('balance', (parseFloat(localStorage.getItem('balance')) + expenseToDelete.price).toString());
    localStorage.setItem('spendAmount', (parseFloat(localStorage.getItem('spendAmount')) - expenseToDelete.price).toString());
  };

  const handleEdit = (expenseToEdit) => {
    // For now, we'll just log the expense to edit
    console.log('Editing expense:', expenseToEdit);
    // You can implement the logic to open an edit form here
  };

  return (
    <div>
      <h3>Recent Transactions</h3>
      <table style={{ width: '100%', color: 'white' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length > 0 ? (
            expenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.title}</td>
                <td>{expense.price}</td>
                <td>{expense.category}</td>
                <td>
                  <button onClick={() => handleEdit(expense)}>Edit</button>
                  <button onClick={() => handleDelete(expense)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No recent transactions.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RecentTransactions;
