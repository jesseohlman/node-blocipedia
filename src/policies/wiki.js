const ApplicationPolicy = require("./application");

module.exports = class WikiPolicy extends ApplicationPolicy {
    update() {
        return this.edit();
    }
}