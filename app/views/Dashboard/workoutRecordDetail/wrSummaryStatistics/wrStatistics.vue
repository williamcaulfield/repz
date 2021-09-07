<template>
  <ContentView class="wrstatistics--container" id="myView">
    <GridLayout rows="auto,auto" columns="auto">
      <RadListView
        row="0"
        for="item in statistics"
        layout="list"
        backgroundColor="transparent"
        marginTop="20"
        height="80"
      >
        <v-template>
          <GridLayout columns="auto, *, 180">
            <Label
              col="0"
              :text="item.name"
              class="text -medium -bold -primary -left"
              marginLeft="15"
            />
            <Label
              col="2"
              :text="item.total"
              class="text -medium -default -right"
              marginRight="15"
            />
          </GridLayout>
        </v-template>
      </RadListView>
      <RadListView
        row="1"
        for="item in breakdownExercises"
        layout="list"
        backgroundColor="transparent"
      >
        <v-template name="header">
          <GridLayout columns="auto, *, 80">
            <Label
              col="0"
              text="Exercise"
              class="text -large -bold -primary -left"
              marginLeft="15"
            />
            <Label
              col="1"
              text="Counts"
              class="text -large -bold -primary -right"
            />
            <Label
              col="2"
              text="Total"
              class="text -large -bold -primary -right"
              marginRight="15"
            />
          </GridLayout>
        </v-template>
        <v-template>
          <GridLayout columns="auto, *, 80">
            <Label
              col="0"
              :text="item.exerciseName"
              class="text -medium -default -left"
              marginLeft="15"
            />>
            <Label
              col="1"
              :text="item.setCounts"
              class="text -medium -default -right"
            />
            <Label
              col="2"
              :text="item.totalVolume"
              class="text -medium -bold -default -right"
              marginRight="15"
            />
          </GridLayout>
        </v-template>
      </RadListView>
    </GridLayout>
  </ContentView>
</template>

<script>
export default {
  props: ["workoutRecorded"],
  mixins: [],
  components: {},
  mounted() {
    this.statistics.push({
      name: "Time",
      total: this.workoutRecorded.workoutRecordedAnalysis.time,
    });
    this.statistics.push({
      name: "Calories",
      total: this.workoutRecorded.workoutRecordedAnalysis.calories,
    });
    this.statistics.push({
      name: "Muscles",
      total: this.workoutRecorded.workoutRecordedAnalysis.muscles,
    });
    // this.time = this.workoutRecorded.workoutRecordedAnalysis.time;
    // this.calories = this.workoutRecorded.workoutRecordedAnalysis.calories;
    // this.muscles = this.workoutRecorded.workoutRecordedAnalysis.muscles;
    this.breakdownExercises =
      this.workoutRecorded.workoutRecordedAnalysis.breakdownExercises;
  },
  methods: {},
  data() {
    return {
      breakdownExercises: [],
      time: "",
      calories: "",
      muscles: [],
      statistics: [
        // { name: "Time", total: "22 min" },
        // { name: "Calories", total: "573 Kcal" },
        // { name: "Muscles", total: "Chest, Arms, Core" },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../../../../_app-variables";
// End custom common variables

// Custom styles

.wrstatistics--container {
  width: 95%;
  height: 300;
  border-radius: $border-radius;
  margin-bottom: 20;
  background-color: $container-gradient-light;
}
.wrstatistics--container-grid {
  padding: 15;
}
</style>
