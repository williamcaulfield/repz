export default class BackendService {

    isLoggedIn() {
        return false; //!!Kinvey.User.getActiveUser();
    }

    login(user) {
        if (user.email & user.password) {
            return true;
        } else {
            return false;
        };


        //return Kinvey.User.login(user.email, user.password);
    }

    logout() {
        return true //Kinvey.User.logout();
    }

    register(user) {
        if (user.email & user.password) {
            return true;
        } else {
            return false;
        };
        //return Kinvey.User.signup({
        //username: user.email,
        //password: user.password
        //}
    }
}
