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
          :src="exercisePlanned.exerciseImage"
        />
        <Label
          row="0"
          col="1"
          class="wpexercise-heading -h1 -primary"
          :text="exercisePlanned.exerciseHeading"
          marginLeft="10"
          marginTop="5"
        />
        <Label
          row="1"
          col="1"
          colSpan="2"
          class="wpexercise-heading -h2 -secondary"
          :text="exercisePlanned.exerciseSubType"
          marginLeft="10"
          marginTop="0"
        />
        <StackLayout
          marginTop="-5"
          row="2"
          col="1"
          colSpan="2"
          class="hr-light"
        ></StackLayout>
        <Label row="2" col="1" colSpan="2" class="line" />>
        <GridLayout
          row="3"
          col="1"
          colSpan="2"
          columns="auto,auto,auto,auto,*,auto,auto"
          marginBottom="10"
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
            :text="exercisePlanned.exercisePace"
          />
          <Label
            col="2"
            class="wpexercise-heading -h3 -secondary"
            text="+Kg: "
            marginLeft="10"
          />
          <Label
            col="3"
            class="wpexercise-heading -h3 -default"
            :text="exercisePlanned.weightExtra"
          />
          <Label
            col="5"
            class="wpexercise-heading -h3 -secondary"
            text="Reps: "
            marginLeft="10"
          />
          <Label
            col="6"
            class="wpexercise-heading -h5 -primary"
            :text="exercisePlanned.exerciseTargetCount"
            marginBottom="-2"
            marginRight="15"
          />
        </GridLayout>
      </GridLayout>
    </ContentView>
  </StackLayout>
</template>

<script>
export default { props: ["exercisePlanned"] };
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
    $background-gradient-light,
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
