<template>
  <StackLayout class="main">
    <!-- <ContentView class="wrsummarymusclesexercises__container"> -->
    <GridLayout rows="*" columns="auto,auto">
      <wrMuscles
        row="0"
        col="0"
        :breakdownMuscleZones="this.breakdownMuscleZones"
      />
    </GridLayout>
    <!-- </ContentView> -->
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
</style>
