class ComplaintsFactory {
    static createComplaint({ title, description, createdUserEmail }) {
      return {
        title,
        description,
        createdUserEmail,
      };
    }
  }
  
  module.exports = ComplaintsFactory;
  