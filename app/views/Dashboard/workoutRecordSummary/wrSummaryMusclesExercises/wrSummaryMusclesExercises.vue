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
          <!-- <wrExercise col="1" row="0" :image="'caa'" :count="10" />
          <wrExercise col="1" row="1" :image="'caasdv'" :count="12" /> -->

          <ListView
            row="0"
            col="1"
            ref="listview"
            for="exercise in breakdownExercisesOdd"
            :key="index"
            backgroundColor="transparent"
            marginTop="20"
            height="180"
          >
            <v-template>
              <wrExercise
                :image="exercise.exerciseIcon"
                :count="exercise.totalVolume"
              />
            </v-template>
          </ListView>

          <ListView
            row="0"
            col="2"
            ref="listview"
            for="exercise in breakdownExercisesEven"
            :key="index"
            backgroundColor="transparent"
            marginTop="20"
            height="180"
          >
            <v-template>
              <wrExercise
                :image="exercise.exerciseIcon"
                :count="exercise.totalVolume"
              />
            </v-template>
          </ListView>
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
        this.breakdownExercisesOdd.push(this.breakdownExercises[i]);
      } else {
        this.breakdownExercisesEven.push(this.breakdownExercises[i]);
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
