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

import {
  Http,
  ApplicationSettings
} from "@nativescript/core";
import {
  dateProperty
} from "@nativescript/core/ui/date-picker";
import {
  Utils
} from "@nativescript/core";
var countId;

export default {
  mixins: [navControls],
  components: {
    // recWorkoutPreview,
    // recWorkoutNavBottom,
    // recWorkoutComplete,
    // recWorkoutWarmup,
    // recWorkoutPause,
    // rwExerciseHold,
    // rwExerciseReps,
    // rwExerciseDetail,
    // recWorkoutProgress,
    // recWorkoutRest,
    // recWorkoutAnalysis
  },
  mounted() {
    this.selectedTabviewRw = 0;
    const wpid = this.workoutPlan.workoutPlanID;
    const userId = ApplicationSettings.getNumber("userId");
    const authToken = ApplicationSettings.getString("userToken");

    // this.workoutTimeStart = new Date();
    Http.request({
      url: "https://api.repz.app/user/" +
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
        this.resetExerciseData();
        //this.workoutRecord.exercisesRecorded[this.currentExerciseIndex].timeStart = new Date();
        this.currentExercise =
          this.workoutRecord.exercisesRecorded[this.currentExerciseIndex];
        if (this.workoutRecord.exercisesRecorded.length - 1 < this.currentExerciseIndex) {
          this.nextExerciseInSequence =
            this.workoutRecord.exercisesRecorded[this.currentExerciseIndex + 1];
        }
        // this.selectedTabviewRw = 1;

        if (
          this.workoutRecord.exercisesRecorded[this.currentExerciseIndex]
          .displayType == "Warmup"
        ) {
          this.selectedTabviewRw = 1;
        } else if (
          this.workoutRecord.exercisesRecorded[this.currentExerciseIndex]
          .displayType == "Hold"
        ) {
          this.selectedTabviewRw = 2;
          this.resetExerciseData();
        } else if (
          this.workoutRecord.exercisesRecorded[this.currentExerciseIndex]
          .displayType == "Reps"
        ) {
          this.selectedTabviewRw = 3;
          this.resetExerciseData();
        } else if (
          this.workoutRecord.exercisesRecorded[this.currentExerciseIndex]
          .displayType == "Rest" ||
          this.workoutRecord.exercisesRecorded[this.currentExerciseIndex]
          .displayType == "Restset"
        ) {
          this.selectedTabviewRw = 4;
        }
      },

      (e) => {}
    );
    countId = Utils.setInterval(() => {
      if (this.workoutTimeEnd = "") {
        Utils.clearInterval(countId);
      } else {
        this.currentTime = new Date()
        var tempCurrentDuration = this.msToTime(this.currentTime - this.workoutTimeStart)
        this.currentDuration = tempCurrentDuration
        //this.workoutDuration = this.currentTime;
      }
    }, 10);

  },
  methods: {
    msToTime(duration) {
      var milliseconds = Math.floor((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;

      return hours + ":" + minutes + ":" + seconds;
    },
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
      this.workoutTimeEnd = new Date();
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
        this.currentExercise.timeStart = new Date();
        if (
          this.currentExerciseIndex <
          this.workoutRecord.exercisesRecorded.length - 1
        ) {
          this.nextExerciseInSequence =
            this.workoutRecord.exercisesRecorded[
              this.currentExerciseIndex + 1
            ];
        } else {
          this.nextExerciseInSequence = "";
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

      console.log(this.workoutRecord);

      const userId = ApplicationSettings.getNumber("userId");
      const authToken = ApplicationSettings.getString("userToken");

      Http.request({
        url: "https://api.repz.app/user/" +
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
      nextExerciseInSequence: {},
      currentExercise: {},
      currentExerciseIndex: 0,
      currentTime: new Date(),
      currentDuration: "",
      selectedTabviewRw: 1,
      timeCountCurrent: 30,
      timeCountStart: 20,
      workoutTime: "12",
      workoutTimeStart: new Date(),
      workoutTimeEnd: "",
      workoutPauseTimeStart: "",
      workoutPauseTimeEnd: "",
      workoutPauseTimeTotal: "",
      projectedDuration: "",
      workoutRecord: {},
    };
  },
}
