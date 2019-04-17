module.exports = class ApplicationPolicy {

    constructor(user, record) {
        this.user = user;
        this.record = record;
    }

    _isOwner() {
        return this.record && (this.record.userId == this.user.id);
    }

    _isAdmin() {
        return this.user && this.user.role == "admin";
    }

    _isPremium() {
        return this.user && this.user.role === "premium";
    }

    new() {
        return !!this.user;
    }

    create() {
        return this.new();
    }

    show() {
        return true;
    }

    edit(){
        return this.new() &&
        this.record && (this._isOwner() || this._isAdmin());
    }

    destroy(){
        return this.edit();
    }
}