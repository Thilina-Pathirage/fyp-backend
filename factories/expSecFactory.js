class ExpenseFactory {
    static createExpense({ expTitle, expValue }) {
      return {
        expTitle,
        expValue,
        paidStatus: false // Default value for paid
      };
    }

    static createExpenseSection({ secTitle, expenseList }) {
      return {
        secTitle,
        userEmail,
        expenseList
      };
    }
}

module.exports = ExpenseFactory;
