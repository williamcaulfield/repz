<template>
  <!-- @navigatingTo="onNavigatingTo($event)" -->
  <Page
    class="page"
    actionBarHidden="false"
    backgroundSpanUnderStatusBar="true"
    @loaded="pageLoaded($event)"
  >
    <ActionBar
      @loaded="onActionBarLoaded($event)"
      class="actionBar"
      title="Dashboard"
    >
      <ActionItem
        icon="~/assets/images/ic_menu.png"
        ios.position="left"
        @tap="onToggleDrawerTap()"
      ></ActionItem>
    </ActionBar>
    <GridLayout rows="auto,*,auto" columns="auto">
      <GridLayout
        ref="navTab"
        class="navTab"
        verticalAlignment="top"
        height="50"
        width="100%"
        rows="auto"
        columns="auto,auto"
        ~
        row="0"
      >
        <GridLayout
          class="tabview"
          :class="selectedTabview == 0 ? 'active' : ''"
          @tap="showFollowing"
          col="0"
          width="50%"
        >
          <Label
            :class="selectedTabview == 0 ? 'active' : ''"
            text="Following"
            class="tabviewText"
          ></Label>
        </GridLayout>
        <GridLayout
          class="tabview"
          :class="selectedTabview == 1 ? 'active' : ''"
          @tap="showYou"
          cols="auto"
          col="1"
          width="50%"
        >
          <Label
            :class="selectedTabview == 1 ? 'active' : ''"
            text="You"
            class="tabviewText"
          ></Label>
        </GridLayout>
      </GridLayout>

      <GridLayout v-show="selectedTabview == 0" row="1" width="98%">
        <ListView
          ref="listviewfollow"
          for="workout in workoutRecordSummariesFollowing"
          :key="index"
          backgroundColor="transparent"
        >
          <v-template>
            <workoutRecordSummary
              :workout="workout"
              @clicked="showWorkout(workout)"
            />
          </v-template>
        </ListView>
      </GridLayout>

      <GridLayout v-show="selectedTabview == 1" row="1" width="98%">
        <ListView
          ref="listviewyou"
          for="workout in workoutRecordSummaries"
          :key="index"
          backgroundColor="transparent"
        >
          <v-template>
            <workoutRecordSummary
              :workout="workout"
              @clicked="showWorkout(workout)"
            />
          </v-template>
        </ListView>
      </GridLayout>

      <navBottom row="2"></navBottom>
    </GridLayout>
  </Page>
</template>

<script>
import workoutRecordSummary from "./workoutRecordSummary/workoutRecordSummary";
import workoutRecordDetail from "./workoutRecordDetail/workoutRecordDetail";
import navBottom from "../../components/navBottom";
import navControls from "../../mixins/navControls";

import {
  Http,
  isIOS,
  ApplicationSettings,
  Frame,
  Color,
} from "@nativescript/core";

