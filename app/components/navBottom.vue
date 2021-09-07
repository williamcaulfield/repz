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
      @tap="navigateToDashboard"
      rows="*,auto"
      cols="auto"
      class="nav"
      col="0"
      row="0"
      width="20%"
    >
      <Image
        :class="selectedTab == 0 ? 'active' : ''"
        row="0"
        class="navIcon"
        :src="
          selectedTab == 0
            ? '~/assets/images/icons/icon_dashboard_red.png'
            : '~/assets/images/icons/icon_dashboard_grey.png'
        "
      />
      <Label row="1" text="Dashboard" class="navText"></Label>
    </GridLayout>
    <GridLayout
      :class="selectedTab == 1 ? 'active' : ''"
      @tap="navigateToExercises"
      rows="*,auto"
      cols="auto"
      class="nav"
      col="1"
      row="0"
      width="20%"
    >
      <Image
        :class="selectedTab == 1 ? 'active' : ''"
        row="0"
        class="navIcon"
        :src="
          selectedTab == 1
            ? '~/assets/images/icons/icon_exercises_red.png'
            : '~/assets/images/icons/icon_exercises_grey.png'
        "
      />
      <Label row="1" text="Exercises" class="navText"></Label>
    </GridLayout>
    <GridLayout
      :class="selectedTab == 2 ? 'active' : ''"
      @tap="navigateToRecordWorkout"
      rows="*,auto"
      cols="auto"
      class="nav"
      col="2"
      row="0"
      width="20%"
    >
      <Image
        :class="selectedTab == 2 ? 'active' : ''"
        row="0"
        class="recordIcon"
        :src="
          selectedTab == 2
            ? '~/assets/images/icons/icon_record_grey.png'
            : '~/assets/images//icons/icon_record_red.png'
        "
      />
      <Label row="1" text="Record" class="navText"></Label>
    </GridLayout>

    <GridLayout
      :class="selectedTab == 3 ? 'active' : ''"
      @tap="navigateToWorkouts"
      rows="*,auto"
      cols="auto"
      class="nav"
      col="3"
      row="0"
      width="20%"
    >
      <Image
        :class="selectedTab == 3 ? 'active' : ''"
        row="0"
        class="navIcon"
        :src="
          selectedTab == 3
            ? '~/assets/images/icons/icon_workouts_red.png'
            : '~/assets/images/icons/icon_workouts_grey.png'
        "
      />
      <Label row="1" text="Workouts" class="navText"></Label>
    </GridLayout>

    <GridLayout
      :class="selectedTab == 4 ? 'active' : ''"
      @tap="navigateToBuddies"
      rows="*,auto"
      cols="auto"
      class="nav"
      col="4"
      row="0"
      width="20%"
    >
      <Image
        :class="selectedTab == 4 ? 'active' : ''"
        row="0"
        class="navIcon"
        :src="
          selectedTab == 4
            ? '~/assets/images/icons/icon_buddies_red.png'
            : '~/assets/images/icons/icon_buddies_grey.png'
        "
      />
      <Label row="1" text="Buddies" class="navText"></Label>
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
  text-align: center;
  vertical-align: center;
  height: 18;
}

.navIcon.active {
  vertical-align: bottom;
}

.recordIcon {
  text-align: center;
  vertical-align: center;
  height: 30;
}

.recordIcon.active {
  vertical-align: bottom;
}

.navText {
  margin-bottom: -5;
  font-size: 12;
  color: rgb(210, 210, 210);
  text-align: center;
}
</style>