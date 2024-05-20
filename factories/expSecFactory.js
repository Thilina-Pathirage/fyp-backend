class ExpenseFactory {
  static createExpense({ expTitle, expValue, paidStatus }) {
    return {
      expTitle,
      expValue,
      paidStatus: paidStatus || false,
    };
  }

  static createExpenseSection({ secTitle, userEmail }) {
    const userEmails = [{
      userEmail,
      userRole: 'admin' // Set userRole as 'admin' for the first user
    }];
    return {
      secTitle,
      userEmails,
      expenseList: []
    };
  }

  static createEmail({ userEmail }) {
    return { userEmail };
  }
}

module.exports = ExpenseFactory;
