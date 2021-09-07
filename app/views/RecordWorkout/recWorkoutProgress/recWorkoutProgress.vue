<template>
  <Page class="page" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
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
          text="Upper Body Builder"
          class="wpdetail-heading -h1 -default -right"
          marginRight="20"
          marginTop="0"
        />
      </GridLayout>

      <GridLayout columns="auto" rows="auto,auto" width="90%">
        <Label
          col="0"
          row="0"
          :text="'Completed ' + progressPercentage + '%'"
          class="workoutrecord--heading -h4 -default"
          marginBottom="10"
          marginTop="10"
          fontWeight="bold"
          marginLeft="5"
        />
      </GridLayout>
      <GridLayout rows="auto" columns="auto" width="90%">
        <ContentView
          class="wp-progressbar-outer"
          row="0"
          col="0"
          width="100%"
        />

        <ContentView
          row="0"
          col="0"
          class="wp-progressbar-complete"
          :width="progressPercentage + '%'"
          horizontalAlignment="left"
          verticalAlignment="top"
        />
      </GridLayout>

      <RadListView
        row="1"
        col="0"
        for="exercise in exercisesRecorded"
        layout="list"
        itemReorder="false"
        swipeActions="false"
        orientation="vertical"
        marginTop="0"
        width="90%"
        backgroundColor="transparent"
      >
        <v-template name="header">
          <rwProgressOverview
            marginTop="20"
            marginBottom="0"
            :currentDuration="currentDuration"
            :timeRemaining="timeRemaining"
            :projectedEnd="projectedEnd"
            :energyBurned="energyBurned"
            :exercisesCompleted="exercisesCompleted"
            :setsCompleted="setsCompleted"
          />
        </v-template>

        <v-template if="exercise.displayType  == 'Warmup'">
          <workoutPlanWarmup :exercisePlanned="exercise" marginBottom="5" />
        </v-template>

        <v-template if="exercise.displayType  == 'Warmup_complete'">
          <rwProgressWarmupDone :exercisePlanned="exercise" marginBottom="5" />
        </v-template>

        <v-template>
          <GridLayout rows="auto,*" columns="*"> </GridLayout
        ></v-template>

        <v-template if="exercise.displayType == 'Reps_complete'">
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
            <rwProgressExerciseDone
              row="1"
              col="0"
              :exercisePlanned="exercise"
            />
          </GridLayout>
        </v-template>

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
            <workoutPlanExercise row="1" col="0" :exercisePlanned="exercise" />
          </GridLayout>
        </v-template>

        <v-template if="exercise.displayType == 'Hold_complete'">
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
            <rwProgressExerciseDone
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
            <workoutPlanExercise row="1" col="0" :exercisePlanned="exercise" />
          </GridLayout>
        </v-template>

        <v-template if="exercise.displayType == 'Rest'">
          <workoutPlanRest :exercisePlanned="exercise" />
        </v-template>

        <v-template if="exercise.displayType == 'Rest_complete'">
          <rwProgressRestDone :exercisePlanned="exercise" />
        </v-template>

        <v-template if="exercise.displayType == 'Restset'">
          <workoutPlanRestSet margin="10" :exercisePlanned="exercise" />
        </v-template>

        <v-template if="exercise.displayType == 'Restset_complete'">
          <rwProgressRestSetDone margin="10" :exercisePlanned="exercise" />
        </v-template>

        <!-- <v-template name="header">
          <rwProgressOverview
            marginTop="20"
            marginBottom="0"
            :currentDuration="currentDuration"
            :timeRemaining="timeRemaining"
            :projectedEnd="projectedEnd"
            :energyBurned="energyBurned"
            :exercisesCompleted="exercisesCompleted"
            :setsCompleted="setsCompleted"
          />
        </v-template>

        <v-template if="exercise.displayType  == 'Warmup'">
          <workoutPlanWarmup marginBottom="5" :exercisePlanned="exercise" />
        </v-template>

        <v-template if="exercise.displayType  == 'Warmup_complete'">
          <rwProgressWarmupDone marginBottom="5" :exercisePlanned="exercise" />
        </v-template>

        <v-template if="exercise.displayType == 'Reps_complete'">
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
            <rwProgressExerciseDone
              row="1"
              col="0"
              :exercisePlanned="exercise"
            />
          </GridLayout>
        </v-template> 

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
            <workoutPlanExercise row="1" col="0" :exercisePlanned="exercise" />
          </GridLayout>
        </v-template>

        <v-template if="exercise.displayType == 'Hold_complete'">
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
            <rwProgressExerciseDone
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
              :text="'Set ' + exercise.set"
              class="text -xlarge -bold -default -left"
              marginTop="5"
              marginBottom="5"
              v-show="exercise.isSetHeader"
            />
            <workoutPlanExercise row="1" col="0" :exercisePlanned="exercise" />
          </GridLayout>
        </v-template>

        <v-template if="exercise.displayType == 'Rest_complete'">
          <rwProgressRestDone :exercisePlanned="exercise" />
        </v-template>

        <v-template if="exercise.displayType == 'Rest'">
          <workoutPlanRest :exercisePlanned="exercise" />
        </v-template>

        <v-template if="exercise.displayType == 'RestSet_complete'">
          <rwProgressRestSetDone margin="10" :exercisePlanned="exercise" />
        </v-template>

        <v-template if="exercise.displayType == 'restSet'">
          <workoutPlanRestSet margin="10" :exercisePlanned="exercise" />
        </v-template>
        -->
      </RadListView>
    </StackLayout>
  </Page>
