<template>
  <Page backgroundColor="black" actionBarHidden="true">
    <FlexboxLayout class="page">
      <StackLayout class="form">
        <Image
          class="logo"
          src="~/assets/images/repzLogo_red_textOut.png"
        ></Image>

        <GridLayout rows="auto, auto, auto">
          <StackLayout row="0" class="input-field">
            <TextField
              class="input"
              hint="Email"
              :isEnabled="!processing"
              keyboardType="email"
              autocorrect="false"
              autocapitalizationType="none"
              v-model="user.email"
              returnKeyType="next"
              @returnPress="focusPassword"
            ></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <StackLayout row="1" class="input-field">
            <TextField
              class="input"
              ref="password"
              :isEnabled="!processing"
              hint="Password"
              secure="true"
              v-model="user.password"
              :returnKeyType="isLoggingIn ? 'done' : 'next'"
              @returnPress="focusConfirmPassword"
            ></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <StackLayout row="2" v-show="!isLoggingIn" class="input-field">
            <TextField
              class="input"
              ref="confirmPassword"
              :isEnabled="!processing"
              hint="Confirm password"
              secure="true"
              v-model="user.confirmPassword"
              returnKeyType="done"
            ></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <ActivityIndicator rowspan="3" :busy="processing"></ActivityIndicator>
        </GridLayout>

        <Button
          :text="isLoggingIn ? 'Log In' : 'Sign Up'"
          :isEnabled="!processing"
          @tap="submit"
          class="btn-primary"
        ></Button>
        <Label
          *v-show="isLoggingIn"
          text="Forgot your password?"
          class="login-label"
          @tap="forgotPassword()"
        ></Label>
      </StackLayout>

      <Label class="login-label sign-up-label" @tap="toggleForm">
        <FormattedString>
          <Span
            :text="isLoggingIn ? 'Don’t have an account? ' : 'Back to Login'"
          ></Span>
          <Span :text="isLoggingIn ? 'Sign up' : ''" class="bold"></Span>
        </FormattedString>
      </Label>
    </FlexboxLayout>
  </Page>
</template>

<script>
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
    try {
      let userId = await Http.request({
        url: "https://api.repz.app/user/" + fbUserId + "/repzuser",

        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
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
          ApplicationSettings.setNumber("userId", 1);
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
  data() {
    return {
      isLoggingIn: true,
      processing: false,
      user: {
        email: "williamcaulfield@hotmail.com",
        password: "",
        confirmPassword: "",
      },
    };
  },
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
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../../app-variables";
// End custom common variables

// Custom styles
.page {
  align-items: center;
  flex-direction: column;
  background-color: $background-color;
  background-image: linear-gradient(
    to bottom,
    rgb(32, 32, 32),
    $background-color
  );
}

.form {
  margin-left: 30;
  margin-right: 30;
  flex-grow: 2;
  vertical-align: middle;
}

.logo {
  margin-bottom: 80;
  height: 170;
  font-weight: bold;
}

.header {
  text-align: center;
  font-size: 25;
  font-weight: 600;
  margin-bottom: 70;
  text-align: center;
  color: #ff0000;
}

.input-field {
  margin-bottom: 25;
}

.input {
  font-size: 18;
  color: #a8a8a8;
  // placeholder-color: #3e3e3e;
}

.input:disabled {
  background-color: white;
  opacity: 0.5;
}

.login-label {
  text-align: center;
  color: #a8a8a8;
  font-size: 16;
  margin-top: 1%;
}

.sign-up-label {
  margin-bottom: 20;
  color: #ffffff;
}

.bold {
  color: #ff0000;
}

.hr-light {
  border-bottom-color: $secondary-color;
  border-bottom-width: $border-width;
}
</style>
