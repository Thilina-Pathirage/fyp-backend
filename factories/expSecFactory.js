class ExpenseFactory {
  static createExpense({ expTitle, expValue, paidStatus, category }) {
    if (!category) {
      throw new Error('Category is required');
    }
    return {
      expTitle,
      expValue,
      paidStatus: paidStatus || false,
      category,
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
