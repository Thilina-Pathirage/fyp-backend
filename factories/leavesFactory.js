class LeavesFactory {
    static createLeave({ startDate, endDate, requestedDate, requestedUserEmail }) {
      return {
        startDate,
        endDate,
        requestedDate,
        requestedUserEmail,
      };
    }
  }
  
  module.exports = LeavesFactory;
  