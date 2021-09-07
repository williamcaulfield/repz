<template>
  <Page actionBarHidden="true" class="page">
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
          <workoutPlanExercise :exercisePlanned="exercise" />
        </v-template>

        <v-template if="exercise.displayType == 'Hold'">
          <workoutPlanExercise :exercisePlanned="exercise" />
        </v-template>

        <v-template if="exercise.displayType == 'Rest'">
          <workoutPlanRest :exercisePlanned="exercise" />
        </v-template>

        <v-template if="exercise.displayType == 'Restset'">
          <workoutPlanRestSet :exercisePlanned="exercise" />
        </v-template>
      </RadListView>
    </StackLayout>
  </Page>
</template>

<script>
import { Http } from "@nativescript/core";

import navControls from "../../../mixins/navControls";

import workoutPlanWarmup from "../workoutPlanDetail/workoutPlanWarmup/workoutPlanWarmup";
import workoutPlanExercise from "../workoutPlanDetail/workoutPlanExercise/workoutPlanExercise";
import workoutPlanOverview from "../workoutPlanDetail/workoutPlanOverview/workoutPlanOverview";
import workoutPlanRest from "../workoutPlanDetail/workoutPlanRest/workoutPlanRest";
import workoutPlanRestSet from "../workoutPlanDetail/workoutPlanRestSet/workoutPlanRestSet";
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
      workoutPlanDetail: [],
      // exercisesPlanned: [],
      // exercisesPlanned2: [
      //   {
      //     workoutPlanID: 10,
      //     seqNum: 1,
      //     exerciseID: 0,
      //     repsOrHold: "Warmup",
      //     exerciseSet: 0,
      //     exerciseHeading: "Warmup & Stretch",
      //     exerciseSubType: "Get those muscles ready",
      //     exerciseTargetCount: 0,
      //     exercisePace: "Normal",
      //     weightExtra: 0,
      //     weightDisplayImperial: false,
      //     estimateDuration: 90,
      //     estimateCalories: 20,
      //     exerciseType: "Warmup",
      //     displayType: "Warmup",
      //     isSetHeader: true,
      //   },
      //   {
      //     workoutPlanID: 10,
      //     seqNum: 2,
      //     exerciseID: 6,
      //     repsOrHold: "Reps",
      //     exerciseSet: 1,
      //     exerciseHeading: "Dips",
      //     exerciseSubType: "Parallel Grip",
      //     exerciseTargetCount: 15,
      //     exercisePace: "Normal",
      //     weightExtra: 0,
      //     weightDisplayImperial: false,
      //     estimateDuration: 34,
      //     estimateCalories: 34,
      //     exerciseType: "Reps",
      //     displayType: "Reps",
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
</style>
