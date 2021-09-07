<template>
  <GridLayout
    class="navBottom"
    height="45"
    width="100%"
    rows="auto"
    columns="auto,*,auto"
  >
    <Image
      row="0"
      col="0"
      class="iconBack"
      src="~/assets/images/icons/icon_back_grey.png"
      @tap="previousPage"
    />
    <Label row="0" col="1" text="Next" class="navText" @tap="nextPage"></Label>

    <Image
      row="0"
      col="2"
      class="iconPlay"
      src="~/assets/images/icons/icon_play_red.png"
      @tap="nextPage"
    />
  </GridLayout>
</template>

<script>
import navControls from "../../../mixins/navControls";

export default {
  mixins: [navControls],
  components: {
    //recWorkoutNavFrame,
  },
  methods: {
    previousPage() {
      this.$parent.selectedTabviewRw = 0;
    },
    nextPage() {
      this.$parent.selectedTabviewRw = 1;
    },
  },
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../../../_app-variables";
// End custom common variables

// Custom styles
.iconPlay {
  text-align: center;
  vertical-align: center;
  height: 30;
}
.iconback {
  text-align: center;
  vertical-align: center;
  height: 30;
}
.navText {
  margin: 10;
  font-size: 24;
  color: $text-color;
  font-weight: 900;
  text-align: right;
  vertical-align: center;
}
</style>
