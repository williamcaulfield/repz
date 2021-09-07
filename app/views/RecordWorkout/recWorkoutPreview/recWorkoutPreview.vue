<template>
  <Page class="page" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
    <GridLayout rows="*,auto" columns="auto" width="100%">
      <StackLayout
        class="main"
        verticalAlignment="top"
        horizontalAlignment="center"
        width="100%"
      >
        <GridLayout columns="*,auto" rows="auto">
          <Label
            col="0"
            row="0"
            text="< Back"
            @tap="close"
            class="text -primary -bold -medium -left"
            marginLeft="20"
            marginTop="0"
            horizontalAlignment="left"
            verticalAlignment="center"
          />
          <Label
            col="1"
            row="0"
            :text="workoutPlanDetail.workoutPlanName"
            class="wpdetail-heading -h1 -default -right"
            marginRight="20"
            marginTop="0"
          />
        </GridLayout>

        <RadListView
          row="1"
          col="0"
          for="exercise in workoutPlanDetail.exercisesPlanned"
          layout="list"
          itemReorder="false"
          swipeActions="false"
          orientation="vertical"
          marginTop="0"
          width="90%"
          backgroundColor="transparent"
        >
          <v-template name="header">
            <workoutPlanOverview
              marginTop="20"
              marginBottom="0"
              :workoutPlanDetail="workoutPlanDetail"
            />
          </v-template>

          <v-template if="exercise.displayType  == 'Warmup'">
            <workoutPlanWarmup :exercisePlanned="exercise" marginBottom="5" />
          </v-template>

          <v-template>
            <GridLayout rows="auto,*" columns="*"> </GridLayout
          ></v-template>

          <v-template if="exercise.displayType == 'Reps'">
            <GridLayout rows="auto,*" columns="*">
              <Label
                row="0"
                col="0"
                :text="'Set ' + exercise.exerciseSet"
                class="text -xlarge -bold -default -left"
                marginTop="5"
                marginBottom="5"
                v-show="exercise.isSetHeader"
              />
              <workoutPlanExercise
                row="1"
                col="0"
                :exercisePlanned="exercise"
              />
            </GridLayout>
          </v-template>

          <v-template if="exercise.displayType == 'Hold'">
            <GridLayout rows="auto,*" columns="*">
              <Label
                row="0"
                col="0"
                :text="'Set ' + exercise.isSetHeader"
                class="text -xlarge -bold -default -left"
                marginTop="5"
                marginBottom="5"
                v-show="exercise.isSetHeader"
              />
              <workoutPlanExercise
                row="1"
                col="0"
                :exercisePlanned="exercise"
              />
            </GridLayout>
          </v-template>

          <v-template if="exercise.displayType == 'Rest'">
            <workoutPlanRest :exercisePlanned="exercise" />
          </v-template>

          <v-template if="exercise.displayType == 'Restset'">
            <workoutPlanRestSet margin="10" :exercisePlanned="exercise" />
          </v-template>
        </RadListView>
      </StackLayout>
      <GridLayout
        class="navBottom"
        height="45"
        width="100%"
        rows="auto"
        columns="auto,*,auto"
        row="1"
        col="0"
      >
        <Image
          row="0"
          col="0"
          class="icon-back"
          src="~/assets/images/icons/icon_back_grey.png"
          @tap="$navigateBack()"
        />
        <Label
          row="0"
          col="1"
          text="Start"
          class="navText"
          @tap="workoutStart"
        ></Label>
        <Image
          row="0"
          col="2"
          class="icon-play"
          src="~/assets/images/icons/icon_play_red.png"
          @tap="navigateToRecWorkoutNavFrame()"
        />
      </GridLayout>
    </GridLayout>
  </Page>
</template>

<script>
import { Http, ApplicationSettings } from "@nativescript/core";

import navControls from "../../../mixins/navControls";

import workoutPlanWarmup from "../../Workouts/workoutPlanDetail/workoutPlanWarmup/workoutPlanWarmup";
import workoutPlanExercise from "../../Workouts/workoutPlanDetail/workoutPlanExercise/workoutPlanExercise";
import workoutPlanOverview from "../../Workouts/workoutPlanDetail/workoutPlanOverview/workoutPlanOverview";
import workoutPlanRest from "../../Workouts/workoutPlanDetail/workoutPlanRest/workoutPlanRest";
import workoutPlanRestSet from "../../Workouts/workoutPlanDetail/workoutPlanRestSet/workoutPlanRestSet";
import exerciseDetail from "../../Exercises/exerciseDetail/exerciseDetail";

