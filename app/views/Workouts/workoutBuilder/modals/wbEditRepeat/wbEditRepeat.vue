<template>
  <ContentView class="editexercise-container">
    <GridLayout rows="*,auto,auto" columns="*">
      <StackLayout
        backgroundColor="black"
        class="editexercise-stack"
        row="0"
        col="0"
      >
        <GridLayout rows="auto" columns="auto,*">
          <Image
            row="0"
            col="0"
            class="wb_navicon"
            :src="'~/assets/images/icons/icon_repeat_red.png'"
          />
          <Label
            row="0"
            col="1"
            class="text -xlarge -bold -default -left"
            text="Repeat"
            marginLeft="10"
          />
        </GridLayout>

        <GridLayout rows="auto" columns="auto,*,auto,auto,auto" marginTop="30">
          <Label
            row="0"
            col="0"
            text="Repeats"
            class="text -default -medium -left"
            horizontalAlignment="left"
          />
          <Image
            col="2"
            row="0"
            class="icon-plus"
            :src="'~/assets/images/icons/icon_minus_small_red.png'"
          />
          <TextField
            row="0"
            col="3"
            hint="3"
            class="field_numberentry"
            maxLength="2"
            horizontalAlignment="right"
          />
          <Image
            col="4"
            row="0"
            class="icon-minus"
            :src="'~/assets/images/icons/icon_plus_small_red.png'"
          />
        </GridLayout>

        <GridLayout rows="auto" columns="auto,*,auto,auto" marginTop="30">
          <Label
            row="0"
            col="0"
            text="Rest Periods"
            class="text -default -medium -left"
            horizontalAlignment="left"
          />
          <Switch
            row="0"
            col="2"
            checked="true"
            loaded="onSwitchLoaded"
            offBackgroundColor="hsl(0, 4.2%, 40%)"
            color="rgb(194, 194, 194)"
            backgroundColor="red"
            horizontalAlignment="right"
          />
        </GridLayout>

        <GridLayout rows="auto" columns="auto,*,auto,auto" marginTop="30">
          <Label
            row="0"
            col="0"
            text="Extra Load Decrease"
            class="text -default -medium -left"
            horizontalAlignment="left"
          />
          <Switch
            row="0"
            col="2"
            checked="true"
            loaded="onSwitchLoaded"
            offBackgroundColor="hsl(0, 4.2%, 40%)"
            color="rgb(194, 194, 194)"
            backgroundColor="red"
            horizontalAlignment="right"
          />
        </GridLayout>
        <Label
          text="Intra Set Rest Period"
          class="text -default -medium -left"
          horizontalAlignment="left"
          marginTop="30"
        />

        <ListPicker
          class="picker"
          :items="exercisePace"
          selectedIndex="1"
          @selectedIndexChange="selectedIndexChanged"
          horizontalAlignment="center"
        />

        <Label
          text="Reps Decrease Rate"
          class="text -default -medium -left"
          horizontalAlignment="left"
        />

        <ListPicker
          class="picker"
          :items="weightUnits"
          selectedIndex="0"
          @selectedIndexChange="selectedIndexChanged"
        />

        <Label
          text="Decrease Rate"
          class="text -default -medium -left"
          horizontalAlignment="left"
        />
        <Slider
          value="10"
          minValue="0"
          maxValue="100"
          backgroundColor="red"
          color="red"
          marginTop="10"
        />
      </StackLayout>
      <Button
        col="0"
        row="1"
        class="btn-primary"
        text="Apply"
        @tap="exitAndApplyChanges()"
        marginBottom="15"
        marginLeft="25"
        marginRight="25"
      />
      <Button
        col="0"
        row="2"
        class="btn-primary"
        text="Cancel"
        @tap="exitWithoutSaving()"
        marginBottom="20"
        marginLeft="23"
        marginRight="23"
      />
    </GridLayout>
  </ContentView>
</template>

<script>
  import { Dialogs } from "@nativescript/core";
export default {
    props: ["exercisePlanned"],
  mounted() {
    //Overwrite List picker initialisations
    this.dataChanged = false;

    this.exerciseTargetCount = this.exercisePlanned.estimateDuration;
  },

  methods: {
    setAmountRepetitions() {
      this.dataChanged = true;
      this.repetitions = parseInt(
        this.$refs.input_repetitions.nativeView.text
      );
    },

    repsCountPlus() {
      this.dataChanged = true;
      this.repetitions = this.repetitions + 1;
    },
    repsCountMinus() {
      this.dataChanged = true;
      if (this.repetitions > 0) {
        this.repetitions = this.repetitions - 1;
      }
    },

    exitWithoutSaving() {
      if (this.dataChanged) {
        Dialogs.confirm({
          message: "You have unsaved changes, are you sure?",
          okButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result) {
            this.$modal.close();
          }
        });
      } else {
        this.$modal.close();
      }
    },
    exitAndApplyChanges() {
      
      this.$modal.close();
    },
  },
  data() {
    return {
      repetitions: null,
      dataChanged: false,
      targetDecrement: 100,
      splitGroupIntoSets: false,
      maxTargetDecrementCycles: null,
      maxWeightDecrementCycles: null,
      reduceTargetEachRepeat: false,
      reduceWeightEachRepeat: false,
      restPeriodbBetweenExercises: null,
      restPeriodBetweenSets: null,
      exercisePace: ["Fast", "Normal", "Slow"],
      weightUnits: ["Kilograms", "Pounds"],
      restPeriods: [
        "5 minutes",
        "4 minutes",
        "3 minutes",
        "2.5 minutes",
        "2 minutes",
        "1.5 minutes",
        "60 seconds",
        "45 seconds",
        "30 seconds",
        "15 seconds",
        "None",
      ],
    };
  },
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../../../../../_app-variables";
// End custom common variables
// Custom styles
.editexercise-container {
  height: 700;
  width: 90%;
  border-radius: $border-radius;
  background-color: $background-gradient-dark;
}

.editexercise-stack {
  padding: 25;
}

.icon_plus {
  height: 39;
}

.icon_minus {
  height: 39;
}

.wb_navicon {
  text-align: center;
  vertical-align: center;
  height: 30;
  margin-top: 3;
}

.picker {
  color: $text-color-primary;
  width: 90%;
  height: 80;
  vertical-align: middle;
  align-content: right;
}
.field_numberentry {
  color: $primary-color;
  background-color: black;
  width: 80;
  height: 40;
  text-align: center;
  font-size: 24;
  font-weight: bold;
  placeholder-color: $secondary-color;
}
</style>
