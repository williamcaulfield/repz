<template>
  <Page
    class="page"
    actionBarHidden="true"
    backgroundSpanUnderStatusBar="true"
    backgroundColor="black"
  >
    <GridLayout rows="auto,*,auto" columns="*">
      <GridLayout
        row="0"
        col="0"
        class="workoutRecordSummary-titleBar"
        columns="auto,*"
        rows="auto,auto,auto"
        verticalAlignment="center"
        width="90%"
        marginTop="15"
      >
        <TextField
          col="0"
          row="0"
          class="text -xlarge -bold -default -left"
          editable="true"
          v-model="workoutPlanDetail.workoutPlanName"
          keyboardType="email"
          returnKeyType="done"
          autocorrect="false"
          hint="New Workout Name"
          marginTop="0"
          maxLength="50"
        />

        <Label row="1" class="line" col="0" colSpan="2" />
        <Label
          row="0"
          col="1"
          class="text -xlarge -bold -primary -right"
          textwrap="false"
          :text="Math.ceil(workoutPlanDetail.projectedDuration / 60.0) + ' min'"
        />
      </GridLayout>

      <RadListView
        v-if="renderComponent"
        ref="listView"
        row="1"
        col="0"
        for="exercise in workoutPlanDetail.exercisesPlanned"
        layout="list"
        @itemTap="onItemTap($event, $index)"
        itemReorder="true"
        @itemReordered="onItemReordered"
        swipeActions="true"
        pullToRefresh="true"
        @itemSwipeProgressStarted="onSwipeStarted"
        @pullToRefreshInitiated="onPullToRefreshInitiated"
        orientation="vertical"
        width="90%"
        marginTop="20"
        backgroundColor="transparent"
      >
        <!-- <v-template if="exercise.displayType == 'setHeader'">
          <GridLayout rows="auto" columns="auto,*">
            <Label
              col="0"
              row="0"
              :text="exercise.name"
              class="text -xlarge -bold -default -left"
              marginTop="20"
              marginBottom="5"
            ></Label>
            <Image
              col="1"
              row="0"
              class="icon-tick"
              src="~/assets/images/icons/icon_tick_empty.png"
              horizontalAlignment="left"
            />
          </GridLayout>
        </v-template> -->

        <v-template name="header">
          <workoutPlanOverview
            marginTop="20"
            marginBottom="0"
            :workoutPlanDetail="workoutPlanDetail"
          />
        </v-template>

        <v-template if="exercise.displayType  == 'Warmup'">
          <workoutPlanWarmup :exercisePlanned="exercise" marginBottom="10" />
        </v-template>

        <v-template>
          <GridLayout rows="auto,*" columns="*"> </GridLayout
        ></v-template>

        <v-template>
          <GridLayout rows="auto,*" columns="*"> </GridLayout
        ></v-template>

        <v-template if="exercise.displayType == 'Hold'">
          <!-- <GridLayout rows="auto,*" columns="*">
            <Label
              row="0"
              col="0"
              :text="'Set ' + exercise.isSetHeader"
              class="text -xlarge -bold -default -left"
              marginTop="-10"
              marginBottom="5"
              v-show="exercise.isSetHeader"
            /> -->
          <wbExercise
            :exercisePlanned="exercise"
            v-on:selected="addSelection($event, $index)"
            v-on:deselected="removeSelection($event, $index)"
          />
          <!-- </GridLayout> -->
        </v-template>

        <v-template if="exercise.displayType == 'Reps'">
          <!-- <GridLayout rows="auto,*" columns="*">
            <Label
              row="0"
              col="0"
              :text="'Set ' + exercise.exerciseSet"
              class="text -xlarge -bold -default -left"
              marginTop="0"
              marginBottom="0"
              v-show="exercise.isSetHeader"
            /> -->
          <wbExercise
            :exercisePlanned="exercise"
            v-on:selected="addSelection($event, $index)"
            v-on:deselected="removeSelection($event, $index)"
          />
          <!-- </GridLayout> -->
        </v-template>

        <v-template if="exercise.displayType == 'Rest'">
          <workoutPlanRest
            :exercisePlanned="exercise"
            v-on:selected="addSelection($event, $index)"
            v-on:deselected="removeSelection($event)"
          />
        </v-template>

        <v-template if="exercise.displayType == 'Restset'">
          <workoutPlanRestSet
            :exercisePlanned="exercise"
            v-on:selected="addSelection($event)"
            v-on:deselected="removeSelection($event)"
          />
        </v-template>

        <v-template name="footer">
          <wBuilderAdd
            v-on:clickAddRest="addRest(rest)"
            v-on:clickAddRestSet="addRestSet(restSet)"
            v-on:clickAddExercise="loadExerciseBrowser()"
          />
        </v-template>
        <v-template name="itemswipe">
          <GridLayout columns="auto, *, auto" backgroundColor="transparent">
            <StackLayout
              id="add-view"
              col="0"
              class="swipe-item left"
              orientation="horizontal"
              @tap="onLeftSwipeClick"
            >
              <TextField
                class="text -xlarge -bold -default -left"
                editable="true"
                text="workoutPlanDetail.workoutPlanName"
                keyboardType="email"
                returnKeyType="done"
                autocorrect="false"
                hint="New Workout Name"
                marginTop="0"
                maxLength="50"
              />
              <Image
                col="1"
                row="0"
                class="icon-swipe"
                src="~/assets/images/icons/icon_add_white.png"
                horizontalAlignment="center"
              />
            </StackLayout>
            <StackLayout
              id="delete-view"
              col="2"
              class="swipe-item right"
              orientation="horizontal"
              @tap="onRightSwipeClick"
            >
              <Image
                col="1"
                row="0"
                class="icon-swipe"
                src="~/assets/images/icons/icon_delete_white.png"
                horizontalAlignment="center"
              />
            </StackLayout>
          </GridLayout>
        </v-template>
      </RadListView>

      <wBuilderNavBottom
        row="2"
        col="0"
        v-on:editSet="showEditSet"
        v-on:editRepeat="showEditRepeat"
        v-on:createSet="createSet"
        v-on:saveWorkout="saveWorkout"
        v-on:closeWorkout="closeWorkout"
      />
    </GridLayout>
  </Page>
