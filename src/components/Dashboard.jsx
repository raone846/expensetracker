import React, { useState} from 'react';
import Card from './Card';
import Model from './Model';

function Dashboard() {
    const [balance, setBalance] = useState(() => {
        const savedBalance = localStorage.getItem('balance');
        return savedBalance ? parseFloat(savedBalance) : 5000;
    });

    const [spendAmount, setSpendAmount] = useState(() => {
        const savedSpendAmount = localStorage.getItem('spendAmount');
        return savedSpendAmount ? parseFloat(savedSpendAmount) : 0;
    });
    
    const [isIncomeFormVisible, setIsIncomeFormVisible] = useState(false);
    const [isExpenseFormVisible, setIsExpenseFormVisible] = useState(false);

    const [newIncome, setNewIncome] = useState('');
    const [expenseDetails, setExpenseDetails] = useState({
        title: '',
        price: '',
        category: '',
    });

    const handleIncomeFormSubmit = (e) => {
        e.preventDefault();
        const income = parseFloat(newIncome);
        if (!isNaN(income) && income > 0) {
            const updatedBalance = balance + income;
            setBalance(updatedBalance);
            localStorage.setItem('balance', updatedBalance);
            setNewIncome('');
            setIsIncomeFormVisible(false);
        }
    };

    const handleExpenseFormSubmit = (e) => {
        e.preventDefault();
        const expense = parseFloat(expenseDetails.price);
        if (!isNaN(expense) && expense > 0) {
            const updatedSpendAmount = spendAmount + expense;
            const updatedBalance = balance - expense;
            if (updatedBalance >= 0) {
                setSpendAmount(updatedSpendAmount);
                setBalance(updatedBalance);
                localStorage.setItem('spendAmount', updatedSpendAmount);
                localStorage.setItem('balance', updatedBalance);
                setExpenseDetails({ title: '', price: '', category: '' });
                setIsExpenseFormVisible(false);
            } else {
                alert('Insufficient balance to add this expense.');
            }
        }
    };
    
  return (
    <div style={{color:"white", width:"100%", margin:"10px"}}>
        <h2>Expense Tracker</h2>
        <div style={{
            backgroundColor:"#626262", 
            width: "98%", 
            height:"300px", 
            borderRadius:"10px", 
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            alignItems:"center",
            margin: "10px"}}>
            <Card balance={balance} type="Income" onAddIncome={() => setIsIncomeFormVisible(true)}/>
            <Card balance={spendAmount} type="Expenses" onAddIncome={() => setIsExpenseFormVisible(true)}/>
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
  )
}

export default Dashboard