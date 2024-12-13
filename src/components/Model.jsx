import React from 'react';
import Modal from 'react-modal';
import './Model.css';

Modal.setAppElement('#root'); // Replace '#root' with your app root ID

function Model({
    isIncomeFormVisible,
    setIsIncomeFormVisible,
    isExpenseFormVisible,
    setIsExpenseFormVisible,
    newIncome,
    setNewIncome,
    handleIncomeFormSubmit,
    expenseDetails,
    setExpenseDetails,
    handleExpenseFormSubmit,
}) {
    return (
        <div>
            {/* Income Modal */}
            <Modal
                isOpen={isIncomeFormVisible}
                onRequestClose={() => setIsIncomeFormVisible(false)}
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h2>Add Income</h2>
                <form onSubmit={handleIncomeFormSubmit} className="modal-form" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <input
                        type="text"
                        placeholder="Income Amount"
                        value={newIncome}
                        onChange={(e) => setNewIncome(e.target.value)}
                        required
                        style={{ flex: "1", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                    />
                    <div className="modal-buttons" style={{ display: "flex", gap: "10px" }}>
                        <button type="submit" style={{ backgroundColor: "#F4BB4A", color: "white", padding: "8px 12px", border: "none", borderRadius: "4px" }}>
                            Add Income
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsIncomeFormVisible(false)}
                            style={{ backgroundColor: "#D9D9D9", padding: "8px 12px", border: "none", borderRadius: "4px" }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>

            </Modal>

            {/* Expense Modal */}
            <Modal
                isOpen={isExpenseFormVisible}
                onRequestClose={() => setIsExpenseFormVisible(false)}
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h2>Add Expenses</h2>
                <form onSubmit={handleExpenseFormSubmit} className="modal-form">
                    <div>
                        <input
                            type="text"
                            placeholder="Title"
                            value={expenseDetails.title}
                            onChange={(e) => setExpenseDetails({ ...expenseDetails, title: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Price"
                            value={expenseDetails.price}
                            onChange={(e) => setExpenseDetails({ ...expenseDetails, price: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <select
                            value={expenseDetails.category}
                            onChange={(e) => setExpenseDetails({ ...expenseDetails, category: e.target.value })}
                            required
                        >
                            <option value="" disabled>Select Category</option>
                            <option value="Food">Food</option>
                            <option value="Travel">Travel</option>
                            <option value="Entertainment">Entertainment</option>
                        </select>
                        <input
                            type="date"
                            required
                        />
                    </div>
                    <div className="modal-buttons">
                        <button type="submit" style={{ backgroundColor: "#F4BB4A", color:"white" }}>Add Expense</button>
                        <button
                            type="button"
                            onClick={() => setIsExpenseFormVisible(false)}
                            style={{backgroundColor:"#D9D9D9"}}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default Model;