</template>

<script>
import navControls from "../../../mixins/navControls";

import workoutPlanExercise from "../../Workouts/workoutPlanDetail/workoutPlanExercise/workoutPlanExercise";
import workoutPlanRest from "../../Workouts/workoutPlanDetail/workoutPlanRest/workoutPlanRest";
import workoutPlanRestSet from "../../Workouts/workoutPlanDetail/workoutPlanRestSet/workoutPlanRestSet";
import workoutPlanWarmup from "../../Workouts/workoutPlanDetail/workoutPlanWarmup/workoutPlanWarmup";
import rwProgressWarmupDone from "../recWorkoutProgress/rwProgressWarmupDone/rwProgressWarmupDone";
import rwProgressBar from "../recWorkoutProgress/rwProgressBar/rwProgressBar";
import rwProgressExerciseDone from "../recWorkoutProgress/rwProgressExerciseDone/rwProgressExerciseDone";
import rwProgressOverview from "../recWorkoutProgress/rwProgressOverview/rwProgressOverview";
import rwProgressRestDone from "../recWorkoutProgress/rwProgressRestDone/rwProgressRestDone";
import rwProgressRestSetDone from "../recWorkoutProgress/rwProgressRestSetDone/rwProgressRestSetDone";
import exerciseDetail from "../../Exercises/exerciseDetail/exerciseDetail";

export default {
  props: [
    "workoutRecord",
    "workoutName",
    "progressPercentage",
    "currentDuration",
    "timeRemaining",
    "projectedEnd",
    "energyBurned",
    "exercisesCompleted",
    "setsCompleted",
  ],
  mounted() {
    this.exercisesRecorded = this.workoutRecord.exercisesRecorded;
  },
  mixins: [navControls],
  components: {
    workoutPlanExercise,
    workoutPlanRest,
    workoutPlanRestSet,
    rwProgressBar,
    rwProgressExerciseDone,
    rwProgressOverview,
    rwProgressRestDone,
    rwProgressRestSetDone,
    rwProgressWarmupDone,
    workoutPlanWarmup,
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
      exercisesRecorded: [],
      workoutCurrentProgress: 26,
    };
  },
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../../../_app-variables.scss";
// End custom common variables

// Custom styles
.wp-progressbar-outer {
  height: 20;
  border-radius: $border-radius;
  background-color: $container-gradient-dark;
  margin-bottom: 20;
  border-color: $secondary-color;
  border-width: $border-width;
}

.wp-progressbar-complete {
  height: 20;
  border-radius: $border-radius;
  background-color: $gradient-active-dark;
  vertical-align: top;
  background-image: linear-gradient(
    to right,
    $gradient-active-dark,
    $gradient-active-light
  );
  border-color: $secondary-color;
  border-width: $border-width;
}
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
