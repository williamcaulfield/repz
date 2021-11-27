<template>
  <ContentView class="editrepeat-container">
    <GridLayout rows="*,auto,auto" columns="*">
      <StackLayout
        backgroundColor="black"
        class="editrepeat-stack"
        row="0"
        col="0"
      >
        <GridLayout rows="auto" columns="auto,*">
          <Image
            row="0"
            col="0"
            class="wb_navicon"
            :src="'~/assets/images/icons/icon_editset_grey.png'"
          />
          <Label
            row="0"
            col="1"
            class="text -xlarge -bold -default -left"
            text="Repeat Exercise"
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
            tintColor="white"
            @tap="repeatsCountMinus"
          />

          <NumericKeyboard
            id="NK1"
            row="0"
            col="3"
            class="field_numberentry"
            :text="repeatCount"
            ref="input_repeatCount"
            @returnPress="setAmountrepeatCount"
            locale="en_US"
            noDecimals="true"
            returnKeyTitle="OK"
            horizontalAlignment="center"
            maxLength="3"
          ></NumericKeyboard>

          <Image
            col="4"
            row="0"
            class="icon-minus"
            :src="'~/assets/images/icons/icon_plus_small_red.png'"
            tintColor="white"
            @tap="repeatsCountPlus"
          />
        </GridLayout>

        <GridLayout rows="auto" columns="auto,*,auto,auto,auto" marginTop="35">
          <Label
            row="0"
            col="0"
            text="Rest Time (sec)"
            class="text -default -medium -left"
            horizontalAlignment="left"
          />
          <Image
            col="2"
            row="0"
            class="icon-plus"
            :src="'~/assets/images/icons/icon_minus_small_red.png'"
            tintColor="white"
            @tap="restTimeMinus"
          />

          <NumericKeyboard
            id="NK2"
            row="0"
            col="3"
            class="field_numberentry"
            :text="restTime"
            ref="input_restTimeCount"
            @returnPress="setRestTime"
            locale="en_US"
            noDecimals="true"
            returnKeyTitle="OK"
            horizontalAlignment="center"
            maxLength="3"
          ></NumericKeyboard>

          <Image
            col="4"
            row="0"
            class="icon-minus"
            :src="'~/assets/images/icons/icon_plus_small_red.png'"
            tintColor="white"
            @tap="restTimePlus"
          />
        </GridLayout>

        <GridLayout
          rows="auto"
          columns="auto,*"
          marginTop="40"
          v-show="selectedItems.length > 1"
        >
          <Label
            row="0"
            col="0"
            text="Add a RestSet each loop"
            class="text -default -medium -left"
            horizontalAlignment="left"
          />
          <Switch
            row="0"
            col="1"
            checked="true"
            v-model="addRestSets"
            offBackgroundColor="hsl(0, 4.2%, 40%)"
            color="rgb(194, 194, 194)"
            backgroundColor="red"
            horizontalAlignment="right"
          />
        </GridLayout>

        <GridLayout rows="auto,auto,auto" columns="auto,*,auto" marginTop="35">
          <Label
            row="0"
            col="0"
            colSpan="3"
            text="Reps or Time: +/- each repeat"
            class="text -default -medium -left"
            horizontalAlignment="left"
          />
          <Label
            row="2"
            col="0"
            text="-50%"
            class="text -default -small -left"
            horizontalAlignment="left"
            marginTop="5"
          />

          <Label
            row="2"
            col="0"
            colSpan="3"
            text="1"
            class="text -default -small -left"
            horizontalAlignment="center"
            marginTop="5"
          />
          <Slider
            ref="multiplierRepsTimeSlider"
            col="0"
            row="1"
            colSpan="3"
            :value="multiplierRepsTime"
            minValue="0.5"
            maxValue="1.5"
            backgroundColor="red"
            color="red"
            marginLeft="0"
            marginRight="0"
            marginTop="10"
            @valueChange="onSliderValueChangeRepsMultiplier($event)"
          />
          <Label
            row="2"
            col="0"
            colSpan="3"
            text="+50%"
            class="text -default -small -left"
            horizontalAlignment="right"
            marginTop="5"
          />
        </GridLayout>

        <GridLayout rows="auto,auto,auto" columns="auto,*,auto" marginTop="40">
          <Label
            row="0"
            col="0"
            colSpan="3"
            text="Weight: +/- each repeat"
            class="text -default -medium -left"
            horizontalAlignment="left"
          />
          <Label
            row="2"
            col="0"
            text="-50%"
            class="text -default -small -left"
            horizontalAlignment="left"
            marginTop="5"
          />

          <Label
            row="2"
            col="0"
            colSpan="3"
            text="1"
            class="text -default -small -left"
            horizontalAlignment="center"
            marginTop="5"
          />
          <Slider
            ref="multiplierWeightSlider"
            col="0"
            row="1"
            colSpan="3"
            :value="multiplierWeight"
            minValue="0.5"
            maxValue="1.5"
            backgroundColor="red"
            color="red"
            marginLeft="0"
            marginRight="0"
            marginTop="10"
            @valueChange="onSliderValueChangeWeightMultiplier($event)"
          />
          <Label
            row="2"
            col="0"
            colSpan="3"
            text="+50%"
            class="text -default -medium -left"
            horizontalAlignment="right"
            marginTop="5"
          />
        </GridLayout>
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
        row="3"
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
  props: ["exercisesPlanned", "selectedItems"],
  mounted() {
    this.dataChanged = false;

    if (this.selectedItems.length === 1) {
      this.addRestSets = false;
    }
  },

  methods: {
    setAmountRepeats() {
      this.dataChanged = true;
      this.repeatCount = parseInt(this.$refs.input_repeatCount.nativeView.text);
    },

    repeatsCountPlus() {
      this.dataChanged = true;
      this.repeatCount = this.repeatCount + 1;
    },
    repeatsCountMinus() {
      this.dataChanged = true;
      if (this.repeatCount > 1) {
        this.repeatCount = this.repeatCount - 1;
      }
    },

    setAmountRestTime() {
      this.dataChanged = true;
      this.restTime = parseInt(this.$refs.input_restTimeCount.nativeView.text);
    },

    restTimePlus() {
      this.dataChanged = true;
      this.restTime = this.restTime + 15;
    },
    restTimeMinus() {
      this.dataChanged = true;
      if (this.restTime > 30) {
        this.restTime = this.restTime - 15;
      } else if (this.restTime > 10) {
        this.restTime = 10;
      }
    },

    onSliderValueChangeRepsMultiplier(args) {
      const step = 0.1;

      this.multiplierRepsTime = Math.round(args.value / step) * step;

      this.$refs.multiplierRepsTimeSlider.nativeView.value =
        this.multiplierRepsTime;
      console.log(this.$refs.multiplierRepsTimeSlider.nativeView.value);
    },

    onSliderValueChangeWeightMultiplier(args) {
      const step = 0.1;

      this.multiplierWeight = Math.round(args.value / step) * step;

      this.$refs.multiplierWeightSlider.nativeView.value =
        this.multiplierWeight;

      console.log(this.$refs.multiplierWeightSlider.nativeView.value);
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
      var repeatSettings = {
        repeatCount: this.repeatCount,
        restTime: this.restTime,
        multiplierRepsTime: this.multiplierRepsTime,
        multiplierWeight: this.multiplierWeight,
        addRestSets: this.addRestSets,
      };
      // this.$emit("applyRepeat", repeatSettings);
      this.$modal.close(repeatSettings);
    },
  },
  data() {
    return {
      repeatCount: 1,
      restTime: 30,
      dataChanged: false,
      multiplierRepsTime: 1.0,
      multiplierWeight: 1.0,
      addRestSets: true,
    };
  },
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../../../../../_app-variables";
// End custom common variables
// Custom styles
.editrepeat-container {
  height: 700;
  width: 90%;
  border-radius: $border-radius;
  background-color: $background-gradient-dark;
}

.editrepeat-stack {
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
