<template>
  <StackLayout class="workoutPage" verticalAlignment="top">
    <GridLayout
      rows="auto,auto,auto,auto,auto,auto,auto,auto,auto,*"
      columns="*"
    >
      <Label
        row="0"
        :text="duration"
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
        text="Paused"
        class="workoutrecord--heading -h3 -default"
        height="5%"
        marginTop="-2%"
      />

      <GridLayout
        row="4"
        col="0"
        rows="auto"
        columns="*,auto,auto,auto,auto,*"
        verticalAlignment="center"
        horizontalAlignment="center"
      >
        <Image
          row="4"
          col="2"
          colspan="2"
          class="icon-pause-large"
          horizontalAlignment="center"
          src="~/assets/images/icons/icon_pause_large_red.png"
        />
      </GridLayout>

      <Button
        row="6"
        class="btn-secondary"
        text="Current Progress"
        marginTop="10%"
        @tap="workoutShowProgress()"
      />
      <Button
        row="7"
        class="btn-primary-dark"
        text="I'm quitting :("
        marginTop="2%"
        @tap="workoutEnd()"
      />
      <Button
        row="8"
        class="btn-primary"
        text="Resume"
        marginTop="2%"
        @tap="workoutResume()"
      />
    </GridLayout>
  </StackLayout>
</template>
<script>
import { Dialogs } from "@nativescript/core";

export default {
  props: ["duration"],
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
    workoutShowProgress() {
      this.$emit("workoutShowProgress");
    },
    workoutEnd() {
      Dialogs.confirm({
        message: "Are you sure?",
        okButtonText: "Yes, I'm done",
        cancelButtonText: "No, quitting is for wimps",
      }).then((result) => {
        if (result) {
          this.$emit("workoutEnd");
        }
      });
    },

    workoutResume() {
      this.$emit("workoutResume");
    },
    searchBarLoaded(args) {
      let sb = args.object;
      sb.ios.searchBarStyle = UISearchBarStyle.Prominent;
      sb.ios.backgroundImage = UIImage.new();
    },

    emiteventchild() {
      this.$emit("eventchild");
    },
  },
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../../../_app-variables.scss";
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

.btn-primary-dark {
  width: 90%;
  font-size: 28;
  height: 60;
}

.btn-secondary {
  width: 90%;
  font-size: 28;
  height: 60;
}
.icon-pause-large {
  height: 20%;
  margin-top: 80;
  margin-bottom: 90;
}
.icon-start {
  height: 30;
}
.btn-primary:hover {
  background-color: grey;
}
</style>
