<template>
  <StackLayout class="main">
    <ContentView class="workoutPlanRest__container">
      <Label
        class="workoutPlanRest__text"
        :text="exercisePlanned.estimateDuration + ' seconds'"
      />
    </ContentView>
  </StackLayout>
</template>

<script>
export default {
  props: ["exercisePlanned"],
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../../../../_app-variables";
// End custom common variables

// Custom styles

.workoutPlanRest__container {
  margin-left: 66;
  width: 280;
  height: 25;
  margin-top: 0;
  margin-bottom: 0;
  border-left-width: 0.5;
  border-right-width: 0.5;
  border-color: $border-color;
  background-color: $background-color;
}

.workoutPlanRest__text {
  color: $secondary-color;
  font-size: $btn-primary-text-size;
  text-align: center;
  font-size: 14;
}
</style>
