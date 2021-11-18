<template>
  <StackLayout class="main">
    <ContentView class="wp-overview-container" id="myView">
      <GridLayout
        class="wp-overview-container-grid"
        rows="auto,auto,auto,auto,auto,auto"
        columns="auto,*"
      >
        <Label col="0" row="0" class="wp-overview-text" text="Muscle Zones" />
        <Label
          col="1"
          row="0"
          class="wp-overview-text -right"
          :text="workoutPlanDetail.muscleZones"
        />
        <Label
          col="0"
          row="1"
          class="wp-overview-text -left"
          text="Projected Time"
        />
        <Label
          col="1"
          row="1"
          class="wp-overview-text -right"
          :text="Math.ceil(workoutPlanDetail.projectedDuration / 60.0) + ' min'"
        />
        <Label
          col="0"
          row="2"
          class="wp-overview-text"
          text="Projected Energy"
        />
        <Label
          col="1"
          row="2"
          class="wp-overview-text -right"
          :text="workoutPlanDetail.projectedCalories + ' kcal'"
        />
        <Label
          col="0"
          row="3"
          class="wp-overview-text -left"
          text="Difficulty"
        />
        <Label
          col="1"
          row="3"
          class="wp-overview-text -right"
          :text="workoutPlanDetail.difficultyLevels"
        />
        <Label
          col="0"
          row="4"
          class="wp-overview-text -left"
          text="Exercises"
        />
        <Label
          col="1"
          row="4"
          class="wp-overview-text -right"
          :text="workoutPlanDetail.exercisesPlannedTotal"
        />
        <Label col="0" row="5" class="wp-overview-text -left" text="Sets" />
        <Label
          col="1"
          row="5"
          class="wp-overview-text -right"
          :text="workoutPlanDetail.setsPlannedTotal"
        />
      </GridLayout>
    </ContentView>
  </StackLayout>
</template>

<script>
export default {
  props: ["workoutPlanDetail"],
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../../../../_app-variables";
// End custom common variables

// Custom styles

.wp-overview-container {
  height: 165;

  border-radius: $border-radius;
  margin-bottom: 20;
  background-color: $container-gradient-light;
}
.wp-overview-container-grid {
  padding: 10;
}

.wp-overview-text {
  color: $secondary-color;
  font-size: $btn-primary-text-size;
  text-align: left;
  font-size: 15;
  font-weight: bold;
  margin-left: 10;
  margin-right: 10;
  margin-top: 5;
}

.-right {
  @extend .wp-overview-text;
  text-align: right;
  color: $text-color-primary;
}

.-left {
  @extend .wp-overview-text;
  text-align: left;
}

.-primary {
  @extend .wp-overview-text;
  color: $text-color-primary;
}
.-default {
  @extend .wp-overview-text;
  color: $text-color;
}
</style>
