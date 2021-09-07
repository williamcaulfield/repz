<template>
  <StackLayout class="main">
    <ContentView class="workoutPlanRestSet__container">
      <Label
        class="workoutPlanRestSet__text"
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
.workoutPlanRestSet__container {
  margin-left: 0;
  width: 95%;
  height: 25;
  margin-top: 5;
  margin-bottom: 5;
  background-color: $gradient-active-dark;
  border-width: $border-width;
  border-color: $border-color;
}

.workoutPlanRestSet__text {
  color: $secondary-color;
  font-size: $btn-primary-text-size;
  text-align: center;
  font-size: 14;
  font-weight: bold;
}
</style>
