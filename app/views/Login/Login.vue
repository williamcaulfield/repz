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
import Login from "./Login.js";

export default {
  mixins: [Login],
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
