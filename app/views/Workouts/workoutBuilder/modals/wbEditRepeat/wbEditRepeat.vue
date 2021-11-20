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
            @tap="repeatsCountPlus"
          />
        </GridLayout>

        <GridLayout rows="auto,auto" columns="auto,*,auto" marginTop="30">
          <Label
            row="0"
            col="0"
            text="Reduce Reps each Repeat"
            class="text -default -medium -left"
            horizontalAlignment="left"
          />

          <Slider
            col="0"
            row="1"
            colSpan="3"
            value="10"
            minValue="0"
            maxValue="100"
            backgroundColor="red"
            color="red"
            marginTop="20"
          />
          <!-- 
          <Image
            col="2"
            row="0"
            class="icon-plus"
            :src="'~/assets/images/icons/icon_minus_small_red.png'"
            @tap="weightExtraMinus"
          />

          <NumericKeyboard
            id="nk2"
            row="0"
            col="3"
            class="field_numberentry"
            @returnPress="setAmountWeightExtra"
            :text="weightExtra"
            ref="input_weightExtra"
            locale="en_US"
            noDecimals="false"
            returnKeyTitle="OK"
            horizontalAlignment="center"
            maxLength="4"
          ></NumericKeyboard>

          <Image
            col="4"
            row="0"
            class="icon-minus"
            :src="'~/assets/images/icons/icon_plus_small_red.png'"
            @tap="weightExtraPlus"
          /> -->
        </GridLayout>

        <GridLayout rows="auto,auto" columns="auto,*,auto" marginTop="30">
          <Label
            row="0"
            col="0"
            text="Reduce Weight each Repeat"
            class="text -default -medium -left"
            horizontalAlignment="left"
          />

          <Slider
            col="0"
            row="1"
            colSpan="3"
            value="10"
            minValue="0"
            maxValue="100"
            backgroundColor="red"
            color="red"
            marginTop="20"
          />
          <!-- 
          <Image
            col="2"
            row="0"
            class="icon-plus"
            :src="'~/assets/images/icons/icon_minus_small_red.png'"
            @tap="weightExtraMinus"
          />

          <NumericKeyboard
            id="nk2"
            row="0"
            col="3"
            class="field_numberentry"
            @returnPress="setAmountWeightExtra"
            :text="weightExtra"
            ref="input_weightExtra"
            locale="en_US"
            noDecimals="false"
            returnKeyTitle="OK"
            horizontalAlignment="center"
            maxLength="4"
          ></NumericKeyboard>

          <Image
            col="4"
            row="0"
            class="icon-minus"
            :src="'~/assets/images/icons/icon_plus_small_red.png'"
            @tap="weightExtraPlus"
          /> -->
        </GridLayout>
        <!-- <Label
          text="Exercise Pace"
          class="text -default -medium -left"
          horizontalAlignment="left"
          marginTop="30"
        />

        <ListPicker
          class="picker"
          :items="exercisePace"
          :selectedIndex="exercisePaceSelectedIndex"
          @selectedIndexChange="listPickerChangeExPace($event)"
          horizontalAlignment="center"
        />

        <Label
          text="Weight Units"
          class="text -default -medium -left"
          horizontalAlignment="left"
        />

        <ListPicker
          class="picker"
          :items="weightUnits"
          :selectedIndex="weightUnitsSelectedIndex"
          @selectedIndexChange="listPickerChangeWeightUnits($event)"
        /> -->
      </StackLayout>
      <Button
        col="0"
        row="1"
        class="btn-primary"
        text="Apply"
        @tap="exitAndSaveChanges()"
        marginBottom="15"
        marginLeft="25"
        marginRight="25"
      />
      <Button
        col="0"
        row="2"
        class="btn-primary"
        text="Remove Exercise"
        @tap="exitAndDeleteExercise()"
        marginBottom="20"
        marginLeft="23"
        marginRight="23"
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
    //Overwrite List picker initialisations
    this.dataChanged = false;
  },

  methods: {
    setAmountRepeats() {
      this.dataChanged = true;
      this.repeatCount = parseInt(this.$refs.input_repeats.nativeView.text);
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
      repeatCount: 1,
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
