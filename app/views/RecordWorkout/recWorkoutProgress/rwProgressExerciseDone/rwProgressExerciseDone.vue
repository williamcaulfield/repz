<template>
  <StackLayout class="main">
    <ContentView class="wpexercise-container" id="myView">
      <GridLayout rows="auto,auto,*,auto" columns="80,*,80">
        <ContentView
          col="0"
          row="0"
          rowSpan="4"
          class="wpexercise-icon-exercise-background"
        />
        <Image
          col="0"
          row="0"
          rowSpan="4"
          class="wpexercise-icon-exercise"
          :src="'~/assets/images/exercises/thmb_ex00003_01.png'"
        />
        <Label
          row="0"
          col="1"
          class="wpexercise-heading -h1 -default"
          :text="exercisePlanned.exerciseHeading"
          marginLeft="10"
          marginTop="8"
        />

        <Image
          col="2"
          row="0"
          rowSpan="4"
          width="32"
          height="30"
          :src="'~/assets/images/icons/icon_done_small_white.png'"
          marginTop="-35"
          marginRight="-15"
        />
        <Label
          row="1"
          col="1"
          colSpan="2"
          class="wpexercise-heading -h2 -default"
          text="Shoulder width grip - Overhand"
          marginLeft="10"
          marginTop="-2"
        />
        <StackLayout
          marginTop="-5"
          row="2"
          col="1"
          colSpan="2"
          class="hr-light"
        ></StackLayout>
        <Label row="2" col="1" colspan="2" class="line" />>
        <GridLayout
          row="3"
          col="1"
          colspan="2"
          columns="auto,auto,auto,auto,*,auto,auto"
          marginBottom="8"
        >
          <Label
            col="0"
            class="wpexercise-heading -h3 -secondary"
            text="Pace: "
            marginLeft="10"
          />
          <Label
            col="1"
            class="wpexercise-heading -h3 -default"
            text="Normal"
          />
          <Label
            col="2"
            class="wpexercise-heading -h3 -secondary"
            text="+Kg: "
            marginLeft="10"
          />
          <Label col="3" class="wpexercise-heading -h3 -default" text="5" />
          <Label
            col="5"
            class="wpexercise-heading -h3 -secondary"
            text="Reps: "
            marginLeft="27%"
          />
          <Label
            col="6"
            class="wpexercise-heading -h5 -default"
            :text="exercisePlanned.exerciseTargetCount"
            marginBottom="-2"
          />
        </GridLayout>
      </GridLayout>
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
.wpexercise-container {
  height: 80;
  border-color: $border-color;
  border-width: $border-width;
  border-radius: $border-radius;
  background-color: $background-color;
  background-image: linear-gradient(
    to bottom,
    $primary-color,
    $background-gradient-dark
  );
  align-content: center;
}
.wpexercise-icon-exercise-background {
  border-color: $border-color;
  border-width: $border-width;
  border-top-left-radius: $border-radius;
  border-bottom-left-radius: $border-radius;
  background-color: $background-color;
  background-image: linear-gradient(
    to top,
    $gradient-inactive-light,
    $container-gradient-light
  );
}

.wpexercise-icon-exercise {
  align-content: center;
  margin-right: 0;
  margin-top: 0;
  height: 80;
}

.wpexercise-heading {
  text-align: left;
  vertical-align: bottom;
}

.-h1 {
  @extend .wpexercise-heading;
  font-size: 16;
  font-weight: bold;
}

.-h2 {
  @extend .wpexercise-heading;
  font-size: 14;
  font-weight: normal;
}
.-h3 {
  @extend .wpexercise-heading;
  font-size: 14;
  font-weight: bold;
}

.-h4 {
  @extend .wpexercise-heading;
  font-size: 14;
  font-weight: normal;
}

.-h5 {
  @extend .wpexercise-heading;
  font-size: 18;
  font-weight: bold;
}

.-primary {
  @extend .wpexercise-heading;
  color: $text-color-primary;
}

.-secondary {
  @extend .wpexercise-heading;
  color: $text-color-secondary;
}

.-default {
  @extend .wpexercise-heading;
  color: $text-color;
}
.hr-light {
  border-bottom-color: $primary-color;
  border-bottom-width: $border-width;
  margin-left: 10;
  margin-right: 15;
  vertical-align: center;
}
</style>
