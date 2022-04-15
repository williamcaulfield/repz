<template>
  <Page class="page" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
    <GridLayout rows="*,auto" columns="auto" width="100%">
      <!-- :exercise="workoutRecord.exercisesRecorded[currentExerciseIndex]" -->
      <recWorkoutWarmup
        ref="tabWarmup"
        :exercise="currentExercise"
        :nextExerciseName="nextExerciseName"
        row="0"
        col="0"
        v-show="selectedTabviewRw == 1"
        v-on:nextExercise="nextExercise()"
        v-on:exerciseComplete="saveExerciseResult($event, exerciseTotal)"
      />
      <rwExerciseHold
        ref="tabHold"
        :exercise="currentExercise"
        row="0"
        col="0"
        v-show="selectedTabviewRw == 2"
        v-on:nextExercise="nextExercise()"
        v-on:exerciseComplete="saveExerciseResult($event, exerciseResult)"
      />
      <rwExerciseReps
        ref="tabReps"
        :exercise="currentExercise"
        row="0"
        col="0"
        v-show="selectedTabviewRw == 3"
        v-on:nextExercise="nextExercise()"
        v-on:exerciseComplete="saveExerciseResult($event, exerciseResult)"
      />
      <recWorkoutPause
        ref="tabPause"
        row="0"
        col="0"
        v-show="selectedTabviewRw == -1"
        @eventchild="setTabIndex"
        width="100%"
        v-on:workoutShowProgress="workoutShowProgress()"
        v-on:workoutEnd="workoutEnd()"
        v-on:workoutResume="workoutResume()"
      />
      <recWorkoutRest
        ref="tabRest"
        :exercise="currentExercise"
        :nextExerciseName="nextExerciseName"
        row="0"
        col="0"
        v-show="selectedTabviewRw == 4"
        v-on:nextExercise="nextExercise()"
        v-on:exerciseComplete="saveExerciseResult($event, exerciseResult)"
      />
      <recWorkoutComplete
        row="0"
        col="0"
        v-show="selectedTabviewRw == 5"
        width="100%"
      />
      <!-- <recWorkoutAnalysis
        :workoutRecorded="workoutRecord"
        row="0"
        col="0"
        v-show="selectedTabviewRw == 6"
        width="100%"
      /> -->
      <GridLayout
        v-show="selectedTabviewRw == 0"
        class="navBottom"
        height="45"
        width="100%"
        rows="auto"
        columns="auto,*,auto"
        row="1"
        col="0"
      >
        <!-- <Button
          row="0"
          col="0"
          class="icon-back"
          backgroundImage="~/assets/images/icons/icon_back_grey.png"
          @tap="previousExercise"
        />
        <Label
          row="0"
          col="1"
          text="Start"
          class="navText"
          @tap="workoutStart"
        ></Label>
        <Button
          row="0"
          col="2"
          class="icon-play"
          backgroundImage="~/assets/images/icons/icon_play_red.png"
          @tap="workoutStart"
        /> -->
      </GridLayout>
      <GridLayout
        v-show="selectedTabviewRw > 0 && selectedTabviewRw < 6"
        class="navBottom"
        height="45"
        width="100%"
        rows="auto"
        columns="auto,*,auto"
        row="1"
        col="0"
      >
        <Button
          row="0"
          col="0"
          class="icon-pause"
          backgroundImage="~/assets/images/icons/icon_pause_red.png"
          @tap="pauseWorkout"
        />
        <Label
          row="0"
          col="1"
          text="Next"
          class="navText"
          @tap="nextExercise"
        ></Label>
        <Button
          row="0"
          col="2"
          class="icon-next"
          backgroundImage="~/assets/images/icons/icon_next_red.png"
          @tap="nextExercise"
        />
      </GridLayout>
      <GridLayout
        v-show="selectedTabviewRw == 5"
        class="navBottom"
        height="45"
        width="100%"
        rows="auto"
        columns="auto,*,auto"
        row="1"
        col="0"
      >
        <Label
          row="0"
          col="1"
          text="View Analysis"
          class="navText"
          @tap="loadWorkoutAnalysis(workoutRecord)"
        />
        <Button
          row="0"
          col="2"
          class="icon-next"
          backgroundImage="~/assets/images/icons/icon_next_red.png"
          @tap="loadWorkoutAnalysis(workoutRecord)"
        />
      </GridLayout>
    </GridLayout>
  </Page>
</template>

<script>
// import routes from "../../../routes";

import recWorkoutNavBottom from "../recWorkoutNavBottom/recWorkoutNavBottom";

import recWorkoutPreview from "../recWorkoutPreview/recWorkoutPreview";

import recWorkoutComplete from "../recWorkoutComplete/recWorkoutComplete";
import recWorkoutWarmup from "../recWorkoutWarmup/recWorkoutWarmup";
import recWorkoutPause from "../recWorkoutPause/recWorkoutPause";
import rwExerciseHold from "../recWorkoutExercise/rwExerciseHold/rwExerciseHold";
import rwExerciseReps from "../recWorkoutExercise/rwExerciseReps/rwExerciseReps";

import recWorkoutRest from "../recWorkoutRest/recWorkoutRest";
import rwExerciseDetail from "../recWorkoutExercise/rwExerciseDetail/rwExerciseDetail";

import recWorkoutProgress from "../recWorkoutProgress/recWorkoutProgress";

import recWorkoutAnalysis from "../recWorkoutAnalysis/recWorkoutAnalysis";

// import navControls from "../../../mixins/navControls";

// import { Http, ApplicationSettings } from "@nativescript/core";
// import { dateProperty } from "@nativescript/core/ui/date-picker";

import recWorkoutNavFrame from "./recWorkoutNavFrame.js"

export default {
  mixins: [recWorkoutNavFrame],
  props: ["workoutPlan"],
  
  components: {
    recWorkoutPreview,
    recWorkoutNavBottom,
    recWorkoutComplete,
    recWorkoutWarmup,
    recWorkoutPause,
    rwExerciseHold,
    rwExerciseReps,
    rwExerciseDetail,
    recWorkoutProgress,
    recWorkoutRest,
    recWorkoutAnalysis}}
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../../../_app-variables";
// End custom common variables

// Custom styles
.icon-play {
  text-align: center;
  vertical-align: center;
  height: 30;
  margin: 10;
}

.icon-play:highlighted {
  background-color: transparent;
}

.icon-play:active::after {
  background-color: $secondary-color;
}

.icon-next {
  text-align: center;
  vertical-align: center;
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: 40 40;
  height: 50;
  width: 50;
  margin-right: 10;
  margin-top: 5;
}

.icon-next:highlighted {
  opacity: 0.6;
}

.icon-back {
  text-align: center;
  vertical-align: center;
  background-color: transparent;
  background-repeat: no-repeat;
  height: 50;
  width: 50;
  margin: 10;
}

.icon-back:highlighted {
  opacity: 0.6;
}

.icon-pause {
  text-align: center;
  vertical-align: center;
  height: 50;
  width: 50;
  margin-top: 5;
  margin-left: 20;
  background-color: transparent;
  background-repeat: no-repeat;
}

.icon-pause:highlighted {
  opacity: 0.6;
}

.navText {
  font-size: 24;
  color: $text-color;
  font-weight: 900;
  text-align: right;
  vertical-align: center;
  margin-bottom: 7;
  margin-right: 10;
}
</style>
