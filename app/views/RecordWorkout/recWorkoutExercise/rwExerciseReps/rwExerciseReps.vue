<template>
  <StackLayout class="workoutPage" verticalAlignment="top">
    <GridLayout rows="auto,auto,auto,auto,auto,auto,auto,auto,*" columns="*">
      <Label row="0" :text="duration" class="workoutrecord--heading -h4 -default" height="10%"
        horizontalAlignment="center"></Label>
      <Label row="1" text="Reps" class="workoutrecord--heading -h3 -primary" height="10%"
        horizontalAlignment="center" />
      <Label row="2" :text="exercise.exerciseHeading" class="workoutrecord--heading -h3 -default" height="5%"
        marginTop="-2%" horizontalAlignment="center"></Label>
      <Label row="3" :text="exercise.exerciseSubType" class="workoutrecord--heading -h4 -secondary" height="5%"
        horizontalAlignment="center"></Label>
      <GridLayout row="4" col="0" rows="auto" columns="*,auto,auto,auto,auto,*" verticalAlignment="center"
        horizontalAlignment="center" marginTop="-18" v-show="exercise.isCompleted == false">
        <Image row="4" col="2" colspan="2" height="271" class="icon-progress-wheel" horizontalAlignment="center"
          src="~/assets/images/icons/icon_target_large.png" />
        <GridLayout col="2" row="0" colspan="2" rows="auto,auto" columns="auto" horizontalAlignment="center"
          verticalAlignment="center">
          <Label col="0" row="0" :text="exercise.completedCount" class="workoutrecord--heading -h0 -default"
            marginTop="-20" horizontalAlignment="center" />
          <Label col="0" row="1" text="Target" class="workoutrecord--heading -h3 -primary" marginTop="-10"
            v-show="exercise.exerciseTargetCount == exercise.completedCount" horizontalAlignment="center" />
          <Label col="0" row="1" text="Actual" class="workoutrecord--heading -h3 -primary" marginTop="-10"
            v-show="exercise.exerciseTargetCount != exercise.completedCount" />
        </GridLayout>
        <Button class="icon-minus" row="0" col="1" marginRight="-10"
          backgroundImage="~/assets/images/icons/icon_minus_grey.png" @tap="minusCompleteReps" />
        <Button class="icon-plus" row="0" col="4" marginLeft="-10"
          backgroundImage="~/assets/images/icons/icon_plus_grey.png" @tap="addCompletedReps" />
      </GridLayout>

      <GridLayout row="4" col="0" rows="auto" columns="*,auto,auto,auto,auto,*" verticalAlignment="center"
        horizontalAlignment="center" marginTop="-18" v-show="exercise.isCompleted == true">
        <Image row="4" col="2" colspan="2" height="271" class="icon-progress-wheel" horizontalAlignment="center"
          v-show="targetAchieved == true" src="~/assets/images/icons/icon-done_large_red.png" />
        <Image row="4" col="2" colspan="2" height="271" class="icon-progress-wheel" horizontalAlignment="center"
          v-show="targetAchieved == false" src="~/assets/images/icons/icon_done_large_grey.png" />
      </GridLayout>
      <GridLayout row="6" columns="auto,auto,auto" horizontalAlignment="center" marginTop="2%">
        <Label col="0" :text="exercise.completedCount" class="workoutrecord--heading -h3 -default" height="10%"
          v-show="exercise.isCompleted == true" />
        <Label col="1" :text="' of ' + exercise.exerciseTargetCount" class="workoutrecord--heading -h3 -secondary"
          height="10%" v-show="exercise.isCompleted == true" />
        <Label col="2" :text="exercise.exerciseTargetCount" class="workoutrecord--heading -h3 -primary" height="10%"
          v-show="exercise.exerciseTargetCount == true" />
      </GridLayout>

      <Label row="7" text="Good Job!" class="workoutrecord--heading -h2 -default" height="10%"
        horizontalAlignment="center" v-show="exercise.isCompleted == true && targetAchieved == true" />
      <Label row="7" text="Rest day is it?" class="workoutrecord--heading -h2 -default" height="10%"
        horizontalAlignment="center" v-show="exercise.isCompleted == true && targetAchieved == false" />
      <GridLayout row="5" col="1" rows="auto" columns="*,auto,auto,*" marginTop="30">
        <Label row="0" col="1" text="Weighted: " class="workoutrecord--heading -h4 -default" height="10%"
          horizontalAlignment="center" />
        <Label row="0" col="2" :text="'+' + exercise.weightExtra + 'Kg'" class="workoutrecord--heading -h4 -primary"
          height="10%" horizontalAlignment="center" />
      </GridLayout>

      <Button row="6" class="btn-primary" text="Done" marginTop="25" @tap="completeExercise()"
        v-show="exercise.isCompleted == false" horizontalAlignment="center" />
      <ContentView class="exercisedetail__container" row="8" v-show="exercise.isCompleted == false">
        <GridLayout rows="*" columns="*,auto,auto,*" @tap="showExercise(exercise.exerciseID)">
          <Image src="~/assets/images/icons/icon_exercisedetail.png" col="1" height="50" marginleft="-10"
            marginBottom="0" />
          <Label col="2" text="Exercise Detail" :class="
            isTouched
              ? 'workoutrecord--heading -h4 -default'
              : 'workoutrecord--heading -h4 -secondary'
          " fontWeight="Bold" horizontalAlignment="center" verticalAlignment="center" @touch="onTapButton()"></Label>
        </GridLayout>
      </ContentView>
    </GridLayout>
  </StackLayout>
