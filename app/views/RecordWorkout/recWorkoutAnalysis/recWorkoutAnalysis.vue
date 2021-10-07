<template>
  <Page actionBarHidden="true" class="page">
    <ScrollView>
      <StackLayout class="main">
        <wrHeader
          width="95%"
          marginTop="5"
          :workoutPlanName="workoutRecorded.workoutPlanName"
          :profilePicture="workoutRecorded.profilePicture"
          :userName="workoutRecorded.userName"
          :energyBurned="workoutRecorded.energyBurned"
          :currentDuration="workoutRecorded.currentDuration"
          :timeEnd="workoutRecorded.timeEnd"
        />
        <wrStatistics margin="20" :workoutRecorded="workoutRecorded" />
        <!-- <wrSummaryMusclesExercises
          marginTop="20"
          :breakdownMuscles="
            workoutRecorded.workoutRecordedAnalysis.breakdownMuscleZones
          "
          :breakdownExercises="
            workoutRecorded.workoutRecordedAnalysis.breakdownExerciseZones
          "
        /> -->
        <wrGraphExercise
          margin="20"
          :workoutRecordedAnalysis="workoutRecorded.workoutRecordedAnalysis"
        />
        <Label
          text="Achievements"
          class="text -default -bold -large"
          horizontalAlignment="left"
          verticalAlignment="top"
          marginTop="0"
          marginBottom="10"
        />
        <RadListView
          for="achievement in achievements"
          layout="list"
          backgroundColor="transparent"
          marginTop="5"
          height="210"
        >
          <v-template>
            <wrAchievement
              :achievementName="achievement.achievementName"
              :description="achievement.description"
            >
            </wrAchievement>
          </v-template>
        </RadListView>
        <Button
          row="8"
          class="btn-primary"
          text="Done"
          marginTop="30"
          width="95%"
          @tap="navigateToDashboard()"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import wrSummaryMuscles from "../../Dashboard/workoutRecordSummary/wrSummaryMuscles/wrSummaryMuscles";
import wrSummaryExercises from "../../Dashboard/workoutRecordSummary/wrSummaryExercises/wrSummaryExercises";
import wrHeader from "../../Dashboard/workoutRecordDetail/wrHeader/wrHeader";
import wrStatistics from "../../Dashboard/workoutRecordDetail/wrSummaryStatistics/wrStatistics";
import wrGraphExercise from "../../Dashboard/workoutRecordDetail/wrGraphExercise/wrGraphExercise";
import wrAchievement from "../../Dashboard/workoutRecordDetail/wrAchievement/wrAchievement";

import navControls from "../../../mixins/navControls";

export default {
  mixins: [navControls],
  props: ["workoutRecorded"],
  components: {
    wrSummaryMuscles,
    wrSummaryExercises,
    wrStatistics,
    wrGraphExercise,
    wrHeader,
    wrAchievement,
  },
  computed: {},
  created() {},
  mounted() {
    this.workoutRecorded.workoutRecordedAnalysis.achievements.forEach(
      (element) => {
        this.achievements.push(element);
      }
    );
  },
  methods: {
    onClickButton() {
      this.$emit("clicked");
    },
  },
  data() {
    return {
      achievements: [],
    };
  },
};
</script>
<style scoped lang="scss">
@import "../../../_app-variables.scss";

.wrsummarymusclesexercises__container {
  height: 238;
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
  width: 90%;
}
.wrsummarymusclesexercises__grid {
  padding: 15;
}
</style>
