import React from 'react';

function RecentTransactions({ expenses, setExpenses, setBalance, setSpendAmount, openModal, setEditExpense }) {
  const handleDelete = (expenseToDelete) => {
    // Remove the expense from the list
    const updatedExpenses = expenses.filter(expense => expense !== expenseToDelete);

    // Update the state for expenses, balance, and spendAmount
    setExpenses(updatedExpenses);
    setBalance((prevBalance) => prevBalance + expenseToDelete.price); // Add back to balance (income)
    setSpendAmount((prevSpendAmount) => prevSpendAmount - expenseToDelete.price); // Subtract from spend amount

    // Update the expenses in localStorage
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    localStorage.setItem('balance', (parseFloat(localStorage.getItem('balance')) + expenseToDelete.price).toString());
    localStorage.setItem('spendAmount', (parseFloat(localStorage.getItem('spendAmount')) - expenseToDelete.price).toString());
  };

  const handleEdit = (expenseToEdit) => {
    // Open the modal and set the expense to be edited
    setEditExpense(expenseToEdit);  // Set the expense being edited
    openModal(true);  // Open the modal to edit
  };

  return (
    <div style={{ color: "white", width: "100%", margin: "10px" }}>
      <h2>Recent Transactions</h2>
      <div style={{ backgroundColor: "white", color: "black", borderRadius: "10px" }}>
        <table style={{ width: '100%', tableLayout: 'auto' }}>
          <tbody>
            {expenses.length > 0 ? (
              expenses.map((expense, index) => (
                <tr key={index}>
                  <td style={{ width: '25%' }}>{expense.title}</td>
                  <td style={{ width: '25%' }}>{expense.category}</td>
                  <td style={{ width: '25%' }}>{expense.price}</td>
                  <td>
                    <button onClick={() => handleDelete(expense)}>Delete</button>
                    <button onClick={() => handleEdit(expense)}>Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentTransactions;
