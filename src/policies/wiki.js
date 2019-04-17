const ApplicationPolicy = require("./application");

module.exports = class WikiPolicy extends ApplicationPolicy {
    update() {
        return this.edit();
    }

    private() {
        return this._isAdmin() || (this._isPremium() && this._isOwner());
    }
}