export default {
  props: ["workoutPlan"],
  mixins: [navControls],
  components: {
    workoutPlanWarmup,
    workoutPlanExercise,
    workoutPlanOverview,
    workoutPlanRest,
    workoutPlanRestSet,
    exerciseDetail,
  },
  mounted() {
    const wpid = this.workoutPlan.workoutPlanID;
    const authToken = ApplicationSettings.getString("userToken");

    Http.request({
      url:
        "https://api.repz.app/workoutplan/" +
        this.workoutPlan.workoutPlanID +
        "/workoutplandetail",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    }).then(
      (response) => {
        this.workoutPlanDetail = response.content.toJSON();
      },

      (e) => {}
    );
  },
  methods: {
    close() {
      this.$navigateBack();
    },
    showExercise(payload) {
      this.$navigateTo(exerciseDetail, {
        props: {
          exercise: payload,
        },
        animated: true,
        transition: {
          name: "slideLeft",
          duration: 300,
          curve: "easeIn",
        },
      });
    },
  },
  data() {
    return {
      workoutPlanDetail: {},
      // workoutName: "Arm Workout",
      // timeEstimatedTotal: 37,

      // exercises: [
      //   {
      //     type: "warmup",
      //     time: 90,
      //     set: 0,
      //     isCompleted: false,
      //     timeStart: "",
      //     timeEnd: "",
      //     timeEstimateDuration: 95,
      //     duration: 0,
      //     completedCount: 0,
      //     displayType: "warmup",
      //     energyPerUnit: 0,
      //     isSetHeader: false,
      //   },
      //   {
      //     type: "reps",
      //     exerciseId: "EX000001",
      //     set: 1,
      //     exerciseName: "Pull-ups",
      //     exerciseDetail: "Shoulder width grip - Overhand",
      //     exerciseTargetCount: 7,
      //     exercisePace: "Normal",
      //     weightExtra: "5",
      //     weightUnits: "Kg",
      //     isCompleted: false,
      //     timeStart: "",
      //     timeEnd: "",
      //     timeEstimateDuration: 15,
      //     duration: 0,
      //     completedCount: 0,
      //     displayType: "reps",
      //     energyPerUnit: 2,
      //     isSetHeader: true,
      //   },
      //   {
      //     type: "rest",
      //     time: 90,
      //     set: 1,
      //     isCompleted: false,
      //     timeStart: "",
      //     timeEnd: "",
      //     timeEstimateDuration: 90,
      //     duration: 0,
      //     completedCount: 0,
      //     displayType: "rest",
      //     energyPerUnit: 0,
      //     isSetHeader: false,
      //   },
      //   {
      //     type: "hold",
      //     exerciseId: "EX000002",
      //     set: 1,
      //     exerciseName: "Front Planche",
      //     exerciseDetail: "",
      //     exerciseTargetCount: 30,
      //     exercisePace: "",
      //     weightExtra: "",
      //     weightUnits: "",
      //     isCompleted: false,
      //     timeStart: "",
      //     timeEnd: "",
      //     timeEstimateDuration: 35,
      //     duration: 0,
      //     completedCount: 0,
      //     displayType: "hold",
      //     energyPerUnit: 2,
      //     isSetHeader: false,
      //   },
      //   {
      //     type: "rest",
      //     time: 90,
      //     set: 1,
      //     isCompleted: false,
      //     timeStart: "",
      //     timeEnd: "",
      //     timeEstimateDuration: 95,
      //     duration: 0,
      //     completedCount: 0,
      //     displayType: "rest",
      //     energyPerUnit: 0,
      //     isSetHeader: false,
      //   },
      //   {
      //     type: "reps",
      //     exerciseId: "EX000001",
      //     set: 1,
      //     exerciseName: "Pull-ups",
      //     exerciseDetail: "Shoulder width grip - Overhand",
      //     exerciseTargetCount: 7,
      //     exercisePace: "Normal",
      //     weightExtra: "5",
      //     weightUnits: "Kg",
      //     isCompleted: false,
      //     timeStart: "",
      //     timeEnd: "",
      //     timeEstimateDuration: 15,
      //     duration: 0,
      //     completedCount: 0,
      //     displayType: "reps",
      //     energyPerUnit: 2,
      //     isSetHeader: false,
      //   },
      //   {
      //     type: "rest",
      //     time: 90,
      //     set: 1,
      //     isCompleted: false,
      //     timeStart: "",
      //     timeEnd: "",
      //     timeEstimateDuration: 95,
      //     duration: 0,
      //     completedCount: 0,
      //     displayType: "rest",
      //     energyPerUnit: 0,
      //     isSetHeader: false,
      //   },
      //   {
      //     type: "hold",
      //     exerciseId: "EX000002",
      //     set: 1,
      //     exerciseName: "Front Planche",
      //     exerciseDetail: "",
      //     exerciseTargetCount: 30,
      //     exercisePace: "",
      //     weightExtra: "",
      //     weightUnits: "",
      //     isCompleted: false,
      //     timeStart: "",
      //     timeEnd: "",
      //     timeEstimateDuration: 35,
      //     duration: 0,
      //     completedCount: 0,
      //     displayType: "hold",
      //     energyPerUnit: 2,
      //     isSetHeader: false,
      //   },
      //   {
      //     type: "rest",
      //     time: 90,
      //     set: 2,
      //     isCompleted: false,
      //     timeStart: "",
      //     timeEnd: "",
      //     timeEstimateDuration: 95,
      //     duration: 0,
      //     completedCount: 0,
      //     displayType: "restSet",
      //     energyPerUnit: 0,
      //     isSetHeader: false,
      //   },
      //   {
      //     type: "reps",
      //     exerciseId: "EX000001",
      //     set: 2,
      //     exerciseName: "Pull-ups",
      //     exerciseDetail: "Shoulder width grip - Overhand",
      //     exerciseTargetCount: 7,
      //     exercisePace: "Normal",
      //     weightExtra: "5",
      //     weightUnits: "Kg",
      //     isCompleted: false,
      //     timeStart: "",
      //     timeEnd: "",
      //     timeEstimateDuration: 15,
      //     duration: 0,
      //     completedCount: 0,
      //     displayType: "reps",
      //     energyPerUnit: 2,
      //     isSetHeader: true,
      //   },
      //   {
      //     type: "rest",
      //     exerciseName: "Between set breather",
      //     time: 90,
      //     set: 2,
      //     isCompleted: false,
      //     timeStart: "",
      //     timeEnd: "",
      //     timeEstimateDuration: 95,
      //     duration: 0,
      //     completedCount: 0,
      //     displayType: "rest",
      //     energyPerUnit: 0,
      //     isSetHeader: false,
      //   },

      //   {
      //     type: "reps",
      //     exerciseId: "EX000001",
      //     set: 2,
      //     exerciseName: "Pull-ups Last",
      //     exerciseDetail: "Shoulder width grip - Overhand",
      //     exerciseTargetCount: 7,
      //     exercisePace: "Normal",
      //     weightExtra: "5",
      //     weightUnits: "Kg",
      //     isCompleted: false,
      //     timeStart: "",
      //     timeEnd: "",
      //     timeEstimateDuration: 15,
      //     duration: 0,
      //     completedCount: 0,
      //     displayType: "reps",
      //     energyPerUnit: 2,
      //     isSetHeader: false,
      //   },
      // ],
    };
  },
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../../../_app-variables";
// End custom common variables

// Custom styles

.wpdetail-heading {
  text-align: left;
  vertical-align: bottom;
  margin-left: 20;
}

.-h1 {
  @extend .wpdetail-heading;
  font-size: 20;
  font-weight: normal;
  border-bottom-color: $text-color-primary;
  border-bottom-width: 2;
  margin-top: 0;
  margin-bottom: 10;
}
.-h2 {
  @extend .wpdetail-heading;
  font-size: 16;
  margin-left: 10;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 2;
}
.-primary {
  @extend .wpdetail-heading;
  color: $text-color-primary;
}
.-default {
  @extend .wpdetail-heading;
  color: $text-color;
}
.icon-back {
  text-align: center;
  vertical-align: center;
  height: 30;
  margin: 10;
}
.navText {
  margin: 5;
  font-size: 24;
  color: $text-color;
  font-weight: 900;
  text-align: right;
  vertical-align: center;
}
.icon-next {
  text-align: center;
  vertical-align: center;
  height: 30;
  margin: 10;
}
</style>