</template>

<script>
import {
  Dialogs,
  Frame,
  Color,
  ApplicationSettings,
  Timer,
  Http,
} from "@nativescript/core";

import navControls from "../../../mixins/navControls";

import wbEditExerciseReps from "./modals/wbEditExercise/wbEditExerciseReps/wbEditExerciseReps";
import wbEditExerciseHold from "./modals/wbEditExercise/wbEditExerciseHold/wbEditExerciseHold";
import wbEditRest from "./modals/wbEditRest/wbEditRest";
import wbEditSet from "./modals/wbEditSet/wbEditSet";
import wbEditRepeat from "./modals/wbEditRepeat/wbEditRepeat";

import workoutPlanWarmup from "../workoutPlanDetail/workoutPlanWarmup/workoutPlanWarmup";
import wbExercise from "../workoutBuilder/wbExercise/wbExercise";
import workoutPlanOverview from "../workoutPlanDetail/workoutPlanOverview/workoutPlanOverview";
import workoutPlanRest from "../workoutPlanDetail/workoutPlanRest/workoutPlanRest";
import workoutPlanRestSet from "../workoutPlanDetail/workoutPlanRestSet/workoutPlanRestSet";
import wBuilderNavBottom from "./wBuilderNavBottom/wBuilderNavBottom";
import wBuilderAdd from "./wBuilderAdd/wBuilderAdd";
import wbExerciseBrowser from "./wbExerciseBrowser/wbExerciseBrowser";
import wbEditWarmup from "./modals/wbEditWarmup/wbEditWarmup";

import workoutBuilder from "./workoutBuilder.js";

export default {
  mixins: [workoutBuilder],

  components: {
    workoutPlanWarmup,
    wbExercise,
    workoutPlanOverview,
    workoutPlanRest,
    workoutPlanRestSet,
    wBuilderNavBottom,
    wBuilderAdd,
    wbEditRepeat,
    wbEditSet,
    wbExerciseBrowser,
    wbEditExerciseHold,
    wbEditExerciseReps,
  },
};
</script>
<style scoped lang="scss">
// Start custom common variables
@import "../../../_app-variables";
// End custom common variables

// Custom styles

.icon-swipe {
  height: 32;
}
.icon-tick {
  height: 32;
  margin-left: 15;
}

.workoutRecordSummary-titleBar__workoutName {
  font-size: 18;
  font-weight: bold;
  color: white;
  vertical-align: bottom;
  margin-left: 7;
  margin-bottom: 5;
  height: 23;
  margin-right: 10;
  margin-left: 5;
  margin-top: 5;
}
.line {
  border-bottom-width: 2;
  border-bottom-color: red;
  margin-bottom: -5;
  margin-right: 0;
  margin-left: 0;
}

.workoutRecordSummary-titleBar__caloriesBurnedDuration {
  font-size: 16;
  color: red;
  text-align: right;
  margin-right: 10;
  vertical-align: bottom;
  margin-bottom: 5;
  font-weight: bold;
}
.workoutRecordSummary-titleBar__userName {
  font-size: 16;
  color: white;
  font-weight: bold;
  text-align: right;
  margin-right: 10;
  margin-bottom: 18;
  vertical-align: bottom;
}
.workoutRecordSummary-titleBar__dateTime {
  font-size: 12;
  color: white;
  text-align: left;
  vertical-align: bottom;
  margin-bottom: 20;
  margin-left: 7;
}

.workoutRecordSummary-actionBar__icon {
  height: 28;
  width: 28;
  margin-bottom: 10;
}

.swipe-item {
  padding: 16;
  font-size: 16;
  font-weight: bold;
  color: white;
  background-color: blue;
  border-radius: $border-radius;
}

.swipe-item.left {
  background-color: red;
  background-image: linear-gradient(
    to bottom,
    $btn-primary-gradient-light,
    $btn-primary-gradient-dark
  );
}

.swipe-item.right {
  background-color: red;
  background-image: linear-gradient(
    to bottom,
    $btn-primary-gradient-light,
    $btn-primary-gradient-dark
  );
}
</style>
