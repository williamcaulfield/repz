<template>
  <StackLayout class="main">
    <ContentView class="wp-overview-container" id="myView">
      <GridLayout
        class="wp-overview-container-grid"
        rows="auto,auto,auto,auto,auto,auto"
        columns="auto,*"
      >
        <Label
          col="0"
          row="0"
          class="wp-overview-text"
          text="Current duration"
        />
        <Label
          col="1"
          row="0"
          class="wp-overview-text -right"
          v-show="currentDuration < 60"
          :text="currentDuration + ' sec'"
        />
        <Label
          col="1"
          row="0"
          class="wp-overview-text -right"
          v-show="currentDuration >= 60"
          :text="Math.round(currentDuration / 60) + ' min'"
        />
        <Label
          col="0"
          row="1"
          class="wp-overview-text -left"
          text="Time remaining"
        />
        <Label
          col="1"
          row="1"
          class="wp-overview-text -right"
          :text="timeRemaining + ' min'"
        />
        <Label
          col="0"
          row="2"
          class="wp-overview-text"
          text="Projected Completion"
        />
        <Label
          col="1"
          row="2"
          class="wp-overview-text -right"
          :text="getFormattedTime(projectedEnd)"
        />
        <Label
          col="0"
          row="3"
          class="wp-overview-text -left"
          text="Energy Burned"
        />
        <Label
          col="1"
          row="3"
          class="wp-overview-text -right"
          :text="energyBurned + ' Kcal'"
        />
        <Label
          col="0"
          row="4"
          class="wp-overview-text -left"
          text="Exercises Completed"
        />
        <Label
          col="1"
          row="4"
          class="wp-overview-text -right"
          :text="exercisesCompleted"
        />
        <Label
          col="0"
          row="5"
          class="wp-overview-text -left"
          text="Sets Complete"
        />
        <Label
          col="1"
          row="5"
          class="wp-overview-text -right"
          :text="setsCompleted"
        />
      </GridLayout>
    </ContentView>
  </StackLayout>
</template>

<script>
export default {
  props: [
    "currentDuration",
    "timeRemaining",
    "projectedEnd",
    "energyBurned",
    "exercisesCompleted",
    "setsCompleted",
  ],
  methods: {
    getFormattedTime: function (time) {
      var hours = "";
      var minutes = "";
      var seconds = "";

      if (time.getHours() < 10) {
        hours = "0" + time.getHours();
      } else {
        hours = time.getHours();
      }

      if (time.getMinutes() < 10) {
        minutes = "0" + time.getMinutes();
      } else {
        minutes = time.getMinutes();
      }

      if (time.getSeconds() < 10) {
        seconds = "0" + time.getSeconds();
      } else {
        seconds = time.getSeconds();
      }
      return hours + ":" + minutes + ":" + seconds;
    },
  },
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