</template>
<script>

import exerciseDetail from "../../../Exercises/exerciseDetail/exerciseDetail";
// import { Utils } from "@nativescript/core";
// var countId;
export default {
  props: ["exercise", "duration"],
  components: { exerciseDetail },
  mounted() {
    // setTimeout(() => {
    //   this.currentTime = new Date();
    //   this.workoutDuration = this.currentTime;
    // }, 1000);


  },
  methods: {
    writeExerciseResult() {
      this.exerciseResult.completedCount = this.exercise.completedCount;
      this.exerciseResult.timeEnd = new Date();
      this.exerciseResult.duration =
        (this.exerciseResult.timeEnd - this.exerciseResult.timeStart) / 1000;
    },
    onTapButton() {
      if (this.isTouched) this.isTouched = false;
      else this.isTouched = true;
    },
    searchBarLoaded(args) {
      let sb = args.object;

      sb.ios.searchBarStyle = UISearchBarStyle.Prominent;
      sb.ios.backgroundImage = UIImage.new();
      exercise.timeStart -no
    },
    showExercise(payload) {
      this.$navigateTo(exerciseDetail, {
        props: {
          exercise: payload,
        },
        animated: true,
        transition: {
          name: "slideTop",
          duration: 300,
          curve: "easeIn",
        },
      });
      this.isTouched = false;
    },
    searchBarLoaded(args) {
      let sb = args.object;

      sb.ios.searchBarStyle = UISearchBarStyle.Prominent;
      sb.ios.backgroundImage = UIImage.new();
    },
    addCompletedReps() {
      this.exercise.completedCount = this.exercise.completedCount + 1;
    },
    minusCompleteReps() {
      if (this.exercise.completedCount > 0) this.exercise.completedCount = this.exercise.completedCount - 1;
    },
    completeExercise() {
      this.exercise.isCompleted = true;
      if (
        this.exercise.completedCount >=
        this.exercise.exerciseTargetCount * this.slackerTargetCutoff
      ) {
        this.targetAchieved = true;
      }
    },
    saveExerciseResult() {
      this.writeExerciseResult();
      this.$emit("exerciseComplete", this.exerciseResult);
    },

    writeExerciseResult() {
      this.exerciseResult.completedCount = this.exercise.completedCount;
      this.exerciseResult.timeEnd = new Date();
      this.exerciseResult.duration = parseInt(
        (this.exerciseResult.timeEnd - this.exerciseResult.timeStart) / 1000
      );
    },
    resetExerciseData() {
      //this.exerciseResult.completedCount = 0;
      this.exerciseResult.timeStart = new Date();
      this.exerciseResult.timeEnd = 0;
      this.exerciseResult.duration = 0;
      this.exercise.completedCount = this.exercise.exerciseTargetCount;
      this.targetAchieved = false;
      this.exercise.isCompleted = false;
    },
  },
  data() {
    return {
      // currentTime: new Date().toLocaleTimeString().substring(0, 8),
      isTouched: false,
      //repsTarget: 8,
      //repsCompleted: 8,
      //exerciseCompleted: false,
      targetAchieved: false, //*TODO save this in the exercise
      slackerTargetCutoff: 0.4,
      exercise: {
        // workoutPlanId: "WOP0000000001",
        // isFavourite: "true",
        // exerciseName: "Upper Body Builder",
        // authorId: "USR000000001",
        // authorName: "John Doe",
        // muscles: "Arms, Chest, Back, Core",
        // projectedDuration: "22",
        // exerciseCount: "6",
        // exerciseSets: "3",
        // difficulty: "Intermediate, Hard",
        // equipment: "Pull up bar, Parallel Bars",
      },
      exerciseResult: {
        completedCount: 0,
        timeStart: 0,
        timeEnd: 0,
        duration: 0,
      },
      computed: {

        workoutDuration: {
          // getter
          get() {
            return workoutDuration;
          },
          set(newTime) {
            workoutDuration = newTime - this.exercise.timeStart;
          }

        }
      }
    };
  },
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../../../../_app-variables";
// End custom common variables

// Custom styles

.workoutPage {
  margin: auto;
}

.btn-primary {
  width: 90%;
  font-size: 32;
  height: 60;
}

.btn-secondary {
  width: 90%;
  font-size: 32;
  height: 60;
}

.icon-progress-wheel {
  height: 30%;
  margin: 20;
}

.icon-start {
  height: 30;
}

.btn-primary:hover {
  background-color: grey;
}

.exercisedetail__container {
  width: 90%;
  height: 70;
  margin: auto;
  border-top-left-radius: $border-radius;
  border-top-right-radius: $border-radius;
  margin-top: 0;
  margin-bottom: 0;
  background-color: $background-color;
  vertical-align: bottom;
  background-image: linear-gradient(to bottom,
      $background-gradient-light,
      $background-gradient-dark );
}

.exercisedetail__container:hover {
  background-color: grey;
}

.icon-plus {
  text-align: right;
  vertical-align: center;
  height: 45;
  width: 45;
  background-size: 45 45;
  background-color: transparent;
  background-repeat: no-repeat;
}

.icon-plus:highlighted {
  opacity: 0.6;
}

.icon-minus {
  text-align: left;
  vertical-align: center;
  height: 45;
  width: 45;
  background-size: 45 10;
  background-color: transparent;
  background-repeat: no-repeat;
  margin-top: 32;
}

.icon-minus:highlighted {
  opacity: 0.6;
}
</style>
