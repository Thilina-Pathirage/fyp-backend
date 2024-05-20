class ActionLogFactory {
    static createActionLog({ sectionId, action, userEmail }) {
      return {
        sectionId,
        action,
        userEmail,
      };
    }
  }
  
  module.exports = ActionLogFactory;
  