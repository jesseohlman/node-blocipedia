'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "standard"
    },
    wikiId: {
      type: DataTypes.INTEGER
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Wiki, {
      foreignKey: "userId",
      as: "wikis"
    });

    User.belongsToMany(models.Collaborator, {
      through: "collabUsers",
      foreignKey: "userId",
      as: "collaborators"
    });

    User.prototype.isCollaborator = function(){
      if(!this.collaborators) return false;

      return true;
    }
  };
  return User;
};