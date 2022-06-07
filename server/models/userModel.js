module.exports = class userModel {
    username;
    //name;
    //surname;
    user_id;
    roles;
    is_banned;

    constructor(user) {
        this.username = user.username;
        //this.name = user.name
        //this.surname = user.surname
        this.user_id = user.user_id;
        this.roles = user.roles
        this.is_banned = user.is_banned
    }
}
