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
import {   Http, isIOS,
  ApplicationSettings,
  Frame,
  Color,} from "@nativescript/core";

import navControls from "../../../mixins/navControls";

import workoutPlanWarmup from "../workoutPlanDetail/workoutPlanWarmup/workoutPlanWarmup";
import workoutPlanExercise from "../workoutPlanDetail/workoutPlanExercise/workoutPlanExercise";
import workoutPlanOverview from "../workoutPlanDetail/workoutPlanOverview/workoutPlanOverview";
import workoutPlanRest from "../workoutPlanDetail/workoutPlanRest/workoutPlanRest";
import workoutPlanRestSet from "../workoutPlanDetail/workoutPlanRestSet/workoutPlanRestSet";
import exerciseDetail from "../../Exercises/exerciseDetail/exerciseDetail";
import workoutPlanDetail from "./workoutPlanDetail.js"

export default {
  props: ["workoutPlan"],
  mixins: [workoutPlanDetail],
  components: {
    workoutPlanWarmup,
    workoutPlanExercise,
    workoutPlanOverview,
    workoutPlanRest,
    workoutPlanRestSet,
    exerciseDetail,
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
