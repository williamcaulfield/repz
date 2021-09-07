<template>
  <Page actionBarHidden="true" class="page">
    <GridLayout rows="*" columns="*" width="90%">
      <ScrollView row="0" col="0" orientation="vertical">
        <StackLayout
          class="main"
          verticalAlignment="top"
          horizontalAlignment="center"
        >
          <Label
            text="< Back"
            @tap="close"
            class="text -primary -bold -medium -left"
            marginLeft="10"
            horizontalAlignment="left"
          />
          <GridLayout columns="*,auto" rows="auto">
            <Label
              col="1"
              row="0"
              text="Stretches List"
              class="wpdetail-heading -h1 -default -right"
            />
          </GridLayout>
          <workoutPlanOverview marginTop="20" marginBottom="15" />
          <Label text="Set 1" class="wpdetail-heading -h2 -default" />
          <workoutPlanExercise />
          <workoutPlanRest />
          <workoutPlanExercise />
          <workoutPlanRest />
          <workoutPlanExercise />
          <workoutPlanRest />
          <workoutPlanExercise />
          <workoutPlanRestSet marginTop="20" marginBottom="20" />
          <Label text="Set 2" class="wpdetail-heading -h2 -default" />
          <workoutPlanExercise />
          <workoutPlanRest />
          <workoutPlanExercise />
          <workoutPlanRest />
          <workoutPlanExercise />
          <workoutPlanRest />
          <workoutPlanExercise />
          <workoutPlanRestSet marginTop="20" marginBottom="20" />
          <Label text="Set 3" class="wpdetail-heading -h2 -default" />
          <workoutPlanExercise />
          <workoutPlanRest />
          <workoutPlanExercise />
          <workoutPlanRest />
          <workoutPlanExercise />
        </StackLayout>
      </ScrollView>
    </GridLayout>
  </Page>
</template>

<script>
import navControls from "../../../../mixins/navControls";

import workoutPlanExercise from "../../../Workouts/workoutPlanDetail/workoutPlanExercise/workoutPlanExercise";
import workoutPlanOverview from "../../../Workouts/workoutPlanDetail/workoutPlanOverview/workoutPlanOverview";
import workoutPlanRest from "../../../Workouts/workoutPlanDetail/workoutPlanRest/workoutPlanRest";
import workoutPlanRestSet from "../../../Workouts/workoutPlanDetail/workoutPlanRestSet/workoutPlanRestSet";

export default {
  mixins: [navControls],
  components: {
    workoutPlanExercise,
    workoutPlanOverview,
    workoutPlanRest,
    workoutPlanRestSet,
  },
  methods: {
    close() {
      this.$navigateBack();
    },
  },
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../../../../_app-variables";
// End custom common variables

// Custom styles

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
