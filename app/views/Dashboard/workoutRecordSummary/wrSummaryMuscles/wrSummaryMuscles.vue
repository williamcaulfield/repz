<template>
  <StackLayout class="main">
    <ContentView class="wrsummarymusclesexercises__container">
      <GridLayout
        rows="*"
        columns="auto,auto"
        class="wrsummarymusclesexercises__grid"
      >
        <wrMuscles
          row="0"
          col="0"
          :breakdownMuscleZones="this.breakdownMuscleZones"
        />
      </GridLayout>
    </ContentView>
  </StackLayout>
</template>

<script>
import wrMuscles from "./wrMuscles/wrMuscles";

export default {
  props: ["breakdownMuscleZones"],
  components: {
    wrMuscles,
  },
  mounted() {},
  methods: {
    onClickButton() {
      this.$emit("clicked", this.workout);
    },
  },
  data() {
    return {};
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