export default {
  mixins: [navControls],
  components: {
    workoutRecordSummary,
    workoutRecordDetail,
    navBottom,
  },
  computed: {},

  mounted() {
    const userId = ApplicationSettings.getNumber("userId");
    const authToken = ApplicationSettings.getString("userToken");

    Http.request({
      url:
        "https://api.repz.app/user/" +
        userId +
        "/workoutrecorded/workoutrecordsfollowing",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    }).then(
      (response) => {
        this.workoutRecordSummariesFollowing = response.content.toJSON();
        console.log(this.workoutRecordSummariesFollowing);
      },
      (e) => {}
    );

    Http.request({
      url:
        "https://api.repz.app/user/" +
        userId +
        "/workoutrecorded/workoutrecords",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    }).then(
      (response) => {
        this.workoutRecordSummaries = response.content.toJSON();
      },
      (e) => {}
    );
  },
  data() {
    return {
      index: 0,
      lastDelY: 0,
      headerCollapsed: false,
      selectedTab: 0,
      selectedTabview: 0,
      workoutRecordSummariesFollowing: [],

      workoutRecordSummaries: [],

      workoutHistoryFollowing: [],
    };
  },
  methods: {
    async showWorkout(payload) {
      console.log(payload.workoutRecordedID);

      const userId = ApplicationSettings.getNumber("userId");
      const authToken = ApplicationSettings.getString("userToken");

      var tempWorkoutRecorded;

      await Http.request({
        url:
          "https://api.repz.app/user/" +
          userId +
          "/workoutrecorded/" +
          payload.workoutRecordedID +
          "/workoutrecordeddetail",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
      }).then(
        (response) => {
          tempWorkoutRecorded = response.content.toJSON();
          console.log(tempWorkoutRecorded);
        },
        (e) => {}
      );

      this.$navigateTo(workoutRecordDetail, {
        props: {
          workoutRecorded: tempWorkoutRecorded,
        },
        animated: true,
        transition: {
          name: "slideLeft",
          duration: 300,
          curve: "easeIn",
        },
      });
    },
    pageLoaded(args) {
      const page = args.object;
      console.log("onNavigatedTo");
      if (isIOS) {
        const navigationBar = Frame.topmost().ios.controller.navigationBar;

        const gradient = CAGradientLayer.layer();
        const bounds = navigationBar.bounds;
        gradient.frame = bounds;

        gradient.colors = [
          new Color("red").ios.CGColor,
          new Color("hsl(352.5, 100%, 25%)").ios.CGColor,
        ];
        gradient.startPoint = CGPointMake(0, 0);
        gradient.endPoint = CGPointMake(1, 0);
        const size = CGSizeMake(bounds.size.width, bounds.size.height);
        UIGraphicsBeginImageContext(size);
        gradient.renderInContext(UIGraphicsGetCurrentContext());
        const gradientImage = UIGraphicsGetImageFromCurrentImageContext();
        UIGraphicsEndImageContext();

        // doesn't work without this setTimeout
        setTimeout(() => {
          navigationBar.setBackgroundImageForBarMetrics(
            gradientImage,
            UIBarMetrics.de
          );
        });
      }
    },
    onNavigatingTo(args) {
      console.log("onNavigatedTo");
      if (isIOS) {
        const navigationBar = Frame.topmost().ios.controller.navigationBar;
        const gradient = CAGradientLayer.layer();
        const bounds = navigationBar.bounds;
        gradient.frame = bounds;
        gradient.colors = [
          new Color("red").ios.CGColor,
          new Color("hsl(352.5, 100%, 25%)").ios.CGColor,
        ];
        gradient.startPoint = CGPointMake(0, 0);
        gradient.endPoint = CGPointMake(1, 0);
        const size = CGSizeMake(bounds.size.width, bounds.size.height);
        UIGraphicsBeginImageContext(size);
        gradient.renderInContext(UIGraphicsGetCurrentContext());
        const gradientImage = UIGraphicsGetImageFromCurrentImageContext();
        UIGraphicsEndImageContext();
        // doesn't work without this setTimeout
        setTimeout(() => {
          navigationBar.setBackgroundImageForBarMetrics(
            gradientImage,
            UIBarMetrics.de
          );
        });
      }
    },

    onActionBarLoaded(args) {
      // if (isIOS) {
      //   const navigationBar = Frame.topmost().ios.controller.navigationBar;
      //   const gradient = CAGradientLayer.layer();
      //   const bounds = navigationBar.bounds;
      //   gradient.frame = bounds;
      //   gradient.colors = [
      //     new Color("red").ios.CGColor,
      //     new Color("hsl(352.5, 100%, 25%)").ios.CGColor
      //   ];
      //   gradient.startPoint = CGPointMake(0, 0);
      //   gradient.endPoint = CGPointMake(1, 0);
      //   const size = CGSizeMake(bounds.size.width, bounds.size.height);
      //   UIGraphicsBeginImageContext(size);
      //   gradient.renderInContext(UIGraphicsGetCurrentContext());
      //   const gradientImage = UIGraphicsGetImageFromCurrentImageContext();
      //   UIGraphicsEndImageContext();
      //   // doesn't work without this setTimeout
      //   setTimeout(() => {
      //     navigationBar.setBackgroundImageForBarMetrics(
      //       gradientImage,
      //       UIBarMetrics.de
      //     );
      //   });
      // }
    },

    showFollowing() {
      this.selectedTabview = 0;
    },
    showYou() {
      this.selectedTabview = 1;
    },
    home() {
      this.selectedTab = 0;
    },
  },
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../../_app-variables.scss";
.page {
  align-items: center;
  flex-direction: column;

  background-image: linear-gradient(to bottom, rgb(77, 77, 77), black);
}
.drawerBackground {
  background-color: red;
}

.drawer-item {
  margin-top: 10;
  margin-bottom: 5;
  margin-left: 20;
  font-size: 20;
  color: #cccccc;
  font-weight: bold;
  align-content: left;
}

.logo {
  margin-top: 20;
  margin-bottom: 50;
  margin-left: 15;
  font-weight: bold;
  align-content: left;
}
.status-title {
  margin-top: 10;
  margin-bottom: 20;
  margin-left: 15;
  font-size: 24;
  color: #ffffff;
  font-weight: bold;
  align-content: left;
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
  align-content: right;
}

.repzLogo {
  color: #ffffff;
  font-size: 24;
  margin-left: 15;
  margin-top: 8;
  align-content: left;
  vertical-align: center;
  font-weight: bold;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.tabview.active {
  border-bottom-color: red;
  border-bottom-width: 3;
  margin: 0;
  height: 30;
}

.tabviewText {
  margin-top: 10;
  margin-bottom: 5;
  font-size: 16;
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

button {
  font-size: 15;
  align-content: center;
}

.drawerContentText {
  font-size: 13;
  padding: 10;
}

.drawerContentButton {
  margin: 10;
  align-content: left;
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
  background-color: white;
}
</style>
