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

      <!-- <GridLayout v-show="selectedTabview == 0" row="1" width="98%"> -->
      <!-- <ListView
          :v-if="dataReady"
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
        </ListView> -->
      <GridLayout row="1" width="100%" v-show="selectedTabview == 0">
        <ScrollView>
          <StackLayout :v-if="dataReady" width="100%">
            <workoutRecordSummary
              :v-if="dataReady"
              ref="listviewfollow"
              :workout="workout"
              v-for="(workout, index) in getWorkoutRecordSummariesFollowing"
              v-bind:key="index"
              @itemTap="showWorkout(workout)"
            />
          </StackLayout>
          <!-- </GridLayout> -->

          <!-- <GridLayout v-show="selectedTabview == 1" row="1" width="98%"> -->
          <!-- <ListView
          :v-if="dataReady"
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
        </ListView> -->
        </ScrollView>
      </GridLayout>

      <GridLayout row="1" width="100%" v-show="selectedTabview == 1">
        <ScrollView>
          <StackLayout
            :v-if="dataReady"
            v-show="selectedTabview == 1"
            width="100%"
          >
            <workoutRecordSummary
              :v-if="dataReady"
              ref="listviewfollow"
              :workout="workout"
              v-for="(workout, index) in getWorkoutRecordSummaries"
              v-bind:key="index"
              @itemTap="showWorkout(workout)"
            />
          </StackLayout>
          <!-- </GridLayout> -->
        </ScrollView>
      </GridLayout>
      <navBottom row="2"></navBottom>
    </GridLayout>
  </Page>
</template>

<script>
import workoutRecordSummary from "./workoutRecordSummary/workoutRecordSummary";
import workoutRecordDetail from "./workoutRecordDetail/workoutRecordDetail";
import navBottom from "../../components/navBottom";

import Dashboard from "./Dashboard.js";

// import {
//   Http,
//   isIOS,
//   ApplicationSettings,
//   Frame,
//   Color,
// } from "@nativescript/core";

export default {
  mixins: [Dashboard],
  components: {
    workoutRecordSummary,
    workoutRecordDetail,
    navBottom,
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
