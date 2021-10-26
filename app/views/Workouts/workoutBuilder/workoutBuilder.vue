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
          col="1"
          row="0"
          class="text -xlarge -bold -default -left"
          editable="true"
          isEnabled="true"
          :text="workoutPlanDetail.workoutPlanName"
          keyboardType="email"
          returnKeyType="done"
          hint="New Workout Name"
          marginTop="0"
          maxLength="50"
        />
        <Label row="0" class="line" col="1" />
        <Label
          row="0"
          col="1"
          class="text -xlarge -bold -primary -right"
          textwrap="false"
          :text="Math.round(workoutPlanDetail.projectedDuration / 60) + ' min'"
        />
      </GridLayout>
      <RadListView
        v-if="renderComponent"
        ref="listView"
        row="1"
        col="0"
        for="exercise in exercisesPlanned"
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

import wbEditExercise from "./modals/wbEditExercise/wbEditExercise";
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

export default {
  mixins: [navControls],
  computed: {
    workoutTime: function () {
      return this.exercisesPlanned.length * 2;
    },
  },

  mounted() {
    const userId = ApplicationSettings.getNumber("userId");
    const authToken = ApplicationSettings.getString("userToken");

    this.userID = userId;

    if (this.authorID == null) {
      this.authorID = userId;
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
      },
      (e) => {}
    );

    this.author = this.userProfile.userName;

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
      this.exercisesPlanned.push(args);

      //this.selectedTabViewWb = 1;
    },
    loadExerciseBrowser() {
      this.showExerciseBrowser();
    },
    onPullToRefreshInitiated({ object }) {
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
      this.exercisesPlanned.forEach(function (item, index) {
        item.seqNum = index;
        console.log(item, index);
      });
    },
    clearSelectedItems() {
      while (this.selectedItems.length) {
        this.selectedItems.pop();
      }
    },
    duplicateExercise(exerciseToAdd) {
      this.exercisesPlanned.push(exerciseToAdd);
      console.log("Exercise added: " + JSON.stringify(exerciseToAdd));
      this.clearSelectedItems();
      this.updateSeqNum();
      this.$refs.listView.refresh();
      console.log(
        "Exercises Planned: " + JSON.stringify(this.exercisesPlanned)
      );
    },
    addExercise(exerciseToAdd) {
      this.exercisesPlanned.push(exerciseToAdd);
      console.log("Exercise added: " + JSON.stringify(exerciseToAdd));
      this.clearSelectedItems();
      this.updateSeqNum();
      this.$refs.listView.refresh();
      console.log(
        "Exercises Planned: " + JSON.stringify(this.exercisesPlanned)
      );
    },

    addRest(restToAdd) {
      this.exercisesPlanned.push(restToAdd);
      console.log("Rest added: " + JSON.stringify(restToAdd));
      this.clearSelectedItems();
      this.updateSeqNum();
      this.$refs.listView.refresh();
      console.log(
        "Exercises Planned: " + JSON.stringify(this.exercisesPlanned)
      );
    },

    addRestSet(restSetToAdd) {
      this.exercisesPlanned.push(restSetToAdd);
      console.log("RestSet added: " + JSON.stringify(restSetToAdd));
      this.clearSelectedItems();
      this.updateSeqNum();
      this.$refs.listView.refresh();
      console.log(
        "Exercises Planned: " + JSON.stringify(this.exercisesPlanned)
      );
    },

    deleteExercise(index) {
      this.selectedItems.splice(index, 1);
      this.clearSelectedItems();
      this.updateSeqNum();
      this.$refs.listView.refresh();
      console.log(
        "Exercises Planned: " + JSON.stringify(this.exercisesPlanned)
      );
    },

    reorderExercise(indexOld, indexNew) {
      this.exercisesPlanned.splice(indexNew, 0, this.selectedItems[indexOld]);
      this.exercisesPlanned.splice(indexOld, 1);
      this.$refs.listView.refresh();
      console.log(
        "Exercises Planned: " + JSON.stringify(this.exercisesPlanned)
      );
    },

    repeatSelected(
      index,
      repeatCount,
      repsReducer,
      includeRestsPeriods,
      weightReducer,
      intraSetRest
    ) {},

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
      (this.exercisesPlanned[index].exerciseTargetCount = exerciseTargetCount),
        (this.exercisesPlanned[index].exercisePace = exercisePace),
        (this.exercisesPlanned[index].weightExtra = weightExtra);
    },

    editRest(index, restTargetCount) {
      this.exercisesPlanned[index].exerciseTargetCount = restTargetCount;
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
    updateProjectedTime() {
      this.projectedDuration = this.projectedDuration + 1;
    },
    updateProjectedCalories() {
      this.projectedCalories = this.projectedCalories + 1;
    },

    updateMuscleZones() {
      while (this.muscleZones.length) {
        this.muscleZones.pop();
      }

      this.exercisesPlanned.forEach(function (item, index) {
        item.muscleZones.forEach(function (muscle) {
          if (!this.selectedItems.indexOf(muscle)) {
            this.muscleZones.push(muscle);
          }
        });
      });

      console.log(muscleZones);
    },

    showEditRest() {
      this.$showModal(wbEditRest, {
        fullscreen: true,
        animated: true,
        stretched: false,
        dimAmount: 0.5,
        ios: {
          presentationStyle: UIModalPresentationStyle.BlurOverFullScreen,
        },
      });
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
          this.addRest(this.rest);
          this.addExercise(result[i]);
          this.$refs.listView.refresh();
        }
        console.log(this.exercisesPlanned);

        this.$refs.listView.refresh();
        this.forceRerender();
      });
    },
    showEditExercise() {
      this.$showModal(wbEditExercise, {
        fullscreen: true,
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
      this.$showModal(wbEditRepeat, {
        fullscreen: true,
        animated: true,
        stretched: false,
        dimAmount: 0.5,
        ios: {
          presentationStyle: UIModalPresentationStyle.BlurOverFullScreen,
        },
      });
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
      console.log("Workout upload complete");
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

    onItemTap({ index, data, object }) {
      console.log(
        `Tapped on ${this.exercisesPlanned[index].exerciseHeading} at index ${index}`
      );
    },
    onItemReordered({ index, data, object }) {
      console.log(`Item reordered from index ${index} to ${data.targetIndex}`);
      this.updateSelected();
    },

    onSwipeStarted({ data, object }) {
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
    onRightSwipeClick({ object }) {
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
        workoutPlanName: "New Workout",
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
        exercisesPlanned: [],
      },

      // projectedCalories: 0,
      // projectedDuration: 0,
      // workoutName: "New Workout",
      // muscleZones: "",

      //   userID: 1,
      //   workoutPlanID: 0,
      //   workoutPlanName: "workoutplanname",
      //   author: "author",
      //   authorID: 1,
      //   muscleZones: ["Arms", "Chest", "Core"],
      //   difficultyLevels: ["Foundation", "Intermediate"],
      //   equipment: ["bar", "bench", "paralettes"],
      //   setsPlannedTotal: 3,
      //   exercisesPlannedTotal: 10,
      //   objectivesDescription: "objectivesdescription",
      //   projectedDuration: 56,
      //   projectedCalories: 354,
      //   timeStart: "",
      //   timeEnd: "",
      //   timeEstimatedCompleted: null,
      //   progressPercentage: 50,
      //   currentDuration: 35,
      //   timeRemaining: 13,
      //   exercisesCompleted: 3,
      //   setsCompleted: 1,
      //   energyBurned: 12,
      // },

      // exercise: {
      //   workoutRecordedID: 150,
      //   seqNum: 2,
      //   exerciseID: 6,
      //   repsOrHold: "Reps",
      //   exerciseSet: 1,
      //   exerciseHeading: "Dips",
      //   exerciseSubType: "Weighted",
      //   exerciseTargetCount: 15,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 0,
      //   weightDisplayImperial: false,
      //   estimateDuration: 34,
      //   estimateCalories: 34,
      //   exerciseType: "Reps",
      //   displayType: "Reps",
      //   isSetHeader: true,
      //   exerciseImage:
      //     "https://repz-resources.ams3.digitaloceanspaces.com/exercises/EX000003/thmb_ex00003_01@3x.png",
      // },
      // exercise2: {
      //   workoutRecordedID: 150,
      //   seqNum: 2,
      //   exerciseID: 6,
      //   repsOrHold: "Reps",
      //   exerciseSet: 1,
      //   exerciseHeading: "Dips",
      //   exerciseSubType: "Weighted",
      //   exerciseTargetCount: 15,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 0,
      //   weightDisplayImperial: false,
      //   estimateDuration: 34,
      //   estimateCalories: 34,
      //   exerciseType: "Reps",
      //   displayType: "Reps",
      //   isSetHeader: false,
      //   exerciseImage:
      //     "https://repz-resources.ams3.digitaloceanspaces.com/exercises/EX000003/thmb_ex00003_01@3x.png",
      // },
      // rest: {
      //   workoutPlanID: 0,
      //   seqNum: 0,
      //   exerciseID: 1,
      //   repsOrHold: "Rest",
      //   exerciseSet: 0,
      //   exerciseHeading: "Rest",
      //   exerciseSubType: "Let those muscles recover",
      //   exerciseTargetCount: 0,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 0,
      //   weightDisplayImperial: false,
      //   estimateDuration: 30,
      //   estimateCalories: 0,
      //   exerciseType: "Rest",
      //   displayType: "Rest",
      //   isSetHeader: false,
      //   exerciseImage: "LinkToRest",
      // },
      // restSet: {
      //   workoutPlanID: 0,
      //   seqNum: 0,
      //   exerciseID: 2,
      //   repsOrHold: "RestSet",
      //   exerciseSet: 0,
      //   exerciseHeading: "Rest Between Sets",
      //   exerciseSubType: "Take a breather",
      //   exerciseTargetCount: 0,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 0,
      //   weightDisplayImperial: false,
      //   estimateDuration: 90,
      //   estimateCalories: 0,
      //   exerciseType: "Restset",
      //   displayType: "Restset",
      //   isSetHeader: true,
      //   exerciseImage: "LinkToRestSet",
      // },

      // exercisesPlanned: [
      // {
      //   workoutRecordedID: 150,
      //   seqNum: 1,
      //   exerciseID: 0,
      //   repsOrHold: "Warmup",
      //   exerciseSet: 0,
      //   exerciseHeading: "Warmup & Stretch",
      //   exerciseSubType: "Get those muscles ready",
      //   exerciseTargetCount: 0,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 0,
      //   weightDisplayImperial: false,
      //   estimateDuration: 90,
      //   estimateCalories: 20,
      //   exerciseType: "Warmup",
      //   displayType: "Warmup",
      //   isSetHeader: true,
      //   exerciseImage: "LinkToStreches",
      //   isCompleted: true,
      //   timeStart: "2021-01-18T06:44:53.485Z",
      //   timeEnd: "2021-01-18T06:44:54.792Z",
      //   duration: 1,
      //   completedCount: 0,
      // },
      // {
      //   workoutRecordedID: 150,
      //   seqNum: 2,
      //   exerciseID: 6,
      //   repsOrHold: "Reps",
      //   exerciseSet: 1,
      //   exerciseHeading: "Dips",
      //   exerciseSubType: "Weighted",
      //   exerciseTargetCount: 15,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 0,
      //   weightDisplayImperial: false,
      //   estimateDuration: 34,
      //   estimateCalories: 34,
      //   exerciseType: "Reps",
      //   displayType: "Reps",
      //   isSetHeader: false,
      //   exerciseImage:
      //     "https://repz-resources.ams3.digitaloceanspaces.com/exercises/EX000003/thmb_ex00003_01@3x.png",
      //   isCompleted: true,
      //   timeStart: "2021-01-18T06:44:54.798Z",
      //   timeEnd: "2021-01-18T06:44:55.456Z",
      //   duration: 0,
      //   completedCount: 15,
      // },
      // {
      //   workoutRecordedID: 150,
      //   seqNum: 3,
      //   exerciseID: 1,
      //   repsOrHold: "Rest",
      //   exerciseSet: 1,
      //   exerciseHeading: "Rest",
      //   exerciseSubType: "Let those muscles recover",
      //   exerciseTargetCount: 0,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 0,
      //   weightDisplayImperial: false,
      //   estimateDuration: 30,
      //   estimateCalories: 0,
      //   exerciseType: "Rest",
      //   displayType: "Rest",
      //   isSetHeader: false,
      //   exerciseImage: "LinkToRest",
      //   isCompleted: true,
      //   timeStart: "2021-01-18T06:44:55.461Z",
      //   timeEnd: "2021-01-18T06:44:55.749Z",
      //   duration: 0,
      //   completedCount: 0,
      // },
      // {
      //   workoutRecordedID: 150,
      //   seqNum: 4,
      //   exerciseID: 5,
      //   repsOrHold: "Reps",
      //   exerciseSet: 1,
      //   exerciseHeading: "Pullups - Inverted L-Sit",
      //   exerciseSubType: "Normal Grip",
      //   exerciseTargetCount: 15,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 0,
      //   weightDisplayImperial: false,
      //   estimateDuration: 34,
      //   estimateCalories: 34,
      //   exerciseType: "Reps",
      //   displayType: "Reps",
      //   isSetHeader: false,
      //   exerciseImage:
      //     "https://repz-resources.ams3.digitaloceanspaces.com/exercises/EX000002/thmb_ex00002_01@3x.png",
      //   isCompleted: true,
      //   timeStart: "2021-01-18T06:44:55.753Z",
      //   timeEnd: "2021-01-18T06:44:56.041Z",
      //   duration: 0,
      //   completedCount: 15,
      // },
      // {
      //   workoutRecordedID: 150,
      //   seqNum: 5,
      //   exerciseID: 1,
      //   repsOrHold: "Rest",
      //   exerciseSet: 1,
      //   exerciseHeading: "Rest",
      //   exerciseSubType: "Let those muscles recover",
      //   exerciseTargetCount: 0,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 0,
      //   weightDisplayImperial: false,
      //   estimateDuration: 30,
      //   estimateCalories: 0,
      //   exerciseType: "Rest",
      //   displayType: "Rest",
      //   isSetHeader: false,
      //   exerciseImage: "LinkToRest",
      //   isCompleted: true,
      //   timeStart: "2021-01-18T06:44:56.045Z",
      //   timeEnd: "2021-01-18T06:44:56.266Z",
      //   duration: 0,
      //   completedCount: 0,
      // },
      // {
      //   workoutRecordedID: 150,
      //   seqNum: 6,
      //   exerciseID: 4,
      //   repsOrHold: "Reps",
      //   exerciseSet: 1,
      //   exerciseHeading: "Pullups",
      //   exerciseSubType: "Wide-Grip",
      //   exerciseTargetCount: 12,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 0,
      //   weightDisplayImperial: false,
      //   estimateDuration: 28,
      //   estimateCalories: 28,
      //   exerciseType: "Reps",
      //   displayType: "Reps",
      //   isSetHeader: false,
      //   exerciseImage:
      //     "https://repz-resources.ams3.digitaloceanspaces.com/exercises/EX000001/thmb_ex00001_01@3x.png",
      //   isCompleted: true,
      //   timeStart: "2021-01-18T06:44:56.272Z",
      //   timeEnd: "2021-01-18T06:44:56.435Z",
      //   duration: 0,
      //   completedCount: 12,
      // },
      // {
      //   workoutRecordedID: 150,
      //   seqNum: 7,
      //   exerciseID: 2,
      //   repsOrHold: "RestSet",
      //   exerciseSet: 2,
      //   exerciseHeading: "Rest Between Sets",
      //   exerciseSubType: "Take a breather",
      //   exerciseTargetCount: 0,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 0,
      //   weightDisplayImperial: false,
      //   estimateDuration: 90,
      //   estimateCalories: 0,
      //   exerciseType: "Restset",
      //   displayType: "Restset",
      //   isSetHeader: true,
      //   exerciseImage: "LinkToRestSet",
      //   isCompleted: true,
      //   timeStart: "2021-01-18T06:44:56.438Z",
      //   timeEnd: "2021-01-18T06:44:56.649Z",
      //   duration: 0,
      //   completedCount: 0,
      // },
      // {
      //   workoutRecordedID: 150,
      //   seqNum: 8,
      //   exerciseID: 6,
      //   repsOrHold: "Reps",
      //   exerciseSet: 2,
      //   exerciseHeading: "Dips - Weighted",
      //   exerciseSubType: "Weighted",
      //   exerciseTargetCount: 5,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 50,
      //   weightDisplayImperial: false,
      //   estimateDuration: 17,
      //   estimateCalories: 34,
      //   exerciseType: "Reps",
      //   displayType: "Reps",
      //   isSetHeader: true,
      //   exerciseImage:
      //     "https://repz-resources.ams3.digitaloceanspaces.com/exercises/EX000003/thmb_ex00003_01@3x.png",
      //   isCompleted: true,
      //   timeStart: "2021-01-18T06:44:56.653Z",
      //   timeEnd: "2021-01-18T06:44:56.84Z",
      //   duration: 0,
      //   completedCount: 5,
      // },
      // {
      //   workoutRecordedID: 150,
      //   seqNum: 9,
      //   exerciseID: 1,
      //   repsOrHold: "Rest",
      //   exerciseSet: 2,
      //   exerciseHeading: "Rest",
      //   exerciseSubType: "Let those muscles recover",
      //   exerciseTargetCount: 0,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 0,
      //   weightDisplayImperial: false,
      //   estimateDuration: 30,
      //   estimateCalories: 0,
      //   exerciseType: "Rest",
      //   displayType: "Rest",
      //   isSetHeader: false,
      //   exerciseImage: "LinkToRest",
      //   isCompleted: true,
      //   timeStart: "2021-01-18T06:44:56.844Z",
      //   timeEnd: "2021-01-18T06:44:57.054Z",
      //   duration: 0,
      //   completedCount: 0,
      // },
      // {
      //   workoutRecordedID: 150,
      //   seqNum: 10,
      //   exerciseID: 4,
      //   repsOrHold: "Reps",
      //   exerciseSet: 2,
      //   exerciseHeading: "Pullups - Weighted",
      //   exerciseSubType: "Wide-Grip",
      //   exerciseTargetCount: 3,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 50,
      //   weightDisplayImperial: false,
      //   estimateDuration: 17,
      //   estimateCalories: 34,
      //   exerciseType: "Reps",
      //   displayType: "Reps",
      //   isSetHeader: false,
      //   exerciseImage:
      //     "https://repz-resources.ams3.digitaloceanspaces.com/exercises/EX000001/thmb_ex00001_01@3x.png",
      //   isCompleted: true,
      //   timeStart: "2021-01-18T06:44:57.058Z",
      //   timeEnd: "2021-01-18T06:44:57.335Z",
      //   duration: 0,
      //   completedCount: 3,
      // },
      // {
      //   workoutRecordedID: 150,
      //   seqNum: 11,
      //   exerciseID: 2,
      //   repsOrHold: "RestSet",
      //   exerciseSet: 3,
      //   exerciseHeading: "Rest Between Sets",
      //   exerciseSubType: "Take a breather",
      //   exerciseTargetCount: 0,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 0,
      //   weightDisplayImperial: false,
      //   estimateDuration: 90,
      //   estimateCalories: 0,
      //   exerciseType: "Restset",
      //   displayType: "Restset",
      //   isSetHeader: true,
      //   exerciseImage: "LinkToRestSet",
      //   isCompleted: true,
      //   timeStart: "2021-01-18T06:44:57.339Z",
      //   timeEnd: "2021-01-18T06:44:57.684Z",
      //   duration: 0,
      //   completedCount: 0,
      // },
      // {
      //   workoutRecordedID: 150,
      //   seqNum: 12,
      //   exerciseID: 6,
      //   repsOrHold: "Reps",
      //   exerciseSet: 3,
      //   exerciseHeading: "Dips - Weighted",
      //   exerciseSubType: "Weighted",
      //   exerciseTargetCount: 10,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 35,
      //   weightDisplayImperial: false,
      //   estimateDuration: 17,
      //   estimateCalories: 34,
      //   exerciseType: "Reps",
      //   displayType: "Reps",
      //   isSetHeader: false,
      //   exerciseImage:
      //     "https://repz-resources.ams3.digitaloceanspaces.com/exercises/EX000003/thmb_ex00003_01@3x.png",
      //   isCompleted: true,
      //   timeStart: "2021-01-18T06:44:57.689Z",
      //   timeEnd: "2021-01-18T06:44:57.875Z",
      //   duration: 0,
      //   completedCount: 10,
      // },
      // {
      //   workoutRecordedID: 150,
      //   seqNum: 13,
      //   exerciseID: 1,
      //   repsOrHold: "Rest",
      //   exerciseSet: 3,
      //   exerciseHeading: "Rest",
      //   exerciseSubType: "Let those muscles recover",
      //   exerciseTargetCount: 0,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 0,
      //   weightDisplayImperial: false,
      //   estimateDuration: 30,
      //   estimateCalories: 0,
      //   exerciseType: "Rest",
      //   displayType: "Rest",
      //   isSetHeader: false,
      //   exerciseImage: "LinkToRest",
      //   isCompleted: true,
      //   timeStart: "2021-01-18T06:44:57.879Z",
      //   timeEnd: "2021-01-18T06:44:58.089Z",
      //   duration: 0,
      //   completedCount: 0,
      // },
      // {
      //   workoutRecordedID: 150,
      //   seqNum: 14,
      //   exerciseID: 4,
      //   repsOrHold: "Reps",
      //   exerciseSet: 3,
      //   exerciseHeading: "Pullups - Weighted",
      //   exerciseSubType: "Wide-Grip",
      //   exerciseTargetCount: 7,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 35,
      //   weightDisplayImperial: false,
      //   estimateDuration: 17,
      //   estimateCalories: 34,
      //   exerciseType: "Reps",
      //   displayType: "Reps",
      //   isSetHeader: false,
      //   exerciseImage:
      //     "https://repz-resources.ams3.digitaloceanspaces.com/exercises/EX000001/thmb_ex00001_01@3x.png",
      //   isCompleted: true,
      //   timeStart: "2021-01-18T06:44:58.092Z",
      //   timeEnd: "2021-01-18T06:44:58.269Z",
      //   duration: 0,
      //   completedCount: 7,
      // },
      // {
      //   workoutRecordedID: 150,
      //   seqNum: 15,
      //   exerciseID: 2,
      //   repsOrHold: "RestSet",
      //   exerciseSet: 4,
      //   exerciseHeading: "Rest Between Sets",
      //   exerciseSubType: "Take a breather",
      //   exerciseTargetCount: 0,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 0,
      //   weightDisplayImperial: false,
      //   estimateDuration: 90,
      //   estimateCalories: 0,
      //   exerciseType: "Restset",
      //   displayType: "Restset",
      //   isSetHeader: true,
      //   exerciseImage: "LinkToRestSet",
      //   isCompleted: true,
      //   timeStart: "2021-01-18T06:44:58.272Z",
      //   timeEnd: "2021-01-18T06:44:58.438Z",
      //   duration: 0,
      //   completedCount: 0,
      // },
      // {
      //   workoutRecordedID: 150,
      //   seqNum: 16,
      //   exerciseID: 6,
      //   repsOrHold: "Reps",
      //   exerciseSet: 4,
      //   exerciseHeading: "Dips - Weighted",
      //   exerciseSubType: "Weighted",
      //   exerciseTargetCount: 9,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 35,
      //   weightDisplayImperial: false,
      //   estimateDuration: 17,
      //   estimateCalories: 34,
      //   exerciseType: "Reps",
      //   displayType: "Reps",
      //   isSetHeader: false,
      //   exerciseImage:
      //     "https://repz-resources.ams3.digitaloceanspaces.com/exercises/EX000003/thmb_ex00003_01@3x.png",
      //   isCompleted: true,
      //   timeStart: "2021-01-18T06:44:58.441Z",
      //   timeEnd: "2021-01-18T06:44:58.618Z",
      //   duration: 0,
      //   completedCount: 9,
      // },
      // {
      //   workoutRecordedID: 150,
      //   seqNum: 17,
      //   exerciseID: 1,
      //   repsOrHold: "Rest",
      //   exerciseSet: 4,
      //   exerciseHeading: "Rest",
      //   exerciseSubType: "Let those muscles recover",
      //   exerciseTargetCount: 0,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 0,
      //   weightDisplayImperial: false,
      //   estimateDuration: 30,
      //   estimateCalories: 0,
      //   exerciseType: "Rest",
      //   displayType: "Rest",
      //   isSetHeader: false,
      //   exerciseImage: "LinkToRest",
      //   isCompleted: true,
      //   timeStart: "2021-01-18T06:44:58.621Z",
      //   timeEnd: "2021-01-18T06:44:58.797Z",
      //   duration: 0,
      //   completedCount: 0,
      // },
      // {
      //   workoutRecordedID: 150,
      //   seqNum: 18,
      //   exerciseID: 4,
      //   repsOrHold: "Reps",
      //   exerciseSet: 4,
      //   exerciseHeading: "Pullups - Weighted",
      //   exerciseSubType: "Wide-Grip",
      //   exerciseTargetCount: 6,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 35,
      //   weightDisplayImperial: false,
      //   estimateDuration: 17,
      //   estimateCalories: 34,
      //   exerciseType: "Reps",
      //   displayType: "Reps",
      //   isSetHeader: false,
      //   exerciseImage:
      //     "https://repz-resources.ams3.digitaloceanspaces.com/exercises/EX000001/thmb_ex00001_01@3x.png",
      //   isCompleted: true,
      //   timeStart: "2021-01-18T06:44:58.801Z",
      //   timeEnd: "2021-01-18T06:44:58.966Z",
      //   duration: 0,
      //   completedCount: 6,
      // },
      // {
      //   workoutRecordedID: 150,
      //   seqNum: 19,
      //   exerciseID: 2,
      //   repsOrHold: "RestSet",
      //   exerciseSet: 5,
      //   exerciseHeading: "Rest Between Sets",
      //   exerciseSubType: "Take a breather",
      //   exerciseTargetCount: 0,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 0,
      //   weightDisplayImperial: false,
      //   estimateDuration: 90,
      //   estimateCalories: 0,
      //   exerciseType: "Restset",
      //   displayType: "Restset",
      //   isSetHeader: true,
      //   exerciseImage: "LinkToRestSet",
      //   isCompleted: true,
      //   timeStart: "2021-01-18T06:44:58.969Z",
      //   timeEnd: "2021-01-18T06:44:59.124Z",
      //   duration: 0,
      //   completedCount: 0,
      // },
      // {
      //   workoutRecordedID: 150,
      //   seqNum: 20,
      //   exerciseID: 6,
      //   repsOrHold: "Reps",
      //   exerciseSet: 5,
      //   exerciseHeading: "Dips - Weighted",
      //   exerciseSubType: "Weighted",
      //   exerciseTargetCount: 7,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 35,
      //   weightDisplayImperial: false,
      //   estimateDuration: 17,
      //   estimateCalories: 34,
      //   exerciseType: "Reps",
      //   displayType: "Reps",
      //   isSetHeader: false,
      //   exerciseImage:
      //     "https://repz-resources.ams3.digitaloceanspaces.com/exercises/EX000003/thmb_ex00003_01@3x.png",
      //   isCompleted: true,
      //   timeStart: "2021-01-18T06:44:59.131Z",
      //   timeEnd: "2021-01-18T06:44:59.304Z",
      //   duration: 0,
      //   completedCount: 7,
      // },
      // {
      //   workoutRecordedID: 150,
      //   seqNum: 21,
      //   exerciseID: 1,
      //   repsOrHold: "Rest",
      //   exerciseSet: 5,
      //   exerciseHeading: "Rest",
      //   exerciseSubType: "Let those muscles recover",
      //   exerciseTargetCount: 0,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 0,
      //   weightDisplayImperial: false,
      //   estimateDuration: 30,
      //   estimateCalories: 0,
      //   exerciseType: "Rest",
      //   displayType: "Rest",
      //   isSetHeader: false,
      //   exerciseImage: "LinkToRest",
      //   isCompleted: true,
      //   timeStart: "2021-01-18T06:44:59.308Z",
      //   timeEnd: "2021-01-18T06:44:59.461Z",
      //   duration: 0,
      //   completedCount: 0,
      // },
      // {
      //   workoutRecordedID: 150,
      //   seqNum: 22,
      //   exerciseID: 4,
      //   repsOrHold: "Reps",
      //   exerciseSet: 5,
      //   exerciseHeading: "Pullups - Weighted",
      //   exerciseSubType: "Wide-Grip",
      //   exerciseTargetCount: 5,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 35,
      //   weightDisplayImperial: false,
      //   estimateDuration: 17,
      //   estimateCalories: 34,
      //   exerciseType: "Reps",
      //   displayType: "Reps",
      //   isSetHeader: false,
      //   exerciseImage:
      //     "https://repz-resources.ams3.digitaloceanspaces.com/exercises/EX000001/thmb_ex00001_01@3x.png",
      //   isCompleted: true,
      //   timeStart: "2021-01-18T06:44:59.466Z",
      //   timeEnd: "2021-01-18T06:44:59.608Z",
      //   duration: 0,
      //   completedCount: 5,
      // },
      // {
      //   workoutRecordedID: 150,
      //   seqNum: 23,
      //   exerciseID: 2,
      //   repsOrHold: "RestSet",
      //   exerciseSet: 6,
      //   exerciseHeading: "Rest Between Sets",
      //   exerciseSubType: "Take a breather",
      //   exerciseTargetCount: 0,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 0,
      //   weightDisplayImperial: false,
      //   estimateDuration: 90,
      //   estimateCalories: 0,
      //   exerciseType: "Restset",
      //   displayType: "Restset",
      //   isSetHeader: true,
      //   exerciseImage: "LinkToRestSet",
      //   isCompleted: true,
      //   timeStart: "2021-01-18T06:44:59.612Z",
      //   timeEnd: "2021-01-18T06:44:59.923Z",
      //   duration: 0,
      //   completedCount: 0,
      // },
      // {
      //   workoutRecordedID: 150,
      //   seqNum: 24,
      //   exerciseID: 6,
      //   repsOrHold: "Reps",
      //   exerciseSet: 6,
      //   exerciseHeading: "Dips - Weighted",
      //   exerciseSubType: "Weighted",
      //   exerciseTargetCount: 7,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 35,
      //   weightDisplayImperial: false,
      //   estimateDuration: 17,
      //   estimateCalories: 34,
      //   exerciseType: "Reps",
      //   displayType: "Reps",
      //   isSetHeader: false,
      //   exerciseImage:
      //     "https://repz-resources.ams3.digitaloceanspaces.com/exercises/EX000003/thmb_ex00003_01@3x.png",
      //   isCompleted: true,
      //   timeStart: "2021-01-18T06:44:59.928Z",
      //   timeEnd: "2021-01-18T06:45:00.136Z",
      //   duration: 0,
      //   completedCount: 7,
      // },
      // {
      //   workoutRecordedID: 150,
      //   seqNum: 25,
      //   exerciseID: 1,
      //   repsOrHold: "Rest",
      //   exerciseSet: 6,
      //   exerciseHeading: "Rest",
      //   exerciseSubType: "Let those muscles recover",
      //   exerciseTargetCount: 0,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 0,
      //   weightDisplayImperial: false,
      //   estimateDuration: 30,
      //   estimateCalories: 0,
      //   exerciseType: "Rest",
      //   displayType: "Rest",
      //   isSetHeader: false,
      //   exerciseImage: "LinkToRest",
      //   isCompleted: true,
      //   timeStart: "2021-01-18T06:45:00.141Z",
      //   timeEnd: "2021-01-18T06:45:00.373Z",
      //   duration: 0,
      //   completedCount: 0,
      // },
      // {
      //   workoutRecordedID: 150,
      //   seqNum: 26,
      //   exerciseID: 4,
      //   repsOrHold: "Reps",
      //   exerciseSet: 6,
      //   exerciseHeading: "Pullups - Weighted",
      //   exerciseSubType: "Wide-Grip",
      //   exerciseTargetCount: 4,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 35,
      //   weightDisplayImperial: false,
      //   estimateDuration: 17,
      //   estimateCalories: 34,
      //   exerciseType: "Reps",
      //   displayType: "Reps",
      //   isSetHeader: false,
      //   exerciseImage:
      //     "https://repz-resources.ams3.digitaloceanspaces.com/exercises/EX000001/thmb_ex00001_01@3x.png",
      //   isCompleted: true,
      //   timeStart: "2021-01-18T06:45:00.376Z",
      //   timeEnd: "2021-01-18T06:45:00.541Z",
      //   duration: 0,
      //   completedCount: 4,
      // },
      // {
      //   workoutRecordedID: 150,
      //   seqNum: 27,
      //   exerciseID: 2,
      //   repsOrHold: "RestSet",
      //   exerciseSet: 7,
      //   exerciseHeading: "Rest Between Sets",
      //   exerciseSubType: "Take a breather",
      //   exerciseTargetCount: 0,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 0,
      //   weightDisplayImperial: false,
      //   estimateDuration: 90,
      //   estimateCalories: 0,
      //   exerciseType: "Restset",
      //   displayType: "Restset",
      //   isSetHeader: true,
      //   exerciseImage: "LinkToRestSet",
      //   isCompleted: true,
      //   timeStart: "2021-01-18T06:45:00.545Z",
      //   timeEnd: "2021-01-18T06:45:00.676Z",
      //   duration: 0,
      //   completedCount: 0,
      // },
      // {
      //   workoutRecordedID: 150,
      //   seqNum: 28,
      //   exerciseID: 9,
      //   repsOrHold: "Hold",
      //   exerciseSet: 7,
      //   exerciseHeading: "Front Lever",
      //   exerciseSubType: "Normal Grip",
      //   exerciseTargetCount: 20,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 0,
      //   weightDisplayImperial: false,
      //   estimateDuration: 24,
      //   estimateCalories: 0,
      //   exerciseType: "Hold",
      //   displayType: "Hold",
      //   isSetHeader: false,
      //   exerciseImage:
      //     "https://repz-resources.ams3.digitaloceanspaces.com/exercises/EX000001/thmb_ex00001_01@3x.png",
      //   isCompleted: true,
      //   timeStart: "2021-01-18T06:45:00.683Z",
      //   timeEnd: "2021-01-18T06:45:00.89Z",
      //   duration: 0,
      //   completedCount: 0,
      // },
      // {
      //   workoutRecordedID: 150,
      //   seqNum: 29,
      //   exerciseID: 1,
      //   repsOrHold: "Rest",
      //   exerciseSet: 7,
      //   exerciseHeading: "Rest",
      //   exerciseSubType: "Let those muscles recover",
      //   exerciseTargetCount: 0,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 0,
      //   weightDisplayImperial: false,
      //   estimateDuration: 30,
      //   estimateCalories: 0,
      //   exerciseType: "Rest",
      //   displayType: "Rest",
      //   isSetHeader: false,
      //   exerciseImage: "LinkToRest",
      //   isCompleted: true,
      //   timeStart: "2021-01-18T06:45:00.894Z",
      //   timeEnd: "2021-01-18T06:45:01.07Z",
      //   duration: 0,
      //   completedCount: 0,
      // },
      // {
      //   workoutRecordedID: 150,
      //   seqNum: 30,
      //   exerciseID: 9,
      //   repsOrHold: "Hold",
      //   exerciseSet: 7,
      //   exerciseHeading: "Front Lever",
      //   exerciseSubType: "Normal Grip",
      //   exerciseTargetCount: 15,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 0,
      //   weightDisplayImperial: false,
      //   estimateDuration: 17,
      //   estimateCalories: 0,
      //   exerciseType: "Hold",
      //   displayType: "Hold",
      //   isSetHeader: false,
      //   exerciseImage:
      //     "https://repz-resources.ams3.digitaloceanspaces.com/exercises/EX000001/thmb_ex00001_01@3x.png",
      //   isCompleted: true,
      //   timeStart: "2021-01-18T06:45:01.077Z",
      //   timeEnd: "2021-01-18T06:45:01.273Z",
      //   duration: 0,
      //   completedCount: 0,
      // },
      // {
      //   workoutRecordedID: 150,
      //   seqNum: 31,
      //   exerciseID: 1,
      //   repsOrHold: "Rest",
      //   exerciseSet: 7,
      //   exerciseHeading: "Rest",
      //   exerciseSubType: "Let those muscles recover",
      //   exerciseTargetCount: 0,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 0,
      //   weightDisplayImperial: false,
      //   estimateDuration: 30,
      //   estimateCalories: 0,
      //   exerciseType: "Rest",
      //   displayType: "Rest",
      //   isSetHeader: false,
      //   exerciseImage: "LinkToRest",
      //   isCompleted: true,
      //   timeStart: "2021-01-18T06:45:01.277Z",
      //   timeEnd: "2021-01-18T06:45:01.441Z",
      //   duration: 0,
      //   completedCount: 0,
      // },
      // {
      //   workoutRecordedID: 150,
      //   seqNum: 32,
      //   exerciseID: 9,
      //   repsOrHold: "Hold",
      //   exerciseSet: 7,
      //   exerciseHeading: "Front Lever",
      //   exerciseSubType: "Normal Grip",
      //   exerciseTargetCount: 10,
      //   exerciseRepsPb: 0,
      //   exerciseRepsPbDate: "2020-12-19T00:00:00Z",
      //   exerciseVolumePb: 0,
      //   exerciseVolumePbDate: "1900-01-01T00:00:00Z",
      //   exerciseWeightExraPb: 0,
      //   exerciseWeightExraPbDate: "1900-01-01T00:00:00Z",
      //   exercisePace: "Normal",
      //   weightExtra: 0,
      //   weightDisplayImperial: false,
      //   estimateDuration: 14,
      //   estimateCalories: 0,
      //   exerciseType: "Hold",
      //   displayType: "Hold",
      //   isSetHeader: false,
      //   exerciseImage:
      //     "https://repz-resources.ams3.digitaloceanspaces.com/exercises/EX000001/thmb_ex00001_01@3x.png",
      //   isCompleted: true,
      //   timeStart: "2021-01-18T06:45:01.444Z",
      //   timeEnd: "2021-01-18T06:45:01.632Z",
      //   duration: 0,
      //   completedCount: 0,
      // },
      // ],
      // };
      // },
    };
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
