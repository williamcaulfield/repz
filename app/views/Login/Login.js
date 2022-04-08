import routes from "../../routes";
import { Http, ApplicationSettings } from "@nativescript/core";
var firebase = require("@nativescript/firebase").firebase;

var validator = require("email-validator");
var newUser = false;

var actionCodeSettings = {
  url: "https://www.example.com/?email=user@example.com",
  iOS: {
    bundleId: "com.example.ios",
  },
  android: {
    packageName: "com.example.android",
    installApp: true,
    minimumVersion: "12",
  },
  handleCodeInApp: true,
};

const userService = {
  async register(user) {
    return await firebase.createUser({
      email: user.email,
      password: user.password,
    });
  },
  // async registerNewRepzUser() {
  //   return await Http.re
  // },

  async login(user) {
    return await firebase.login({
      type: firebase.LoginType.PASSWORD,
      passwordOptions: {
        email: user.email,
        password: user.password,
      },
    });
  },
  async resetPassword(email) {
    return await firebase.sendPasswordResetEmail(email);
  },

  async emailVerified() {
    return await firebase.getCurrentUser().emailVerified;
  },

  async getCurrentUser() {
    return await firebase.getCurrentUser().then(function (currentuser) {
      return currentuser.uid;
    });
  },

  async getAuthToken() {
    firebase
      .getAuthToken({
        // default false, not recommended to set to true by Firebase but exposed for {N} devs nonetheless :)
        forceRefresh: false,
      })
      .then(
        async function (result) {
          // for both platforms
          var authToken = result.token;

          var fbUserId = result.claims.user_id;
          var email = result.claims.email;
          ApplicationSettings.setString("fbUserId", fbUserId);
          ApplicationSettings.setString("userToken", authToken);
          console.log("Firebase UserId retrieved: " + fbUserId);
          console.log("Auth token retrieved: " + authToken);
          if (newUser) {
            return await userService.registerNewRepzUser(
              fbUserId,
              email,
              authToken
            );
          } else {
            return await userService.getRepzUserId(fbUserId, authToken);
          }
          //ApplicationSettings.setString("userId", userId);
          // console.log(
          //   "App Settings set userToken: " + userService.getAuthToken()
          // );
        },
        function (errorMessage) {
          console.log("Auth result retrieval error: " + errorMessage);
        }
      );
  },

  async registerNewRepzUser(newFbUserId, newEmail, authToken) {
    //var userToRegister = { fbUserId: newFbUserId, email: newEmail };

    var userToRegister = {
      fbUserID: newFbUserId,
      userName: "",
      email: newEmail,
      firstName: "",
      lastName: "",
      userWeight: 0,
      userHeight: 0,
      dateOfBirth: "1900-01-01",
    };

    return await Http.request({
      url: "https://api.repz.app/user",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
      content: JSON.stringify(userToRegister),
    }).then(
      (response) => {
        var newRepzUser = response.content.toJSON();
        var userId = newRepzUser.userID;
        console.log("New User Registered on Repz" + userId);
        ApplicationSettings.setNumber("userId", userId);
      },
      (e) => {
        console.log("could not register new user on Repz");
      }
    );
  },

  async getRepzUserId(fbUserId, authToken) {


    var fbUser = '{'
       +'"fbUserID": "' + fbUserId
       +'"}';

    // var id = new string(fbUserId);
//     var fbUser = {
//   "fbUserID": id }
    try {
      let userId = await Http.request({
        url: "https://api.repz.app/user/repzuser",
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8" ,
          "Authorization": "Bearer " + authToken,
        },
        // body: JSON.stringify(fbUser),
                content: JSON.stringify({
          fbUserID: fbUserId
        }),
      }).then(
        (response) => {
          console.log("Retrieved Repz UserId " + response);
          var user = response.content.toJSON();
          ApplicationSettings.setNumber("userId", user.userID);
          console.log("Retrieved Repz UserId " + user.userID);

          return userId;

          // ApplicationSettings.setString("userId", userId);
        },
        (e) => {
          console.log("could not retrieve Repz userid");
        }
      );
    } catch (e) {
      // just in case if an error thrown for whatever reason, can be handled / logged here
      console.log(error);
    }

    // return await Http
    //   .request({
    //     url: "https://api.repz.app/user/" + fbUserId + "/repzuser",

    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: "Bearer " + authToken,
    //     },
    //   })
    //   .then(
    //     (response) => {
    //       var user = response.content.toJSON();
    //       userId = user.userID;
    //       console.log("Retrieved Repz UserId " + userId);
    //       ApplicationSettings.setString("userId", userId);
    //     },
    //     (e) => {
    //       console.log("could not retrieve Repz userid");
    //     }
    //   );
  },
};

export default {

  methods: {
    toggleForm() {
      this.isLoggingIn = !this.isLoggingIn;
    },

    submit() {
      if (!this.user.email || !this.user.password) {
        this.alert("Please provide both an email address and password.");
        return;
      }

      this.processing = true;   
      if (this.isLoggingIn) {
        this.login();
      } else {
        this.register();
      }
    },

    login() {
      userService

        .login(this.user)
        .then(() => {
          if (!userService.emailVerified()) {
            firebase.sendEmailVerification().then(
              function () {
                console.log("Email verification sent");
              },
              function (error) {
                console.log("Error sending email verification: " + error);
              }
            );
          }
          userService.getAuthToken();
          this.processing = false;
          this.$navigateTo(routes.app, {
            //frame: "mainContent",
            clearHistory: true,

            animated: true,
            // Set up a transition property on page navigation.
            transition: {
              name: "slideBottom",
              duration: 600,
              curve: "easeOut",
            },
          });
        })
        .catch(() => {
          this.processing = false;
          this.alert("Unfortunately we could not find your account.");
        });
    },

    async register() {
      if (!validator.validate(this.user.email)) {
        this.alert("Please enter a valid email address.");
        this.processing = false;
        return;
      }

      if (this.user.password != this.user.confirmPassword) {
        this.alert("Your passwords do not match.");
        this.processing = false;
        return;
      }

      if (this.user.password.length < 6) {
        this.alert("Your password must at least 6 characters.");
        this.processing = false;
        return;
      }

      userService
        .register(this.user)
        .then(() => {
          firebase.sendEmailVerification().then(
            function () {
              console.log("Email verification sent");
            },
            function (error) {
              console.log("Error sending email verification: " + error);
            }
          );
          this.processing = false;
          this.alert("Your account was successfully created.");
          newUser = true;
          //this.registerNewRepzUser();
          this.isLoggingIn = true;
        })
        .catch(() => {
          this.processing = false;
          this.alert("Unfortunately we were unable to create your account.");
        });
    },

    forgotPassword() {
      prompt({
        title: "Forgot Password",
        message:
          "Enter the email address you used to register for repz to reset your password.",
        inputType: "email",
        defaultText: "",
        okButtonText: "Ok",
        cancelButtonText: "Cancel",
      }).then((data) => {
        if (data.result) {
          userService
            .resetPassword(data.text.trim())
            .then(() => {
              this.alert(
                "Your password was successfully reset. Please check your email for instructions on choosing a new password."
              );
            })
            .catch(() => {
              this.alert(
                "Unfortunately, an error occurred resetting your password."
              );
            });
        }
      });
    },

    focusPassword() {
      this.$refs.password.nativeView.focus();
    },
    focusConfirmPassword() {
      if (!this.isLoggingIn) {
        this.$refs.confirmPassword.nativeView.focus();
      }
    },

    alert(message) {
      return alert({
        title: "repz",
        okButtonText: "OK",
        message: message,
      });
    },
  },
};