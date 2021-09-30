<template>
  <ScrollView>
    <StackLayout class="main">
      <ContentView class="wrsummarymusclesexercises__container">
        <GridLayout
          rows="auto,auto,auto,auto"
          columns="40,40,*"
          class="wrsummarymusclesexercises__grid"
        >
          <wrExercise row="0" col="0" image="xerciseIcon" count="10" />
          <wrExercise row="1" col="0" image="xerciseIcon" count="10" />
          <wrExercise row="2" col="0" image="xerciseIcon" count="10" />
          <wrExercise row="3" col="0" image="xerciseIcon" count="10" />

          <wrExercise row="0" col="1" image="xerciseIcon" count="10" />
          <wrExercise row="1" col="1" image="xerciseIcon" count="10" />
          <wrExercise row="2" col="1" image="xerciseIcon" count="10" />
          <wrExercise row="3" col="1" image="xerciseIcon" count="10" />

          <!-- <ListView
            isUserInteractionEnabled="false"
            row="0"
            col="0"
            ref="listviewodd"
            for="exercise in breakdownExercises"
            backgroundColor="transparent"
          >
            <v-template>
              <wrExercise
                :image="exercise.exerciseIcon"
                :count="exercise.totalVolume"
              />
            </v-template>
          </ListView>

          <ListView
            isUserInteractionEnabled="false"
            row="0"
            col="1"
            ref="listvieweven"
            for="exercise in breakdownExercises"
            backgroundColor="transparent"
          >
            <v-template>
              <wrExercise
                :image="exercise.exerciseIcon"
                :count="exercise.totalVolume"
              />
            </v-template>
          </ListView> -->
        </GridLayout>
      </ContentView>
    </StackLayout>
  </ScrollView>
</template>

<script>
import wrExercise from "./wrExercise/wrExercise";

export default {
  props: ["breakdownExercises"],
  components: {
    wrExercise,
  },
  mounted() {
    for (var i = 0; i < this.breakdownExercises.length; i++) {
      if (i % 2 === 0) {
        this.breakdownExercisesOdd.push(this.breakdownExercises[i]);
      } else {
        this.breakdownExercisesEven.push(this.breakdownExercises[i]);
      }
    }
    console.log(this.breakdownExercises);
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
