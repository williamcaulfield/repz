<template>
  <ActionBar backgroundColor="red">
    <GridLayout width="100%" columns="auto, *" class="navStatusBar">
      <Label
        text="repz"
        class="status-title"
        @tap="onToggleDrawerTap()"
        col="0"
      />
      <Image
        horizontalAlignment="right"
        stretch="aspectFill"
        height="10"
        col="3"
        row="0"
        class="status-profile"
        src="~/assets/images/me.jpg"
        @tap="navigateToProfile"
      />
    </GridLayout>
  </ActionBar>
</template>

<script>
import app from "../../../views/App";
import navControls from "../../../mixins/navControls";
export default {
  mixins: [navControls],
  components: {
    app,
  },
};
</script>
<style scoped lang="scss">
.page {
  align-items: center;
  flex-direction: column;
  background-color: black;
}
.drawerBackground {
  background-color: red;
  //background-image: linear-gradient(to bottom, rgb(32, 32, 32), black);
}

.drawer-item {
  margin-top: 10;
  margin-bottom: 5;
  margin-left: 20;
  font-size: 20;
  color: #cccccc;
  font-weight: bold;
  text-align: left;
}

.logo {
  margin-top: 20;
  margin-bottom: 50;
  margin-left: 15;
  font-weight: bold;
  text-align: left;
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
  color: white;
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
