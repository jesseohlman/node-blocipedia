'use strict';
module.exports = (sequelize, DataTypes) => {
  const Collaborator = sequelize.define('Collaborator', {
    wikiId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Collaborator.associate = function(models) {
    // associations can be defined here
    Collaborator.belongsToMany(models.User,{
      through: "collabUsers",
      foreignKey: "collaboratorId",
      as: "users"
    });

    Collaborator.belongsTo(models.Wiki, {
      foreignKey: "wikiId",
      onDelete: "CASCADE"
    });

    Collaborator.prototype.getUsers = function(){
      if(!this.users) return false;

      return this.users;
    };

    Collaborator.prototype.checkUser = function(userId){
      if(!this.users) return false;

      var userCheck = this.users.filter((user) => user.id === userId);
      if(userCheck[0]){
        return true;
      } else {
        return false;
      }
    };

  };
  return Collaborator;
};