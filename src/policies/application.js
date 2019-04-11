module.exports = class ApplicationPolicy {
    constructor(user, record){
        this.user = user;
        this.record = record;
    }

    _isOwner() {
        return this.record && (this.record.userId === this.user.id);
    }

    _isAdmin() {
        return this.user && this.user.role == "admin";
    }

    new() {
        return !!this.user;
    }

    create() {
        return this.new();
    }

    show(){
        return true
    }

    destroy() {
        return this.record && (this._isAdmin() || this._isOwner());
    }

    edit() {
        return this.destroy();
    }
}