// UserFactory.js

// This is a simplified example to create user objects based on different roles.
class UserFactory {
    static createUser({ firstName, lastName, email, userRole, position, mentalHealthStatus, workStatus }) {
      return {
        firstName,
        lastName,
        email,
        userRole,
        position,
        mentalHealthStatus,
        workStatus,
      };
    }
  }
  
  module.exports = UserFactory;
  