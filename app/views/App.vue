<template>
  <Page
    backgroundColor="black"
    actionBarHidden="true"
    backgroundSpanUnderStatusBar="true"
  >
    <ActionBar backgroundColor="transparent" />
    <RadSideDrawer
      ref="drawer"
      drawerLocation="Left"
      drawerContentSize="160"
      :gesturesEnabled="gesturesEnabled"
      @drawerClosed="onDrawerClosed"
    >
      <StackLayout
        ~drawerContent
        class="drawerBackground"
        backgroundColor="red"
      >
        <Image
          class="logo"
          src="~/assets/images/repzLogo_white_noframe_textOut.png"
          height="100"
          marginTop="20"
        />
        <Label
          class="drawer-item"
          text="Profile"
          @tap="navigateToProfile"
          marginTop="50"
          marginLeft="30"
        />
        <Label
          class="drawer-item"
          text="Settings"
          @tap="navigateToSettings"
          marginLeft="30"
        />
        <Label
          class="drawer-item"
          text="Home"
          @tap="navigateToDashboard"
          marginLeft="30"
        />
      </StackLayout>
      <Frame ~mainContent id="mainContent">
        <Dashboard />
      </Frame>
    </RadSideDrawer>
  </Page>
</template>
<script>
import Dashboard from "./Dashboard/Dashboard";
import navControls from "../mixins/navControls";

export default {
  mixins: [navControls],
  components: {
    Dashboard,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="scss">
@import "../_app-variables.scss";
.actionBar {
  background-color: red;
  color: white;
  font-weight: bold;
  font-size: 18;
}
.page {
  align-items: center;
  flex-direction: column;
  background-color: black;
}
.drawerBackground {
  background-color: red;
  background-image: linear-gradient(to top, red, black);
}

.drawer-item {
  margin-top: 10;
  margin-bottom: 5;
  margin-left: 20;
  font-size: 20;
  color: #ffffff;
  font-weight: bold;
  text-align: left;
}

.logo {
  margin-top: 20;
  margin-bottom: 50;

  font-weight: bold;
  margin: auto;
}

.status-title {
  margin-top: 10;
  margin-bottom: 20;
  margin-left: 15;
  font-size: 24;
  color: #ffffff;
  font-weight: bold;
  text-align: left;
}
.status-profile {
  border-width: 1;
  border-color: #ffffff;
  background-color: #f1ebeb;
  border-radius: 50%;
  margin-top: -10;
  margin-right: 35;
  width: 40;
  height: 40;
  text-align: right;
}
.pageBackground {
  background-color: black;
  background-image: linear-gradient(to bottom, rgb(32, 32, 32), black);
}
.repzLogo {
  color: #ffffff;
  font-size: 24;
  margin-left: 15;
  margin-top: 8;
  text-align: left;
  vertical-align: center;
  font-weight: bold;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.tabview.active {
  border-bottom-color: black;
  border-bottom-width: 3;
  margin: 0;
  height: 30;
}

.tabviewText {
  margin-top: 10;
  margin-bottom: 5;
  font-size: 15;
  color: #d8d2d2;
  text-align: center;
}

.tabviewText.active {
  margin-top: 0;
  margin-bottom: 5;
  font-weight: bold;

  vertical-align: center;
}

.navTab {
  background-color: red;
}

button {
  font-size: 15;
  text-align: center;
}

.drawerContentText {
  font-size: 13;
  padding: 10;
}

.drawerContentButton {
  margin: 10;
  text-align: left;
}

.sideStackLayout {
  background-color: gray;
}

.sideTitleStackLayout {
  height: 56;
  text-align: center;
  vertical-align: center;
}

.sideLabel {
  padding: 10;
}

.sideLightGrayLabel {
  background-color: lightgray;
}
</style>
