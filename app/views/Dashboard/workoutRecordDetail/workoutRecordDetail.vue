<template>
  <Page actionBarHidden="true" class="page">
    <ScrollView>
      <StackLayout class="main">
        <GridLayout rows="*" columns="*,*">
          <Label
            row="0"
            col="0"
            text="< Back"
            @tap="close"
            class="text -primary -bold -medium -left"
            marginLeft="10"
            horizontalAlignment="left"
          />
          <Label
            row="0"
            col="1"
            text="Edit >"
            class="text -default -bold -medium -right"
            marginRight="10"
            horizontalAlignment="right"
          />
        </GridLayout>

        <workoutRecordPhotos width="100%" marginTop="10" />
        <wrHeader width="100%" marginTop="15" />
        <wrSummaryMusclesExercises marginTop="15" />
        <wrStatistics margin="20" />
        <wrGraphExercise margin="20" />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import { Frame, Color, isIOS } from "@nativescript/core";

import wrSummaryMusclesExercises from "../workoutRecordSummary/wrSummaryMusclesExercises/wrSummaryMusclesExercises";
import wrHeader from "./wrHeader/wrHeader";
import wrStatistics from "./wrSummaryStatistics/wrStatistics";
import wrGraphExercise from "./wrGraphExercise/wrGraphExercise";

import workoutRecordPhotos from "./workoutRecordPhotos/workoutRecordPhotos";

export default {
  props: ["workout"],
  components: {
    workoutRecordPhotos,
    wrSummaryMusclesExercises,
    wrStatistics,
    wrGraphExercise,
    wrHeader,
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    close() {
      this.$navigateBack();
    },
    onClickButton() {
      this.$emit("clicked");
    },
    pageLoaded(args) {
      const page = args.object;
    },

    onActionBarLoaded(args) {
      if (isIOS) {
        const navigationBar = Frame.topmost().ios.controller.navigationBar;

        const gradient = CAGradientLayer.layer();
        const bounds = navigationBar.bounds;
        gradient.frame = bounds;

        gradient.colors = [
          new Color("red").ios.CGColor,
          new Color("hsl(352.5, 100%, 25%)").ios.CGColor,
        ];
        gradient.startPoint = CGPointMake(0, 0);
        gradient.endPoint = CGPointMake(1, 0);
        const size = CGSizeMake(bounds.size.width, bounds.size.height);
        UIGraphicsBeginImageContext(size);
        gradient.renderInContext(UIGraphicsGetCurrentContext());
        const gradientImage = UIGraphicsGetImageFromCurrentImageContext();
        UIGraphicsEndImageContext();

        // doesn't work without this setTimeout
        setTimeout(() => {
          navigationBar.setBackgroundImageForBarMetrics(
            gradientImage,
            UIBarMetrics.de
          );
        });
      }
    },
  },
  data() {
    return {};
  },
};
</script>
<style scoped lang="scss">
@import "../../../_app-variables.scss";

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
  width: 90%;
}
.wrsummarymusclesexercises__grid {
  padding: 15;
}
</style>
