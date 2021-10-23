<template>
  <Page actionBarHidden="true" class="page">
    <ScrollView orientation="vertical">
      <StackLayout class="main">
        <Label
          text="< Back"
          @tap="close"
          class="text -primary -bold -medium -left"
          marginLeft="10"
          horizontalAlignment="left"
        />
        <Gridlayout rows="auto,auto,auto,*" columns="*">
          <GridLayout
            row="0"
            col="0"
            rows="auto,auto,auto"
            columns="*"
            horizontalAlignment="center"
          >
            <Image
              horizontalAlignment="center"
              stretch="aspectFill"
              col="0"
              row="0"
              class="profilePic"
              :src="userProfile.profilePicture"
              marginTop="0"
            />
            <Label
              col="0"
              row="1"
              :text="userProfile.userName"
              class="text -primary -bold -xlarge"
              textWrap="true"
              margin="0"
              marginTop="10"
            />
            <Label
              col="0"
              row="2"
              class="text -default -bold -small"
              :text="user.city + ' ,' + user.country"
              textWrap="true"
              margin="0"
            />
          </GridLayout>
          <GridLayout
            row="1"
            col="0"
            rows="auto,auto"
            columns="auto,auto,auto"
            horizontalAlignment="center"
            margin="20"
          >
            <Label
              col="0"
              row="0"
              text="Workouts"
              class="text -secondary -bold -medium"
              textWrap="true"
              margin="0"
              marginRight="30"
            />
            <Label
              col="1"
              row="0"
              text="Followers"
              class="text -secondary -bold -medium"
              textWrap="true"
              margin="0"
            />
            <Label
              col="2"
              row="0"
              class="text -secondary -bold -medium"
              text="Following"
              textWrap="true"
              margin="0"
              marginLeft="30"
            />
            <Label
              col="0"
              row="1"
              :text="userProfile.followerCount"
              class="text -primary -bold -xlarge"
              textWrap="true"
              marginRight="30"
            />
            <Label
              col="1"
              row="1"
              :text="userProfile.followingCount"
              class="text -primary -bold -xlarge"
              textWrap="true"
              margin="0"
            />
            <Label
              col="2"
              row="1"
              class="text -primary -bold -xlarge"
              :text="userProfile.workoutsCount"
              textWrap="true"
              marginLeft="30"
            />
          </GridLayout>

          <Textview
            row="2"
            col="0"
            editable="false"
            class="profile_text"
            textWrap="true"
            :text="userProfile.profileText"
            marginBottom="30"
            width="92%"
            horizontalAlignment="center"
          />

          <ListView
            row="3"
            col="0"
            ref="listview"
            for="workout in workoutHistoryUser"
            :key="index"
            backgroundColor="transparent"
            height="1200"
            width="95%"
          >
            <v-template>
              <workoutRecordSummary :workout="workout" />
            </v-template>
          </ListView>
        </Gridlayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>
<script>
import workoutRecordSummary from "../../Dashboard/workoutRecordSummary/workoutRecordSummary";
import workoutRecordDetail from "../../Dashboard/workoutRecordDetail/workoutRecordDetail";

import navControls from "../../../mixins/navControls";
import navBottom from "../../../components/navBottom";

import {
  Http,
  Frame,
  Color,
  ApplicationSettings,
  isIOS,
} from "@nativescript/core";

export default {
  props: ["user"],

  mixins: [navControls],
  components: {
    workoutRecordSummary,
    workoutRecordDetail,
    navBottom,
  },

  mounted() {
    const userIdProfile = this.user.userId;
    const userId = ApplicationSettings.getNumber("userId");
    const authToken = ApplicationSettings.getString("userToken");

    Http.request({
      url:
        "https://api.repz.app/user/" +
        userIdProfile +
        "/workoutrecorded/workoutrecords",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    }).then(
      (response) => {
        this.workoutHistoryUser = response.content.toJSON();
      },
      (e) => {}
    );

    Http.request({
      url:
        "https://api.repz.app/user/" + userId + "/userprofile/" + userIdProfile,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    }).then(
      (response) => {
        this.userProfile = response.content.toJSON();
      },
      (e) => {}
    );
  },
  methods: {
    close() {
      this.$navigateBack();
    },
  },
  data() {
    return {
      userProfile: {},
      workoutHistoryUser: [],
    };
  },
};
</script>
<style scoped lang="scss">
@import "../../../_app-variables.scss";
TextView {
  background-color: transparent;
}

.main {
  font-size: 14;
  font-weight: bold;
  color: white;
}
.profile_text {
  font-size: 14;
  font-weight: bold;
  color: white;
}
.page {
  background-color: black;
  background-image: linear-gradient(to bottom, rgb(32, 32, 32), black);
}

.profilePic {
  border-width: 1.5;
  border-color: rgb(151, 151, 151);
  border-radius: 200;
  width: 200;
}
</style>
