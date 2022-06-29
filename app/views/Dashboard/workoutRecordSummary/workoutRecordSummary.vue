<template>
  <StackLayout class="main" @tap="onTap()">
    <StackLayout>
      <GridLayout rows="auto,*" columns="auto,auto,*" width="95%">
        <Image
          v-if="workout.includesImages == true"
          class="workoutRecordSummary-imageArray"
          row="0"
          col="0"
          colSpan="3"
          stretch="aspectFill"
          :src="workout.workoutImages[0]"
        />
        <ContentView
          class="wrsummarymusclesexercises__container"
          v-show="workout.includesImages == false"
          width="100%"
        >
          <GridLayout
            class="wrsummarymusclesexercises__grid"
            row="0"
            col="0"
            rows="auto"
            columns="auto,7,auto"
          >
            <wrSummaryMuscles
              v-show="workout.includesImages == false"
              row="0"
              col="0"
              :breakdownMuscleZones="workout.breakdownMuscleZones"
            />
            <wrSummaryExercises
              v-show="workout.includesImages == false"
              row="0"
              col="2"
              :breakdownExercises="workout.breakdownExercises"
            />
          </GridLayout>
        </ContentView>
      </GridLayout>

      <GridLayout
        class="workoutRecordSummary-titleBar"
        row="1"
        width="100%"
        columns="auto,*"
        rows="auto,auto,auto"
        verticalAlignment="center"
      >
        <Image
          horizontalAlignment="left"
          stretch="aspectFill"
          col="0"
          row="1"
          class="workoutRecordSummary-titleBar__profilePic"
          :src="workout.profilePicture"
        />

        <!-- <StackLayout class="hr-light" col="1" row="1" /> -->
        <Label
          col="1"
          row="0"
          class="workoutRecordSummary-titleBar__workoutName"
          textwrap="false"
          :text="workout.workoutPlanName"
        />
        <Label
          col="1"
          row="1"
          class="workoutRecordSummary-titleBar__dateTime"
          textwrap="false"
          :text="workout.timeEnd"
        />
        <Label
          col="1"
          row="1"
          class="workoutRecordSummary-titleBar__userName"
          textwrap="false"
          :text="workout.userName"
        />
        <Label
          row="0"
          col="1"
          class="workoutRecordSummary-titleBar__caloriesBurnedDuration"
          textwrap="false"
          :text="
            workout.energyBurned + ' Kcal - ' + workout.currentDuration + ' min'
          "
        />
      </GridLayout>

      <GridLayout rows="*,auto" columns="*,auto,auto,auto,auto,*" row="2">
        <Image
          row="0"
          col="1"
          class="workoutRecordSummary-actionBar__icon"
          :src="'~/assets/images/icons/icon_comment.png'"
        />
        <Image
          row="0"
          col="2"
          class="workoutRecordSummary-actionBar__icon"
          :src="'~/assets/images/icons/icon_share.png'"
        />
        <Image
          row="0"
          col="3"
          class="workoutRecordSummary-actionBar__icon"
          :src="'~/assets/images/icons/icon_thumbsUp.png'"
        />
        <Image
          row="0"
          col="4"
          class="workoutRecordSummary-actionBar__icon"
          :src="'~/assets/images/icons/icon_thumbsUpCount.png'"
        />
      </GridLayout>
      <StackLayout width="100%" marginTop="5" class="line" />
    </StackLayout>
  </StackLayout>
</template>



<script>
import wrSummaryMuscles from "../workoutRecordSummary/wrSummaryMuscles/wrSummaryMuscles";
import wrMuscles from "../workoutRecordSummary/wrSummaryMuscles/wrMuscles/wrMuscles";
import wrSummaryExercises from "../workoutRecordSummary/wrSummaryExercises/wrSummaryExercises";
export default {
  props: ["workout"],
  components: {
    wrMuscles,
    wrSummaryMuscles,
    wrSummaryExercises,
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    onTap() {
      this.$emit("itemTap", this.workout);
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
@import "../../../_app-variables";
.workoutRecordSummary-muscles {
  height: 254;
  margin: auto;

  border-color: rgb(151, 151, 151);
  border-width: 1;
}
.workoutRecordSummary-imageArray {
  height: 250;
  margin: auto;
  border-radius: 10;

  border-color: rgb(151, 151, 151);
  border-width: 1;
}
.workoutRecordSummary-titleBar__profilePic {
  border-width: 1;
  border-color: rgb(151, 151, 151);
  border-radius: 50%;
  margin-left: 10;
  margin-top: -25;
  width: 50;
  height: 50;
}
.workoutRecordSummary-titleBar__workoutName {
  font-size: 16;
  font-weight: bold;
  color: white;
  vertical-align: bottom;
  margin-left: 7;
  margin-bottom: 5;
  height: 23;
  border-bottom-width: 1;
  border-bottom-color: red;
  margin-right: 10;
  margin-top: 5;
}

.workoutRecordSummary-titleBar__caloriesBurnedDuration {
  font-size: 12;
  color: red;
  text-align: right;
  margin-right: 10;
  vertical-align: bottom;
  margin-bottom: 8;
  font-weight: bold;
}
.workoutRecordSummary-titleBar__userName {
  font-size: 14;
  color: white;
  font-weight: bold;
  text-align: right;
  margin-right: 10;
  margin-bottom: 5;
  vertical-align: bottom;
}
.workoutRecordSummary-titleBar__dateTime {
  font-size: 10;
  color: white;
  text-align: left;
  vertical-align: bottom;
  margin-bottom: 10;
  margin-left: 7;
}

.workoutRecordSummary-actionBar__icon {
  height: 28;
  width: 28;
  margin-bottom: 10;
}

.wrsummarymusclesexercises__container {
  height: 254;
  margin: auto;
  border-width: $border-width;
  border-color: $border-color;
  border-radius: $border-radius;
  background-color: $background-color;
  background-image: linear-gradient(
    to bottom,
    $background-gradient-light,
    $background-gradient-dark
  );
  width: 95%;
}

.wrsummarymusclesexercises__grid {
  padding: 12;
}
</style>