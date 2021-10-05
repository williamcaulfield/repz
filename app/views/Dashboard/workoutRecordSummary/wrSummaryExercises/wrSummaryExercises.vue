<template>
  <ScrollView>
    <StackLayout class="main">
      <!-- <ContentView class="wrsummarymusclesexercises__container"> -->
      <GridLayout rows="auto,auto,auto,auto,auto,auto" columns="auto,10,auto">
        <wrExercise
          v-show="breakdownExercises.length > 0"
          row="0"
          col="0"
          image="xerciseIcon"
          count="10"
        />
        <template v-if="breakdownExercises.length > 1">
          <wrExercise
            row="0"
            col="2"
            :image="breakdownExercises[1].exerciseIcon"
            :count="breakdownExercises[1].totalVolume"
        /></template>

        <template v-if="breakdownExercises.length > 2">
          <wrExercise
            row="1"
            col="0"
            :image="breakdownExercises[2].exerciseIcon"
            :count="breakdownExercises[2].totalVolume"
          />
        </template>

        <template v-if="breakdownExercises.length > 3">
          <wrExercise
            row="1"
            col="2"
            :image="breakdownExercises[3].exerciseIcon"
            :count="breakdownExercises[3].totalVolume"
          />
        </template>

        <template v-if="breakdownExercises.length > 4">
          <wrExercise
            row="2"
            col="0"
            :image="breakdownExercises[4].exerciseIcon"
            :count="breakdownExercises[4].totalVolume"
          />
        </template>
        <template v-if="breakdownExercises.length > 5">
          <wrExercise
            row="2"
            col="2"
            :image="breakdownExercises[5].exerciseIcon"
            :count="breakdownExercises[5].totalVolume"
          />
        </template>
        <template v-if="breakdownExercises.length > 6">
          <wrExercise
            row="3"
            col="0"
            :image="breakdownExercises[6].exerciseIcon"
            :count="breakdownExercises[6].totalVolume"
          />
        </template>
        <template v-if="breakdownExercises.length > 7">
          <wrExercise
            row="3"
            col="2"
            :image="breakdownExercises[7].exerciseIcon"
            :count="breakdownExercises[7].totalVolume"
          />
        </template>
        <template v-if="breakdownExercises.length > 8">
          <wrExercise
            row="4"
            col="0"
            :image="breakdownExercises[8].exerciseIcon"
            :count="breakdownExercises[8].totalVolume"
          />
        </template>
        <template v-if="breakdownExercises.length > 9">
          <wrExercise
            row="4"
            col="2"
            :image="breakdownExercises[9].exerciseIcon"
            :count="breakdownExercises[9].totalVolume"
          />
        </template>
        <template v-if="breakdownExercises.length > 10">
          <wrExercise
            row="5"
            col="0"
            :image="breakdownExercises[10].exerciseIcon"
            :count="breakdownExercises[10].totalVolume"
          />
        </template>
        <template v-if="breakdownExercises.length > 11">
          <wrExercise
            row="5"
            col="2"
            :image="breakdownExercises[11].exerciseIcon"
            :count="breakdownExercises[11].totalVolume"
          />
        </template>
        <template v-if="breakdownExercises.length > 12">
          <wrExercise
            row="6"
            col="0"
            :image="breakdownExercises[12].exerciseIcon"
            :count="breakdownExercises[12].totalVolume"
          />
        </template>
        <template v-if="breakdownExercises.length > 13">
          <wrExercise
            row="6"
            col="2"
            :image="breakdownExercises[13].exerciseIcon"
            :count="breakdownExercises[13].totalVolume"
          />
        </template>

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
      <!-- </ContentView> -->
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
    // for (var i = 0; i < this.breakdownExercises.length; i++) {
    //   if (i % 2 === 0) {
    //     this.breakdownExercisesOdd.push(this.breakdownExercises[i]);
    //   } else {
    //     this.breakdownExercisesEven.push(this.breakdownExercises[i]);
    //   }
    // }
  },
  methods: {
    onClickButton() {
      this.$emit("clicked", this.workout);
    },
  },
  data() {
    return {
      // breakdownExercisesOdd: [],
      // breakdownExercisesEven: [],
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
