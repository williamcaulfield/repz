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

export default {
  mixins: [navControls],
  computed: {
    workoutTime: function () {
      return this.workoutPlanDetail.exercisesPlanned.length * 2;
    },
  },

  mounted() {
    const userId = ApplicationSettings.getNumber("userId");
    const authToken = ApplicationSettings.getString("userToken");

    this.userID = userId;

    if (this.workoutPlanDetail.authorID == null) {
      this.workoutPlanDetail.authorID = userId;
    }

    Http.request({
      url: "https://api.repz.app/user/" + userId + "/userprofile/" + userId,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    }).then(
      (response) => {
        this.userProfile = response.content.toJSON();
        this.workoutPlanDetail.author = this.userProfile.userName;
      },
      (e) => {}
    );

    // Http
    //   .request({
    //     url: "https://api.repz.app/user/" + userId + "/workoutplans",
    //     method: "GET",
    //   })
    //   .then(
    //     (response) => {
    //       this.workoutPlansMine = response.content.toJSON();
    //       console.log(this.workoutPlansMine);
    //     },
    //     (e) => {}
    //   );
  },
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
  methods: {
    forceRerender() {
      // Remove my-component from the DOM
      this.renderComponent = false;

      this.$nextTick(() => {
        // Add the component back in
        this.renderComponent = true;
      });
    },
    addExercises(args) {
      this.workoutPlanDetail.exercisesPlanned.push(args);

      //this.selectedTabViewWb = 1;
    },
    loadExerciseBrowser() {
      this.showExerciseBrowser();
    },
    onPullToRefreshInitiated({
      object
    }) {
      console.log("Pulling...");
      // in order to avoid race conditions (only on iOS),
      // in which the UI may not be completely updated here
      // we use this.$nextTick call
      this.show = false;
      this.$nextTick(() => {
        // this.fruitList.push({
        //   name: 'Berry',
        // });
        object.notifyPullToRefreshFinished();
        this.show = true;
      });
      this.$refs.listView.refresh();
    },
    addSelection(event, index) {
      console.log("Item selected: " + index);
      this.selectedItems.push(index);
      console.log("Selected Items: " + this.selectedItems);
    },
    removeSelection(event, index) {
      console.log("Item deselected: " + index);
      let position = this.selectedItems.indexOf(index);
      this.selectedItems.splice(position, 1);
      console.log("Selected Items: " + this.selectedItems);
    },
    updateSelected(indexOld, indexNew) {
      console.log("Selected Items: " + this.selectedItems);
      this.selectedItems.splice(indexOld, 1, indexNew);

      console.log("Selected Items: " + this.selectedItems);
    },
    updateSeqNum() {
      // this.workoutPlanDetail.exercisesPlanned.forEach(function (
      //   exercise,
      //   index,
      //   exercisesPlanned
      // ) {
      //   exercisesPlanned[index].seqNum = index;
      //   console.log(exercise, index);
      // });
      var i = 0;
      this.workoutPlanDetail.exercisesPlanned.forEach((element) => {
        element.seqNum = i;
        console.log(element, i);
        i++;
      });
    },
    clearSelectedItems() {
      while (this.selectedItems.length) {
        this.selectedItems.pop();
      }
    },
    duplicateExercise(exerciseToAdd) {
      this.workoutPlanDetail.exercisesPlanned.push(exerciseToAdd);
      console.log("Exercise added: " + JSON.stringify(exerciseToAdd));
      this.clearSelectedItems();
      this.updateSeqNum();
      this.$refs.listView.refresh();
      console.log(
        "Exercises Planned: " +
        JSON.stringify(this.workoutPlanDetail.exercisesPlanned)
      );
      this.updateSummaries();
    },
    addExercise(exerciseToAdd) {
      //Default reps/hold - Replace with user setting
      if (exerciseToAdd.exerciseType == "Reps") {
        exerciseToAdd.exerciseTargetCount = 9;
      } else if (exerciseToAdd.exerciseType == "Hold") {
        exerciseToAdd.exerciseTargetCount = 30;
      }

      this.workoutPlanDetail.exercisesPlanned.push(exerciseToAdd);
      console.log("Exercise added: " + JSON.stringify(exerciseToAdd));
      this.clearSelectedItems();
      this.updateSeqNum();
      this.$refs.listView.refresh();
      console.log(
        "Exercises Planned: " +
        JSON.stringify(this.workoutPlanDetail.exercisesPlanned)
      );
      this.updateSummaries();
    },

    addRest(restToAdd) {
      //Default rest time
      restToAdd.estimateDuration = 31;
      this.workoutPlanDetail.exercisesPlanned.push(restToAdd);
      console.log("Rest added: " + JSON.stringify(restToAdd));
      this.clearSelectedItems();
      this.updateSeqNum();
      this.$refs.listView.refresh();
      console.log(
        "Exercises Planned: " +
        JSON.stringify(this.workoutPlanDetail.exercisesPlanned)
      );
      this.updateSummaries();
    },

    addRestSet(restSetToAdd) {
      //Default rest time
      restSetToAdd.estimateDuration = 91;
      this.workoutPlanDetail.exercisesPlanned.push(restSetToAdd);
      console.log("RestSet added: " + JSON.stringify(restSetToAdd));
      this.clearSelectedItems();
      this.updateSeqNum();
      this.$refs.listView.refresh();
      console.log(
        "Exercises Planned: " +
        JSON.stringify(this.workoutPlanDetail.exercisesPlanned)
      );
      this.updateSummaries();
    },

    deleteExercise(index) {
      this.selectedItems.splice(index, 1);
      this.clearSelectedItems();
      this.updateSeqNum();
      this.$refs.listView.refresh();
      console.log(
        "Exercises Planned: " +
        JSON.stringify(this.workoutPlanDetail.exercisesPlanned)
      );
    },

    reorderExercise(indexOld, indexNew) {
      this.workoutPlanDetail.exercisesPlanned.splice(
        indexNew,
        0,
        this.selectedItems[indexOld]
      );
      this.workoutPlanDetail.exercisesPlanned.splice(indexOld, 1);
      this.$refs.listView.refresh();
      console.log(
        "Exercises Planned: " +
        JSON.stringify(this.workoutPlanDetail.exercisesPlanned)
      );
    },

    collapseSet() {},

    createSet() {
      Dialogs.alert({
        title: "Set created",
        okButtonText: "OK",
      }).then(function () {
        console.log("Set created");
      });
    },

    editSet() {},

    editExercise(index, exerciseTargetCount, exercisePace, weightExtra) {
      (this.workoutPlanDetail.exercisesPlanned[index].exerciseTargetCount =
        exerciseTargetCount),
      (this.workoutPlanDetail.exercisesPlanned[index].exercisePace =
        exercisePace),
      (this.workoutPlanDetail.exercisesPlanned[index].weightExtra =
        weightExtra);
    },

    editRest(index, restTargetCount) {
      this.workoutPlanDetail.exercisesPlanned[index].exerciseTargetCount =
        restTargetCount;
    },

    renameWorkoutPlan(newWorkoutPlanName) {
      this.workoutPlanName = newWorkoutPlanName;
    },
    loadWorkoutplan() {
      // Http
      //   .request({
      //     url: "https://api.repz.app/user/" + userId + "/workoutplans",
      //     method: "GET",
      //   })
      //   .then(
      //     (response) => {
      //       this.workoutPlansMine = response.content.toJSON();
      //       console.log(this.workoutPlansMine);
      //     },
      //     (e) => {}
      //   );
    },
    updateSummaries() {
      //Time
      this.workoutPlanDetail.projectedDuration = 0;
      //Calories
      this.workoutPlanDetail.projectedCalories = 0;
      //Exercises
      this.workoutPlanDetail.exercisesPlannedTotal = 0;
      //Sets
      this.workoutPlanDetail.setsPlannedTotal = 0;

      //Muscle Zones
      while (this.workoutPlanDetail.muscleZones.length) {
        this.workoutPlanDetail.muscleZones.pop();
      }

      //Difficulty Levels
      while (this.workoutPlanDetail.difficultyLevels.length) {
        this.workoutPlanDetail.difficultyLevels.pop();
      }

      //Equipment
      while (this.workoutPlanDetail.equipment.length) {
        this.workoutPlanDetail.equipment.pop();
      }
      var nextIsSetHeader = false;

      for (var i = 0; i < this.workoutPlanDetail.exercisesPlanned.length; i++) {
        //this.workoutPlanDetail.exercisesPlanned.forEach((exercise) => {

        var exercise = this.workoutPlanDetail.exercisesPlanned[i];
        //*TODO - Add rep time multiplier
        if (exercise.repsOrHold === "Reps") {
          //Duration
          exercise.estimateDuration = exercise.exerciseTargetCount * 2;

          this.workoutPlanDetail.projectedDuration =
            this.workoutPlanDetail.projectedDuration +
            exercise.estimateDuration;

          //Calories
          exercise.estimateCalories = exercise.exerciseTargetCount * 2;

          this.workoutPlanDetail.projectedCalories =
            this.workoutPlanDetail.projectedCalories +
            exercise.estimateCalories;

          //Exercise Count
          this.workoutPlanDetail.exercisesPlannedTotal =
            this.workoutPlanDetail.exercisesPlannedTotal + 1;

          //Set Count
          if (this.workoutPlanDetail.setsPlannedTotal === 0) {
            this.workoutPlanDetail.setsPlannedTotal =
              this.workoutPlanDetail.setsPlannedTotal + 1;
          }

          if (nextIsSetHeader === true) {
            exercise.isSetHeader = true;
            nextIsSetHeader = false;
          }

          //Muscles Zones

          for (var p = 0; p < exercise.muscleZones.length; p++) {
            //exercise.muscleZones.forEach((muscle) => {
            var muscle = exercise.muscleZones[p];
            if (this.workoutPlanDetail.muscleZones.indexOf(muscle) === -1) {
              this.workoutPlanDetail.muscleZones.push(muscle);
            }
          }

          // Difficulty Levels
          if (
            this.workoutPlanDetail.difficultyLevels.indexOf(
              exercise.difficultyLevel === -1
            )
          ) {
            this.workoutPlanDetail.difficultyLevels.push(
              exercise.difficultyLevel
            );
          }

          // Equipment
          // for (var p = 0; p < exercise.equipment.length; p++) {
          //   //exercise.equipment.forEach((equipment) => {
          //   var equipment = exercise.equipment[p];
          //   if (this.workoutPlanDetail.equipment.indexOf(equipment) === -1) {
          //     this.workoutPlanDetail.equipment.push(equipment);
          //   }
          // }
        } else if (exercise.repsOrHold === "Hold") {
          //Duration
          exercise.estimateDuration = exercise.exerciseTargetCount;

          this.workoutPlanDetail.projectedDuration =
            this.workoutPlanDetail.projectedDuration +
            exercise.estimateDuration;

          //Calories
          exercise.estimateCalories = exercise.exerciseTargetCount * 1;

          this.workoutPlanDetail.projectedCalories =
            this.workoutPlanDetail.projectedCalories +
            exercise.estimateCalories;

          //Exercise Count
          this.workoutPlanDetail.exercisesPlannedTotal =
            this.workoutPlanDetail.exercisesPlannedTotal + 1;

          //Set Count
          if (this.workoutPlanDetail.setsPlannedTotal === 0) {
            this.workoutPlanDetail.setsPlannedTotal =
              this.workoutPlanDetail.setsPlannedTotal + 1;
          }

          if (nextIsSetHeader === true) {
            exercise.isSetHeader = true;
            nextIsSetHeader = false;
          }

          //Muscles Zones
          for (var p = 0; p < exercise.muscleZones.length; p++) {
            //exercise.muscleZones.forEach((muscle) => {
            var muscle = exercise.muscleZones[p];
            if (this.workoutPlanDetail.muscleZones.indexOf(muscle) === -1) {
              this.workoutPlanDetail.muscleZones.push(muscle);
            }
          }

          // Difficulty Levels
          if (
            this.workoutPlanDetail.difficultyLevels.indexOf(
              exercise.difficultyLevel === -1
            )
          ) {
            this.workoutPlanDetail.difficultyLevels.push(
              exercise.difficultyLevel
            );
          }

          // Equipment
          // exercise.equipment.forEach((equipment) => {
          //   if (this.workoutPlanDetail.equipment.indexOf(equipment) === -1) {
          //     this.workoutPlanDetail.equipment.push(equipment);
          //   }
          // });
        } else if (exercise.repsOrHold === "RestSet") {
          //Duration
          this.workoutPlanDetail.projectedDuration =
            this.workoutPlanDetail.projectedDuration +
            exercise.estimateDuration;

          //Set Count
          this.workoutPlanDetail.setsPlannedTotal =
            this.workoutPlanDetail.setsPlannedTotal + 1;

          nextIsSetHeader = true;
        } else {
          //Duration
          this.workoutPlanDetail.projectedDuration =
            this.workoutPlanDetail.projectedDuration +
            exercise.estimateDuration;

          if (exercise.repsOrHold === "Warmup") {
            nextIsSetHeader = true;
          }
        }
      }
    },

    showExerciseBrowser() {
      this.$showModal(wbExerciseBrowser, {
        fullscreen: true,
        animated: true,
        stretched: false,
        dimAmount: 0.5,
      }).then((result) => {
        console.log(result);

        for (var i = 0; i < result.length; i++) {
          if (
            (this.workoutPlanDetail.exercisesPlanned.length > 0 &&
              this.workoutPlanDetail.exercisesPlanned[
                this.workoutPlanDetail.exercisesPlanned.length - 1
              ].displayType === "Reps") ||
            this.workoutPlanDetail.exercisesPlanned[
              this.workoutPlanDetail.exercisesPlanned.length - 1
            ].displayType === "Hold"
          ) {
            let restToAdd = Object.assign({}, this.rest); //copy object
            //var restToAdd = this.rest;
            restToAdd.estimateDuration = 31;
            this.workoutPlanDetail.exercisesPlanned.push(restToAdd);
          }

          var exerciseToAdd = result[i];

          if (exerciseToAdd.exerciseType == "Reps") {
            exerciseToAdd.exerciseTargetCount = 9;
          } else if (exerciseToAdd.exerciseType == "Hold") {
            exerciseToAdd.exerciseTargetCount = 30;
          }

          this.workoutPlanDetail.exercisesPlanned.push(exerciseToAdd);
        }
        console.log(this.workoutPlanDetail.exercisesPlanned);

        this.clearSelectedItems();
        this.updateSeqNum();
        this.$refs.listView.refresh();
        this.updateSummaries();
        this.forceRerender();
      });
    },
    showEditExerciseReps(args) {
      this.$showModal(wbEditExerciseReps, {
        fullscreen: true,
        props: {
          exercisePlanned: args
        },
        animated: true,
        stretched: false,
        dimAmount: 0.5,
        ios: {
          presentationStyle: UIModalPresentationStyle.BlurOverFullScreen,
        },
      });
    },
    showEditExerciseHold(args) {
      this.$showModal(wbEditExerciseHold, {
        fullscreen: true,
        props: {
          exercisePlanned: args
        },
        animated: true,
        stretched: false,
        dimAmount: 0.5,
        ios: {
          presentationStyle: UIModalPresentationStyle.BlurOverFullScreen,
        },
      });
    },

    showEditRest(args) {
      this.$showModal(wbEditRest, {
        fullscreen: true,
        props: {
          exercisePlanned: args
        },
        animated: true,
        stretched: false,
        dimAmount: 0.5,
        ios: {
          presentationStyle: UIModalPresentationStyle.BlurOverFullScreen,
        },
      });
    },

    showEditWarmup(args) {
      this.$showModal(wbEditWarmup, {
        fullscreen: true,
        props: {
          exercisePlanned: args
        },
        animated: true,
        stretched: false,
        dimAmount: 0.5,
        ios: {
          presentationStyle: UIModalPresentationStyle.BlurOverFullScreen,
        },
      });
    },

    showEditSet() {
      this.$showModal(wbEditSet, {
        fullscreen: true,
        animated: true,
        stretched: false,
        dimAmount: 0.5,
        cancelable: true,
        ios: {
          presentationStyle: UIModalPresentationStyle.BlurOverFullScreen,
        },
      });
    },
    showEditRepeat() {
      if (this.selectedItems.length !== 0) {
        this.$showModal(wbEditRepeat, {
          fullscreen: true,
          props: {
            exercisesPlanned: this.exercisesPlanned,
            selectedItems: this.selectedItems,
          },
          animated: true,
          stretched: false,
          dimAmount: 0.5,
          ios: {
            presentationStyle: UIModalPresentationStyle.BlurOverFullScreen,
          },
        }).then((data) => {
          this.applyRepeatsToWorkout(data);
        });
      } else {
        Dialogs.alert({
          title: "Please select one or more exercises",
          okButtonText: "OK",
        });
      }
    },

    applyRepeatsToWorkout(repeatSettings) {
      for (var i = 1; i <= repeatSettings.repeatCount; i++) {
        //Add restSet if needed
        if (repeatSettings.addRestSets) {
          let restSetToAdd = Object.assign({}, this.restSet); //copy object
          //var restSetToAdd = this.restSet;

          this.workoutPlanDetail.exercisesPlanned.push(restSetToAdd);
        }

        for (var p = 0; p < this.selectedItems.length; p++) {
          // this.selectedItems.forEach((selectedItem) => {
          //temporary exercises to add
          var exercise;

          exercise = JSON.parse(
            JSON.stringify(
              this.workoutPlanDetail.exercisesPlanned[this.selectedItems[p]]
            )
          );
          // this.workoutPlanDetail.exercisesPlanned[this.selectedItems[p]];

          exercise.exerciseTargetCount = Math.round(
            Math.pow(repeatSettings.multiplierRepsTime, i) *
            exercise.exerciseTargetCount
          );

          exercise.weightExtra = Math.round(
            Math.pow(repeatSettings.multiplierWeight, i) * exercise.weightExtra
          );

          //add rest if needed
          if (
            (this.workoutPlanDetail.exercisesPlanned.length > 0 &&
              this.workoutPlanDetail.exercisesPlanned[
                this.workoutPlanDetail.exercisesPlanned.length - 1
              ].displayType === "Reps") ||
            this.workoutPlanDetail.exercisesPlanned[
              this.workoutPlanDetail.exercisesPlanned.length - 1
            ].displayType === "Hold"
          ) {
            let restToAdd = Object.assign({}, this.rest); //copy object
            //var restToAdd = this.rest;

            restToAdd.estimateDuration = repeatSettings.restTime;
            this.workoutPlanDetail.exercisesPlanned.push(restToAdd);
          }

          //add the exercise
          this.workoutPlanDetail.exercisesPlanned.push(exercise);
        }
      }

      //Tidy up and refresh
      this.clearSelectedItems();
      this.updateSeqNum();
      this.updateSummaries();
      this.$refs.listView.refresh();
      this.forceRerender();
    },

    saveWorkout() {
      this.uploadWorkout();
      Dialogs.alert({
        title: "Workout saved",
        okButtonText: "OK",
      }).then(function () {
        console.log("Workout saved");
      });
    },

    uploadWorkout() {
      console.log("Workout upload start");

      const userId = ApplicationSettings.getNumber("userId");
      const authToken = ApplicationSettings.getString("userToken");

      console.log("Workout to upload");
      console.log(this.workoutPlanDetail);

      Http.request({
        url: "https://api.repz.app/user/" + userId + "/workoutplan",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
        content: JSON.stringify(this.workoutPlanDetail),
      }).then(
        (response) => {
          console.log("Workout upload complete");
          console.log(response.content.toJSON());
        },

        (e) => {}
      );
    },
    closeWorkout() {
      const actionOptions = {
        title: "Exit Workout",
        cancelButtonText: "Cancel",
        actions: ["Save Workout", "Don't Save Workout"],
        cancelable: true, // Android only
      };

      action(actionOptions).then((result) => {
        console.log(result);

        if (result == "Save Workout") {
          this.uploadWorkout();
          this.navigateToWorkouts();
        } else if (result == "Don't Save Workout") {
          this.navigateToWorkouts();
        }
      });
    },

    onItemTap({
      index,
      data,
      object
    }) {
      console.log(
        `Tapped on ${this.workoutPlanDetail.exercisesPlanned[index].exerciseHeading} at index ${index}`
      );
      if (this.workoutPlanDetail.exercisesPlanned[index].repsOrHold == "Reps") {
        this.showEditExerciseReps(
          this.workoutPlanDetail.exercisesPlanned[index]
        );
      } else if (
        this.workoutPlanDetail.exercisesPlanned[index].repsOrHold == "Hold"
      ) {
        this.showEditExerciseHold(
          this.workoutPlanDetail.exercisesPlanned[index]
        );
      } else if (
        this.workoutPlanDetail.exercisesPlanned[index].repsOrHold == "Warmup"
      ) {
        this.showEditWarmup(this.workoutPlanDetail.exercisesPlanned[index]);
      } else if (
        this.workoutPlanDetail.exercisesPlanned[index].repsOrHold == "Rest" ||
        this.workoutPlanDetail.exercisesPlanned[index].repsOrHold == "RestSet"
      ) {
        this.showEditRest(this.workoutPlanDetail.exercisesPlanned[index]);
      }
    },

    onItemReordered({
      index,
      data,
      object
    }) {
      console.log(`Item reordered from index ${index} to ${data.targetIndex}`);
      this.updateSelected();
    },

    onSwipeStarted({
      data,
      object
    }) {
      console.log(`Swipe started`);
      const swipeLimits = data.swipeLimits;
      const swipeView = object;
      const leftItem = swipeView.getViewById("add-view");
      const rightItem = swipeView.getViewById("delete-view");
      swipeLimits.left = leftItem.getMeasuredWidth();
      swipeLimits.right = rightItem.getMeasuredWidth();
      swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
    },

    onLeftSwipeClick(event) {
      console.log("left action tapped");
      this.duplicateExercise(this.exercise);
      this.$refs.listView.notifySwipeToExecuteFinished();
    },
    onRightSwipeClick({
      object
    }) {
      console.log("right action tapped");
      // remove item
      this.itemList.splice(this.itemList.indexOf(object.bindingContext), 1);
      this.$refs.listView.notifySwipeToExecuteFinished();
    },
  },
  data() {
    return {
      renderComponent: true,
      selectedItems: [],
      selectedTabViewWb: 1,

      userProfile: {},

      workoutPlanDetail: {
        workoutPlanID: null,
        workoutPlanName: "New Workout Name",
        author: "",
        authorID: null,
        muscleZones: [],
        difficultyLevels: [],
        equipment: [],
        setsPlannedTotal: 0,
        exercisesPlannedTotal: 0,
        objectivesDescription: "",
        projectedDuration: 0,
        projectedCalories: 0,
        exercisesPlanned: [{
          workoutPlanID: null,
          seqNum: 0,
          exerciseID: 0,
          repsOrHold: "Warmup",
          exerciseSet: 0,
          exerciseHeading: "Warmup & Stretch",
          exerciseSubType: "Get those muscles ready",
          exerciseTargetCount: 0,
          exercisePace: "Normal",
          weightExtra: 0,
          weightDisplayImperial: false,
          estimateDuration: 90,
          estimateCalories: 20,
          exerciseType: "Warmup",
          displayType: "Warmup",
          isSetHeader: true,
          exerciseImage: "LinkToStreches",
        }, ],
      },

      rest: {
        workoutPlanID: null,
        seqNum: 0,
        exerciseID: 1,
        repsOrHold: "Rest",
        exerciseSet: 0,
        exerciseHeading: "Rest",
        exerciseSubType: "Let those muscles recover",
        exerciseTargetCount: 0,
        exercisePace: "Normal",
        weightExtra: 0,
        weightDisplayImperial: false,
        estimateDuration: 120,
        estimateCalories: 0,
        exerciseType: "Rest",
        displayType: "Rest",
        isSetHeader: false,
        exerciseImage: "LinkToRest",
      },
      restSet: {
        workoutPlanID: null,
        seqNum: 0,
        exerciseID: 2,
        repsOrHold: "RestSet",
        exerciseSet: 0,
        exerciseHeading: "Rest Between Sets",
        exerciseSubType: "Take a breather",
        exerciseTargetCount: 0,
        exercisePace: "Normal",
        weightExtra: 0,
        weightDisplayImperial: false,
        estimateDuration: 120,
        estimateCalories: 0,
        exerciseType: "Restset",
        displayType: "Restset",
        isSetHeader: true,
        exerciseImage: "LinkToRestSet",
      },
    };
  },
};
