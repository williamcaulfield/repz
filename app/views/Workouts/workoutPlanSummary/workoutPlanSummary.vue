<template>
  <StackLayout class="main">
    <ContentView class="wp-summary__container" id="main" @tap="onClickButton()">
      <GridLayout rows="auto,auto,auto,auto,*" columns="15*,3*">
        <Label
          row="0"
          col="0"
          class="wp-summary__text -h1 -default"
          :text="workoutPlan.workoutPlanName"
          marginTop="10"
        />

        <Image
          col="1"
          row="0"
          class="icon-heart"
          marginLeft="-218"
          src="~/assets/images/icons/icon_heart_filled.png"
        />
        <Label
          row="0"
          col="1"
          class=".wp-summary__text -h2 -secondary"
          text="Exercises: "
          marginTop="10"
          marginLeft="-13%"
        />
        <Label
          row="0"
          col="1"
          class="wp-summary__text -h4 -primary"
          :text="workoutPlan.exercisesPlannedTotal"
          marginTop="10"
        />
        <Label
          row="1"
          col="0"
          class="wp-summary__text -h2 -default"
          :text="workoutPlan.muscleZones"
        />
        <Label
          row="1"
          col="1"
          class="wp-summary__text -h2 -secondary"
          text="Sets: "
          marginLeft="-13%"
        />
        <Label
          row="1"
          col="1"
          class="wp-summary__text -h4 -primary"
          :text="workoutPlan.setsPlannedTotal"
        />

        <Label
          row="2"
          col="0"
          class="wp-summary__text -h2 -default"
          :text="workoutPlan.difficultyLevels"
          verticalAlignment="bottom"
          marginTop="14%"
        />

        <Label
          row="3"
          col="0"
          class="wp-summary__text -h2 -default"
          :text="workoutPlan.equipment"
          marginTop="0"
        />

        <Label
          row="3"
          col="1"
          class="wp-summary__text -h2 -secondary"
          text="Minutes: "
          marginLeft="-13%"
        />

        <Label
          row="3"
          col="1"
          class="wp-summary__text -h3 -primary"
          :text="workoutPlan.projectedDuration"
        />
        <Label row="0" class="line" col="1" rowSpan="5"></Label>
      </GridLayout>
    </ContentView>
  </StackLayout>
</template>

<script>
import navControls from "../../../mixins/navControls";

export default {
  mixins: [navControls],
  props: ["workoutPlan"],
  components: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    onClickButton() {
      this.$emit("clicked");
    },
  },
  data() {
    return {};
  },
};
</script>
<style scoped lang="scss">
// Start custom common variables
@import "../../../_app-variables";
// End custom common variables

// Custom styles
.wp-summary__container {
  width: 90%;
  height: 238;
  border-radius: 10;
  margin: auto;
  border-color: $border-color;
  border-width: $border-width;
  margin-top: 10;
  margin-bottom: 10;
  height: 115;
  background-image: linear-gradient(
    to bottom,
    $container-gradient-light,
    $container-gradient-dark
  );
}

.wp-summary__text {
  margin-left: 15;
}

.-h1 {
  @extend .wp-summary__text;
  font-size: 16;
  text-align: left;
  font-weight: bold;
}
.-h2 {
  @extend .wp-summary__text;
  font-size: 14;
  font-weight: 400;
  text-align: left;
}
.-h3 {
  @extend .wp-summary__text;
  font-size: 18;
  text-align: right;
  font-weight: bold;
  margin-right: 15;
}
.-h4 {
  @extend .wp-summary__text;
  font-size: 16;
  text-align: right;
  font-weight: bold;
  margin-right: 15;
}
.-primary {
  @extend .wp-summary__text;
  color: $text-color-primary;
}
.-secondary {
  @extend .wp-summary__text;
  color: $text-color-secondary;
}

.-default {
  @extend .wp-summary__text;
  color: $text-color;
}

.line {
  border-left-width: $border-width;
  border-left-color: $primary-color;
  margin-left: -16%;
}
.icon-heart {
  width: 20;
  margin-top: 10;
  margin-right: 5;
}
</style>
