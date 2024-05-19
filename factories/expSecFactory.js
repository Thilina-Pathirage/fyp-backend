class ExpenseFactory {
    static createExpense({ expTitle, expValue, paidStatus }) {
      return {
        expTitle,
        expValue,
        paidStatus,
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
