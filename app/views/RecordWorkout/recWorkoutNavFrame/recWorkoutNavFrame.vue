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
        <Image
          row="0"
          col="0"
          class="icon-back"
          src="~/assets/images/icons/icon_back_grey.png"
          @tap="previousExercise"
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
          @tap="workoutStart"
        />
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
        <Image
          row="0"
          col="0"
          class="icon-pause"
          src="~/assets/images/icons/icon_pause_red.png"
          @tap="pauseWorkout"
        />
        <Label
          row="0"
          col="1"
          text="Next"
          class="navText"
          @tap="nextExercise"
        ></Label>
        <Image
          row="0"
          col="2"
          class="icon-next"
          src="~/assets/images/icons/icon_next_red.png"
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
        <Image
          row="0"
          col="2"
          class="icon-next"
          src="~/assets/images/icons/icon_next_red.png"
          @tap="loadWorkoutAnalysis(workoutRecord)"
        />
      </GridLayout>
    </GridLayout>
  </Page>
</template>

<script>
import routes from "../../../routes";

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

import navControls from "../../../mixins/navControls";

import { Http, ApplicationSettings } from "@nativescript/core";

export default {
  props: ["workoutPlan"],
  mixins: [navControls],
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
    recWorkoutAnalysis,
  },
  mounted() {
    const wpid = 10; //this.workoutPlan.workoutPlanID;
    const userId = ApplicationSettings.getNumber("userId");
    const authToken = ApplicationSettings.getString("userToken");

    Http.request({
      url:
        "https://api.repz.app/user/" +
        userId +
        "/workoutplan/" +
        wpid +
        "/workoutrecorded",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    }).then(
      (response) => {
        this.workoutRecord = response.content.toJSON();
        console.log(this.workoutRecord);
        this.currentExercise =
          this.workoutRecord.exercisesRecorded[this.currentExerciseIndex];
      },

      (e) => {}
    );
  },
  methods: {
    saveExerciseResult(args) {
      this.workoutRecord.exercisesRecorded[
        this.currentExerciseIndex
      ].completedCount = args.completedCount;
      console.log(args.completedCount);
      this.workoutRecord.exercisesRecorded[
        this.currentExerciseIndex
      ].timeStart = args.timeStart;
      console.log(args.timeStart);
      this.workoutRecord.exercisesRecorded[this.currentExerciseIndex].timeEnd =
        args.timeEnd;
      console.log(args.timeEnd);
      this.workoutRecord.exercisesRecorded[this.currentExerciseIndex].duration =
        args.duration;
      console.log(args.duration);
      this.workoutRecord.exercisesRecorded[
        this.currentExerciseIndex
      ].isCompleted = true;
      console.log(
        this.workoutRecord.exercisesRecorded[this.currentExerciseIndex]
          .isCompleted
      );
      this.workoutRecord.exercisesRecorded[
        this.currentExerciseIndex
      ].displayType =
        this.workoutRecord.exercisesRecorded[this.currentExerciseIndex]
          .displayType + "_complete";
      console.log(
        this.workoutRecord.exercisesRecorded[this.currentExerciseIndex]
          .displayType
      );
    },
    previousExercise() {
      if (this.selectedTabviewRw == 0) {
        this.$navigateTo(routes.recordWorkout, {
          frame: "mainContent",
          clearHistory: true,
        });
        this.drawer = false;
      } else {
        this.selectedTabviewRw = 0;
      }
    },
    workoutStart() {
      this.loadWorkoutTab(this.currentExerciseIndex);
    },
    workoutEnd() {
      this.saveExerciseResultBeforeClosing();
      this.saveWorkoutCompleted();
      this.navigateToDashboard();
    },
    workoutResume() {
      this.workoutPauseTimeEnd = new Date();
      this.workoutPauseAdd();
      this.loadWorkoutTab(this.currentExerciseIndex);
    },
    nextExercise() {
      //Check if saved yet
      if (
        this.workoutRecord.exercisesRecorded[this.currentExerciseIndex]
          .isCompleted == false ||
        !this.workoutRecord.exercisesRecorded[
          this.currentExerciseIndex
        ].displayType.includes("_complete")
      ) {
        this.saveExerciseResultBeforeClosing();
      }

      this.calcWorkoutProgress();

      //Move to next exercise
      if (
        this.currentExerciseIndex <
        this.workoutRecord.exercisesRecorded.length - 1
      ) {
        this.currentExerciseIndex++;
        this.currentExercise =
          this.workoutRecord.exercisesRecorded[this.currentExerciseIndex];

        if (
          this.currentExerciseIndex <
          this.workoutRecord.exercisesRecorded.length - 1
        ) {
          this.nextExerciseName =
            this.workoutRecord.exercisesRecorded[
              this.currentExerciseIndex + 1
            ].exerciseHeading;
        } else {
          this.nextExerciseName = "";
        }

        //Reset the exercise data
        this.resetExerciseData();

        this.loadWorkoutTab(this.currentExerciseIndex);
      } else {
        this.loadWorkoutCompleted();
        this.saveWorkoutCompleted();
      }
    },

    saveWorkoutCompleted() {
      this.workoutRecord.timeEnd = new Date();

      const userId = ApplicationSettings.getNumber("userId");
      const authToken = ApplicationSettings.getString("userToken");

      Http.request({
        url:
          "https://api.repz.app/user/" +
          userId +
          "/workoutrecorded/" +
          this.workoutRecord.workoutRecordedID +
          "/save",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
        content: JSON.stringify(this.workoutRecord),
      }).then(
        (response) => {
          this.workoutRecord = response.content.toJSON();
          console.log(this.workoutRecord);
          this.currentExercise =
            this.workoutRecord.exercisesRecorded[this.currentExerciseIndex];
        },

        (e) => {}
      );
    },

    loadWorkoutCompleted() {
      this.selectedTabviewRw = 5;
    },
    // loadWorkoutAnalysis() {
    //   this.selectedTabviewRw = 6;
    // },
    loadWorkoutAnalysis(payload) {
      this.$navigateTo(recWorkoutAnalysis, {
        props: {
          workoutRecorded: payload,
        },
        frame: "mainContent",
        clearHistory: true,
        animated: true,
        transition: {
          name: "slideLeft",
          duration: 300,
          curve: "easeIn",
        },
      });
    },
    resetExerciseData() {
      if (
        this.workoutRecord.exercisesRecorded[this.currentExerciseIndex]
          .displayType == "Warmup"
      ) {
        this.$refs.tabWarmup.exercise = this.currentExercise;
        this.$refs.tabWarmup.resetExerciseData();
      } else if (
        this.workoutRecord.exercisesRecorded[this.currentExerciseIndex]
          .displayType == "Hold"
      ) {
        this.$refs.tabHold.exercise = this.currentExercise;
        this.$refs.tabHold.resetExerciseData();
      } else if (
        this.workoutRecord.exercisesRecorded[this.currentExerciseIndex]
          .displayType == "Reps"
      ) {
        this.$refs.tabReps.exercise = this.currentExercise;
        this.$refs.tabReps.resetExerciseData();
      } else if (
        this.workoutRecord.exercisesRecorded[this.currentExerciseIndex]
          .displayType == "Rest" ||
        this.workoutRecord.exercisesRecorded[this.currentExerciseIndex]
          .displayType == "Restset"
      ) {
        this.$refs.tabHold.tabRest = this.currentExercise;
        this.$refs.tabRest.resetExerciseData();
      }
    },
    saveExerciseResultBeforeClosing() {
      if (
        this.workoutRecord.exercisesRecorded[this.currentExerciseIndex]
          .displayType == "Warmup"
      ) {
        this.$refs.tabWarmup.saveExerciseResult();
        this.selectedTabviewRw = 1;
      } else if (
        this.workoutRecord.exercisesRecorded[this.currentExerciseIndex]
          .displayType == "Hold"
      ) {
        this.$refs.tabHold.saveExerciseResult();
        this.selectedTabviewRw = 2;
      } else if (
        this.workoutRecord.exercisesRecorded[this.currentExerciseIndex]
          .displayType == "Reps"
      ) {
        this.$refs.tabReps.saveExerciseResult();
        this.selectedTabviewRw = 3;
      } else if (
        this.workoutRecord.exercisesRecorded[this.currentExerciseIndex]
          .displayType == "Rest" ||
        this.workoutRecord.exercisesRecorded[this.currentExerciseIndex]
          .displayType == "Restset"
      ) {
        this.$refs.tabRest.saveExerciseResult();
        this.selectedTabviewRw = 4;
      }
    },
    loadWorkoutTab(i) {
      if (this.workoutRecord.exercisesRecorded[i].displayType == "Warmup") {
        this.$refs.tabWarmup.exerciseResult.timeStart = new Date();
        this.selectedTabviewRw = 1;
      } else if (
        this.workoutRecord.exercisesRecorded[i].displayType == "Hold"
      ) {
        this.$refs.tabHold.exerciseResult.timeStart = new Date();
        this.selectedTabviewRw = 2;
      } else if (
        this.workoutRecord.exercisesRecorded[i].displayType == "Reps"
      ) {
        this.$refs.tabReps.exerciseResult.timeStart = new Date();
        this.selectedTabviewRw = 3;
      } else if (
        this.workoutRecord.exercisesRecorded[i].displayType == "Rest" ||
        this.workoutRecord.exercisesRecorded[i].displayType == "Restset"
      ) {
        this.$refs.tabRest.exerciseResult.timeStart = new Date();
        this.selectedTabviewRw = 4;
      } else {
        this.selectedTabviewRw = 8;
      }
    },
    pauseWorkout() {
      this.workoutPauseTimeStart = new Date();
      this.selectedTabviewRw = -1;
    },
    setTabIndex() {
      this.selectedTabviewRw = 1;
    },
    workoutShowProgress() {
      //this.calcWorkoutProgress();
      this.$navigateTo(recWorkoutProgress, {
        props: {
          workoutRecord: this.workoutRecord,
          workoutName: this.workoutRecord.workoutPlanName,
          progressPercentage: this.workoutRecord.progressPercentage,
          currentDuration: this.workoutRecord.currentDuration,
          timeRemaining: this.workoutRecord.timeRemaining,
          projectedEnd: this.projectedEnd, //FIX THIS
          energyBurned: this.workoutRecord.energyBurned,
          exercisesCompleted: this.workoutRecord.exercisesCompleted,
          setsCompleted: this.workoutRecord.setsCompleted,
        },
        animated: true,
        transition: {
          name: "slideLeft",
          duration: 300,
          curve: "easeIn",
        },
      });
    },
    calcWorkoutProgress() {
      let timeEstimatedTotal = 0;
      let timeEstimatedCompleted = 0;
      let progressPercentage = 0;
      let currentDuration = 0;
      let timeRemaining = 0;
      let projectedEnd = 0;
      let energyBurned = 0;
      let exercisesCompleted = 0;
      let setsCompleted = 0;
      let i = this.currentExerciseIndex;

      // var arrayLength = this.workoutRecord.exercisesRecorded.length;
      // for (var i = 0; i < arrayLength; i++) {
      // timeEstimatedTotal =
      //   timeEstimatedTotal +
      //   this.workoutRecord.exercisesRecorded[i].estimateDuration;
      timeEstimatedTotal = this.workoutRecord.projectedDuration;

      if (this.workoutRecord.exercisesRecorded[i].isCompleted) {
        timeEstimatedCompleted =
          this.workoutRecord.timeEstimatedCompleted +
          this.workoutRecord.exercisesRecorded[i].estimateDuration;
        currentDuration =
          this.workoutRecord.currentDuration +
          this.workoutRecord.exercisesRecorded[i].duration;

        energyBurned =
          this.workoutRecord.energyBurned +
          this.workoutRecord.exercisesRecorded[i].estimateCalories +
          2 * this.workoutRecord.exercisesRecorded[i].completedCount; //*TODO
        if (
          this.workoutRecord.exercisesRecorded[i].exerciseType == "Hold" ||
          this.workoutRecord.exercisesRecorded[i].exerciseType == "Reps"
        ) {
          exercisesCompleted = this.workoutRecord.exercisesCompleted + 1;
        } else {
          exercisesCompleted = this.workoutRecord.exercisesCompleted;
        }

        if (this.workoutRecord.exercisesRecorded[i].exerciseSet > 1) {
          if (this.workoutRecord.exercisesRecorded.length == i + 1) {
            setsCompleted = this.workoutRecord.exercisesRecorded[i].exerciseSet;
          } else {
            setsCompleted =
              this.workoutRecord.exercisesRecorded[i].exerciseSet - 1;
          }
        } else {
          setsCompleted = 0;
        }
      }
      // }

      progressPercentage = Math.round(
        (timeEstimatedCompleted / timeEstimatedTotal) * 100
      );

      var currentDate = new Date();
      timeRemaining = timeEstimatedTotal - timeEstimatedCompleted;
      projectedEnd = new Date(currentDate.getTime() + timeRemaining * 1000);

      this.workoutRecord.timeEstimatedTotal = timeEstimatedTotal;
      this.workoutRecord.timeEstimatedCompleted = timeEstimatedCompleted;
      this.workoutRecord.progressPercentage = progressPercentage;
      this.workoutRecord.currentDuration = Math.round(currentDuration);
      this.workoutRecord.timeRemaining = Math.round(timeRemaining / 60);
      this.projectedEnd = projectedEnd; // *TODO
      this.workoutRecord.energyBurned = energyBurned; // *TODO
      this.workoutRecord.exercisesCompleted = exercisesCompleted;
      this.workoutRecord.setsCompleted = setsCompleted;
    },

    workoutPauseAdd() {
      this.workoutPauseTimeTotal =
        this.workoutPauseTimeTotal +
        (this.workoutPauseTimeEnd - this.workoutPauseTimeStart);
    },
  },

  data() {
    return {
      nextExerciseName: "",
      currentExercise: {},
      currentExerciseIndex: 0,
      selectedTabviewRw: 1,
      timeCountCurrent: 30,
      timeCountStart: 20,
      workoutTime: "12",
      workoutTimeStart: "",
      workoutTimeEnd: "",
      workoutPauseTimeStart: "",
      workoutPauseTimeEnd: "",
      workoutPauseTimeTotal: "",
      projectedDuration: "",
      workoutRecord: {
        // workoutName: "Arm Workout",
        // timeEstimatedTotal: 0,
        // timeEstimatedCompleted: 0,
        // woProgress: {
        //   progressPercentage: 0,
        //   currentDuration: 0,
        //   timeRemaining: 0,
        //   projectedEnd: 0,
        //   exercisesCompleted: 0,
        //   setsCompleted: 0,
        //   energyBurned: 0,
        // },
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
      },
    };
  },
};
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
.icon-next {
  text-align: center;
  vertical-align: center;
  height: 30;
  margin: 10;
}
.icon-back {
  text-align: center;
  vertical-align: center;
  height: 30;
  margin: 10;
}
.icon-pause {
  text-align: center;
  vertical-align: center;
  height: 32;
  margin-left: 20;
}
.navText {
  margin: 5;
  font-size: 24;
  color: $text-color;
  font-weight: 900;
  text-align: right;
  vertical-align: center;
}
</style>
