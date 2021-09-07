<template>
  <StackLayout class="workoutPage" verticalAlignment="top">
    <GridLayout rows="auto,auto,auto,auto,auto,auto,auto,auto,*" columns="*">
      <Label
        row="0"
        text=" "
        class="workoutrecord--heading -h4 -default"
        height="10%"
      ></Label>
      <Label
        row="1"
        text="Workout"
        class="workoutrecord--heading -h3 -primary"
        height="10%"
      />
      <Label
        row="2"
        text="Complete"
        class="workoutrecord--heading -h3 -default"
        height="5%"
      ></Label>
      <Label
        row="3"
        text=" "
        class="workoutrecord--heading -h4 -secondary"
        height="5%"
      ></Label>
      <GridLayout
        row="4"
        col="0"
        rows="auto"
        columns="*,auto,auto,auto,auto,*"
        verticalAlignment="center"
        horizontalAlignment="center"
        marginTop="-18"
      >
        <Image
          row="4"
          col="2"
          colSpan="2"
          height="271"
          class="icon-progress-wheel"
          horizontalAlignment="center"
          src="~/assets/images/icons/icon-done_large_red.png"
        />
      </GridLayout>
      <Label
        row="5"
        text="Good Job!"
        class="workoutrecord--heading -h3 -default"
        height="10%"
      />
      <GridLayout row="6" rows="auto,auto,auto" columns="*,auto,auto,*">
        <Label
          row="0"
          col="1"
          text="Time:"
          class="workoutrecord--heading -h3 -primary"
          height="5%"
          horizontalAlignment="left"
        />
        <Label
          row="1"
          col="1"
          text="Calories:"
          class="workoutrecord--heading -h3 -primary"
          height="5%"
          horizontalAlignment="left"
        />
        <Label
          row="2"
          col="1"
          text="Exercises:"
          class="workoutrecord--heading -h3 -primary"
          height="5%"
          horizontalAlignment="left"
        />
        <Label
          row="0"
          col="2"
          text="10"
          class="workoutrecord--heading -h3 -default"
          height="5%"
          horizontalAlignment="right"
        />
        <Label
          row="1"
          col="2"
          text="176"
          class="workoutrecord--heading -h3 -default"
          height="5%"
          horizontalAlignment="right"
        />
        <Label
          row="2"
          col="2"
          text="13"
          class="workoutrecord--heading -h3 -default"
          height="5%"
          horizontalAlignment="right"
        />
      </GridLayout>
    </GridLayout>
  </StackLayout>
</template>
<script>
export default {
  components: {},
  methods: {
    searchBarLoaded(args) {
      let sb = args.object;

      sb.ios.searchBarStyle = UISearchBarStyle.Prominent;
      sb.ios.backgroundImage = UIImage.new();
    },
  },
  data() {
    return {
      index: 0,
      lastDelY: 0,
      headerCollapsed: false,
      selectedTab: 0,
      selectedTabview: 0,
    };
  },
  methods: {
    searchBarLoaded(args) {
      let sb = args.object;

      sb.ios.searchBarStyle = UISearchBarStyle.Prominent;
      sb.ios.backgroundImage = UIImage.new();
    },
  },
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../../../_app-variables";
// End custom common variables

// Custom styles

.workoutPage {
  margin: auto;
}
.btn-primary {
  width: 90%;
  font-size: 32;
  height: 60;
}

.btn-secondary {
  width: 90%;
  font-size: 32;
  height: 60;
}
.icon-progress-wheel {
  height: 30%;
  margin: 20;
}
.icon-start {
  height: 30;
}
.btn-primary:hover {
  background-color: grey;
}
.exercisedetail__container {
  height: 70;
  margin: auto;
  border-top-left-radius: $border-radius;
  border-top-right-radius: $border-radius;
  margin-top: 0;
  margin-bottom: 0;
  background-color: $background-color;
  vertical-align: bottom;
  background-image: linear-gradient(
    to bottom,
    $background-gradient-light,
    $background-gradient-dark
  );
}
.exercisedetail__container:hover {
  background-color: grey;
}
</style>
