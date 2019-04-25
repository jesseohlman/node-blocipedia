'use strict';
module.exports = (sequelize, DataTypes) => {
  const collabUsers = sequelize.define('collabUsers', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      }
    },
    collaboratorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Collaborators",
        key: "id"
      }
    }
  }, {});
  collabUsers.associate = function(models) {
    // associations can be defined here
  };
  return collabUsers;
};