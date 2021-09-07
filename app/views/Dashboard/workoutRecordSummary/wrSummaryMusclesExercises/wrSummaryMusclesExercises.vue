<template>
  <ScrollView>
    <StackLayout class="main">
      <ContentView class="wrsummarymusclesexercises__container">
        <GridLayout
          rows="auto,auto,auto,auto,auto,auto,auto"
          columns="auto,*,*"
          class="wrsummarymusclesexercises__grid"
        >
          <wrMuscles
            row="0"
            col="0"
            rowspan="7"
            :breakdownMuscleZones="this.breakdownMuscleZones"
          />

          <RadListView
            row="0"
            col="1"
            for="exercise in breakdownExercisesOdd"
            layout="list"
            backgroundColor="transparent"
            marginTop="20"
            height="180"
          >
            <v-template>
              <GridLayout columns="auto, *, 180">
                <wrExercise
                  :image="exercise.exerciseIcon"
                  :count="exercise.totalVolume"
                />
              </GridLayout>
            </v-template>
          </RadListView>
          <RadListView
            row="0"
            col="2"
            for="exercise in breakdownExercisesEven"
            layout="list"
            backgroundColor="transparent"
            marginTop="20"
            height="180"
          >
            <v-template>
              <GridLayout columns="auto, *, 180">
                <wrExercise
                  :image="exercise.exerciseIcon"
                  :count="exercise.totalVolume"
                />
              </GridLayout>
            </v-template>
          </RadListView>
        </GridLayout>
      </ContentView>
    </StackLayout>
  </ScrollView>
</template>

<script>
import wrExercise from "./wrExercise/wrExercise";
import wrMuscles from "./wrMuscles/wrMuscles";

export default {
  props: ["breakdownMuscleZones", "breakdownExercises"],
  components: {
    wrExercise,
    wrMuscles,
  },
  mounted() {
    for (var i = 0; i < this.breakdownExercises.length; i++) {
      if (i % 2 === 0) {
        this.breakdownExercisesEven.push(this.breakdownExercises[i]);
      } else {
        this.breakdownExercisesOdd.push(this.breakdownExercises[i]);
      }
    }
  },
  methods: {
    onClickButton() {
      this.$emit("clicked", this.workout);
    },
  },
  data() {
    return {
      breakdownExercisesOdd: [],
      breakdownExercisesEven: [],
    };
  },
};
</script>
<style scoped lang="scss">
@import "../../../../_app-variables";

.wrsummarymusclesexercises__container {
  height: 238;
  margin: auto;
  border-width: $border-width;
  border-color: $border-color;
  border-radius: $border-radius;
  background-color: $background-color;
  background-image: linear-gradient(
    to bottom,
    $background-gradient-light,
    $background-gradient-dark
  );
  width: 95%;
}
.wrsummarymusclesexercises__grid {
  padding: 15;
}
</style>
