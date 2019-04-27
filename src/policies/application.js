module.exports = class ApplicationPolicy {

    constructor(user, record, collab) {
        this.user = user;
        this.record = record;
        this.collab = collab;
    }

    _isOwner() {
        return this.record && ((this.record.userId == this.user.id)   || (this.collab.userId == this.user.id));
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
        return this.edit() && (this.record.userId == this.user.id);
    }
}