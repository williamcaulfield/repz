<template>
  <StackLayout class="main" @tap="onClickButton()">
    <ContentView class="exerciseSummary__container" id="myView">
      <GridLayout
        class="exerciseSummary__container-grid"
        rows="30,20,*,30"
        columns="92,*,30"
      >
        <Image
          col="0"
          row="0"
          rowSpan="4"
          class="exercise-image-thumbnail"
          stretch="aspectFill"
          horizontalAlignment="left"
          :src="exercise.exerciseImage"
        />
        <Label
          v-show="exercise.exerciseSubType != ''"
          row="0"
          col="1"
          class="text -medium -default -bold -left"
          :text="exercise.exerciseName + ' - ' + exercise.exerciseSubType"
          marginTop="0"
          marginLeft="5"
        />

        <Label
          v-show="exercise.exerciseSubType == ''"
          row="0"
          col="1"
          class="text -medium -default -bold -left"
          :text="exercise.exerciseName"
          marginTop="0"
          marginLeft="5"
        />

        <Label
          row="1"
          col="1"
          class="text -small -default -left"
          :text="exercise.muscleZones"
          marginTop="8"
          marginLeft="5"
        />
        <Image
          col="2"
          row="0"
          class="icon-heart"
          src="~/assets/images/icons/icon_heart_filled.png"
          verticalAlignment="center"
          horizontalAlignment="right"
          marginRight="10"
          marginTop="5"
        />

        <Label
          row="2"
          class="line"
          col="1"
          colSpan="2"
          marginBottom="5"
          marginLeft="5"
        ></Label>
        <GridLayout
          rows="*"
          columns="auto,auto,*,auto,auto"
          row="3"
          col="1"
          colSpan="2"
          marginRight="10"
        >
          <Label
            row="0"
            col="0"
            class="text -small -default -secondary -left"
            text="Type: "
            marginLeft="5"
          />
          <Label
            row="0"
            col="1"
            class="text -small -primary -bold -left"
            :text="exercise.repsOrHold"
          />
          <Label
            row="0"
            col="3"
            class="text -small -default -left"
            text="Level: "
          />
          <Label
            row="0"
            col="4"
            class="text -small -primary -right -bold"
            :text="exercise.difficultyLevel"
          />
        </GridLayout>
      </GridLayout>
    </ContentView>
  </StackLayout>
</template>

<script>
export default {
  props: ["exercise"],
  components: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    onClickButton() {
      this.$emit("clicked");
    },
  },
  data() {
    return {
      // isLike: false,
      // isHeart: false
    };
  },
};
</script>
<style scoped lang="scss">
// Start custom common variables
@import "../../../_app-variables";
// End custom common variables

// Custom styles
.exerciseSummary__container {
  width: 90%;
  height: 90;
  border-radius: 10;
  border-color: $border-color;
  border-width: $border-width;
  margin-top: 10;
  margin-bottom: 10;
  background-image: linear-gradient(
    to bottom,
    $container-gradient-light,
    $container-gradient-dark
  );
}

.line {
  border-bottom-width: $border-width;
  border-bottom-color: $primary-color;
  margin-left: 0;
  margin-right: 10;
}
.exercise-image-thumbnail {
  vertical-align: center;
  margin-left: -4;
  margin-top: 0;
  width: 92;
}
.icon-heart {
  width: 20;
  margin-top: 5;
  margin-right: 5;
}
</style>
