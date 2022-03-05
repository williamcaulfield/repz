<template>
  <GridLayout
    class="navBottom"
    height="45"
    width="100%"
    rows="auto"
    columns="auto,auto,auto,auto,auto"
  >
    <GridLayout
      :class="selectedTab == 0 ? 'active' : ''"
      rows="*"
      cols="auto"
      class="nav"
      col="0"
      row="0"
      width="20%"
    >
      <Button
        :class="selectedTab == 0 ? 'active' : ''"
        row="0"
        @tap="navigateToDashboard"
        class="navIcon_dashboard"
        :backgroundImage="
          selectedTab == 0
            ? '~/assets/images/icons/icon_dashboard_red.png'
            : '~/assets/images/icons/icon_dashboard_grey.png'
        "
      >
        <FormattedString>
          <Span text="Dashboard" class="navText_dashboard" />
        </FormattedString>
      </Button>
    </GridLayout>
    <GridLayout
      :class="selectedTab == 1 ? 'active' : ''"
      rows="*"
      cols="auto"
      class="nav"
      col="1"
      row="0"
      width="20%"
    >
      <Button
        @tap="navigateToExercises"
        :class="selectedTab == 1 ? 'active' : ''"
        row="0"
        class="navIcon_exercises"
        :backgroundImage="
          selectedTab == 1
            ? '~/assets/images/icons/icon_exercises_red.png'
            : '~/assets/images/icons/icon_exercises_grey.png'
        "
      >
        <FormattedString>
          <Span text="Exercises" class="navText_exercises" />
        </FormattedString>
      </Button>
    </GridLayout>
    <GridLayout
      :class="selectedTab == 2 ? 'active' : ''"
      @tap="navigateToRecordWorkout"
      rows="*"
      cols="auto"
      class="nav"
      col="2"
      row="0"
      width="20%"
    >
      <!-- <Image
        :class="selectedTab == 2 ? 'active' : ''"
        row="0"
        class="recordIcon"
        :src="
          selectedTab == 2
            ? '~/assets/images/icons/icon_record_grey.png'
            : '~/assets/images//icons/icon_record_red.png'
        "
      />
      <Label row="1" text="Record" class="navText"></Label> -->

      <Button
        @tap="navigateToExercises"
        :class="selectedTab == 2 ? 'active' : ''"
        row="0"
        class="navIcon_record"
        :backgroundImage="
          selectedTab == 2
            ? '~/assets/images/icons/icon_record_grey.png'
            : '~/assets/images/icons/icon_record_red.png'
        "
      >
        <FormattedString>
          <Span text="Record" class="navText_record" />
        </FormattedString>
      </Button>
    </GridLayout>

    <GridLayout
      :class="selectedTab == 3 ? 'active' : ''"
      rows="*"
      cols="auto"
      class="nav"
      col="3"
      row="0"
      width="20%"
    >
      <Button
        @tap="navigateToWorkouts"
        :class="selectedTab == 4 ? 'active' : ''"
        row="0"
        class="navIcon_workouts"
        :backgroundImage="
          selectedTab == 3
            ? '~/assets/images/icons/icon_workouts_red.png'
            : '~/assets/images/icons/icon_workouts_grey.png'
        "
      >
        <FormattedString>
          <Span text="Workouts" class="navText_workouts" />
        </FormattedString>
      </Button>
    </GridLayout>

    <GridLayout
      :class="selectedTab == 4 ? 'active' : ''"
      rows="*"
      cols="auto"
      class="nav"
      col="4"
      row="0"
      width="20%"
    >
      <Button
        @tap="navigateToBuddies"
        :class="selectedTab == 4 ? 'active' : ''"
        row="0"
        class="navIcon_buddies"
        :backgroundImage="
          selectedTab == 4
            ? '~/assets/images/icons/icon_buddies_red.png'
            : '~/assets/images/icons/icon_buddies_grey.png'
        "
      >
        <FormattedString>
          <Span text="Buddies" class="navText_buddies" />
        </FormattedString>
      </Button>
    </GridLayout>
  </GridLayout>
</template>

<script>
import navControls from "../mixins/navControls";
export default {
  data() {
    return { selectedTab: this.selectedTab };
  },
  mixins: [navControls],
  components: {
    //app,
  },
};
</script>

<style>
.navBottom {
  background-color: black;
  border-color: red;
}

.nav {
  height: 100%;
  width: 100%;
}

.navIcon {
  background-repeat: no-repeat;
  background-position: top;
  background-size: 55 29;
  margin-top: 0;
  height: 80;
}
.navIcon_buddies {
  background-repeat: no-repeat;
  background-position: 14 6;
  background-size: 55 30;
  margin-bottom: -43;
}

.navText_buddies {
  font-size: 12;
  color: rgb(210, 210, 210);
}

.navIcon_buddies:highlighted {
  opacity: 0.6;
}
.navIcon_workouts {
  background-repeat: no-repeat;
  background-position: 23 6;
  text-align: center;
  background-size: 38 28;
  margin-bottom: -43;
}

.navText_workouts {
  font-size: 12;
  color: rgb(210, 210, 210);
}

.navIcon_workouts:highlighted {
  opacity: 0.6;
}

.navIcon_exercises {
  background-repeat: no-repeat;
  background-position: 23 6;
  text-align: center;
  background-size: 38 28;
  margin-bottom: -43;
}

.navText_exercises {
  font-size: 12;
  color: rgb(210, 210, 210);
}

.navIcon_exercises:highlighted {
  opacity: 0.6;
}

.navIcon_dashboard {
  background-repeat: no-repeat;
  background-position: 23 6;
  text-align: center;
  background-size: 38 28;
  margin-bottom: -43;
}

.navText_dashboard {
  font-size: 12;
  color: rgb(210, 210, 210);
}

.navIcon_dashboard:highlighted {
  opacity: 0.6;
}

.navIcon_record {
  background-repeat: no-repeat;
  background-position: 25 3;
  text-align: center;
  background-size: 34 34;
  margin-bottom: -43;
}

.navText_record {
  font-size: 12;
  color: rgb(210, 210, 210);
}

.navIcon_record:highlighted {
  opacity: 0.6;
}

/* .recordIcon {
  text-align: center;
  vertical-align: center;
  height: 30;
}

.recordIcon.active {
  vertical-align: bottom;
} */

.navText {
  margin-bottom: -5;
  font-size: 12;
  color: rgb(210, 210, 210);
  text-align: center;
  vertical-align: bottom;
}
</style>