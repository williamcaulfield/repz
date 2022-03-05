<template>
  <Page actionBarHidden="true" class="page">
    <ScrollView>
      <StackLayout class="main">
        <Label
          text="< Back"
          @tap="close"
          class="text -primary -bold -medium -left"
          marginLeft="10"
          horizontalAlignment="left"
        />
        <wrHeader
          width="95%"
          marginTop="5"
          :workoutPlanName="workoutRecorded.workoutPlanName"
          :profilePicture="workoutRecorded.profilePicture"
          :userName="workoutRecorded.userName"
          :energyBurned="workoutRecorded.energyBurned"
          :currentDuration="workoutRecorded.currentDuration"
          :timeEnd="workoutRecorded.timeEnd"
        />
        <workoutRecordPhotos
          v-show="workoutRecorded.includesImages == true"
          :images="workoutRecorded.workoutImages"
          width="100%"
          marginTop="10"
        />
        <wrStatistics margin="20" :workoutRecorded="workoutRecorded" />
        <!-- <wrSummaryMusclesExercises
          marginTop="20"
          :breakdownMuscleZones="
            workoutRecorded.workoutRecordedAnalysis.breakdownMuscleZones
          "
          :breakdownExercises="
            workoutRecorded.workoutRecordedAnalysis.breakdownExercises
          "
        /> -->
        <ContentView class="wrsummarymusclesexercises__container">
          <GridLayout
            class="wrsummarymusclesexercises__grid"
            row="0"
            col="0"
            rows="auto"
            columns="auto,12,auto"
          >
            <wrSummaryMuscles
              row="0"
              col="0"
              :breakdownMuscleZones="
                workoutRecorded.workoutRecordedAnalysis.breakdownMuscleZones
              "
            />
            <wrSummaryExercises
              row="0"
              col="2"
              :breakdownExercises="
                workoutRecorded.workoutRecordedAnalysis.breakdownExercises
              "
            />
          </GridLayout>
        </ContentView>
        <wrGraphExercise
          margin="20"
          :workoutRecordedAnalysis="workoutRecorded.workoutRecordedAnalysis"
        />
        <Label
          v-show="(includesAchievements = true)"
          text="Achievements"
          class="text -default -bold -large"
          horizontalAlignment="left"
          verticalAlignment="top"
          marginTop="0"
          marginBottom="10"
          marginLeft="20"
        />
        <ListView
          v-show="(includesAchievements = true)"
          ref="listViewAchievements"
          for="achievement in achievements"
          :key="index"
          backgroundColor="transparent"
          height="340"
        >
          <v-template>
            <wrAchievement
              :achievementName="achievement.achievementName"
              :description="achievement.description"
            >
            </wrAchievement>
          </v-template>
        </ListView>
        <Button
          row="8"
          class="btn-primary"
          text="Done"
          marginTop="30"
          width="95%"
          @tap="$navigateBack"
        />
      </StackLayout>
    </ScrollView>
    <!-- <ScrollView>
      <StackLayout class="main">
        <GridLayout rows="*" columns="*,*">
          <Label
            row="0"
            col="0"
            text="< Back"
            @tap="close"
            class="text -primary -bold -medium -left"
            marginLeft="10"
            horizontalAlignment="left"
          />
          <Label
            row="0"
            col="1"
            text="Edit >"
            class="text -default -bold -medium -right"
            marginRight="10"
            horizontalAlignment="right"
          />
        </GridLayout>

        <workoutRecordPhotos width="100%" marginTop="10" />
        <wrHeader width="100%" marginTop="15" />
        <wrSummaryMusclesExercises marginTop="15" />
        <wrStatistics margin="20" />
        <wrGraphExercise margin="20" />
      </StackLayout>
    </ScrollView> -->
  </Page>
</template>

<script>
import {
  Frame,
  Color,
  isIOS,
  ApplicationSettings,
  Http,
} from "@nativescript/core";

import wrSummaryMuscles from "../workoutRecordSummary/wrSummaryMuscles/wrSummaryMuscles";
import wrSummaryExercises from "../workoutRecordSummary/wrSummaryExercises/wrSummaryExercises";
import wrHeader from "./wrHeader/wrHeader";
import wrStatistics from "./wrSummaryStatistics/wrStatistics";
import wrGraphExercise from "./wrGraphExercise/wrGraphExercise";
import wrAchievement from "./wrAchievement/wrAchievement.vue";

import workoutRecordPhotos from "./workoutRecordPhotos/workoutRecordPhotos";

export default {
  props: ["workoutRecorded"],
  components: {
    workoutRecordPhotos,
    wrSummaryMuscles,
    wrSummaryExercises,
    wrStatistics,
    wrGraphExercise,
    wrHeader,
    wrAchievement,
  },
  computed: {},
  created() {},
  mounted() {
    if (this.workoutRecorded.workoutRecordedAnalysis.achievements.length >= 1) {
      this.includesAchievements = true;
      this.achievements =
        this.workoutRecorded.workoutRecordedAnalysis.achievements;
    }
    // const userId = ApplicationSettings.getNumber("userId");
    // const authToken = ApplicationSettings.getString("userToken");
    // Http.request({
    //   url:
    //     "https://api.repz.app/user/" +
    //     userId +
    //     "/workoutrecorded/" +
    //     workoutRecordedID +
    //     "/workoutrecordeddetail",
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + authToken,
    //   },
    // }).then(
    //   (response) => {
    //     this.workoutRecorded = response.content.toJSON();
    //     console.log(
    //       this.workoutRecorded.workoutRecordedAnalysis.breakdownMuscleZones
    //     );
    //     console.log(
    //       this.workoutRecorded.workoutRecordedAnalysis.breakdownExercises
    //     );
    //   },
    //   (e) => {}
    // );
  },
  data() {
    return {
      includesAchievements: false,
      achievements: [],
      // breakdownExercisesEven: [],
    };
  },
  methods: {
    close() {
      this.$navigateBack();
    },
    onClickButton() {
      this.$emit("clicked");
    },
    pageLoaded(args) {
      const page = args.object;
    },

    onActionBarLoaded(args) {
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
            UIBarMetrics.default
          );
        });
      }
    },
  },
};
</script>
<style scoped lang="scss">
@import "../../../_app-variables.scss";

.wrsummarymusclesexercises__container {
  height: 254;
  margin: auto;
  border-width: $border-width;
  border-color: $border-color;
  border-radius: $border-radius;
  background-color: $background-color;
  background-image: linear-gradient(
    to bottom,
    $background-gradient-light,
    $background-gradient-dark
  );
  width: 95%;
}
.wrsummarymusclesexercises__grid {
  padding: 15;
}
</style>
