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
            :src="'~/assets/images/icons/icon_editset_grey.png'"
          />
          <Label
            row="0"
            col="1"
            class="text -xlarge -bold -default -left"
            text="Edit Exercise"
            marginLeft="10"
          />
        </GridLayout>

        <GridLayout rows="auto" columns="auto,*,auto,auto,auto" marginTop="30">
          <Label
            row="0"
            col="0"
            text="Hold Time (Seconds)"
            class="text -default -medium -left"
            horizontalAlignment="left"
          />
          <Image
            col="2"
            row="0"
            class="icon-plus"
            :src="'~/assets/images/icons/icon_minus_small_red.png'"
            @tap="repsCountMinus"
          />

          <NumericKeyboard
            id="NK1"
            row="0"
            col="3"
            class="field_numberentry"
            :text="exerciseTargetCount"
            ref="input_exerciseTargetCount"
            @returnPress="setAmountExerciseTargetCount"
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
            @tap="repsCountPlus"
          />
        </GridLayout>

        <GridLayout
          rows="auto"
          columns="auto,*,auto,auto,auto,auto"
          marginTop="30"
        >
          <Label
            row="0"
            col="0"
            :text="'Extra Weight (' + weightUnitsShort + ')'"
            class="text -default -medium -left"
            horizontalAlignment="left"
          />
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
          />
        </GridLayout>

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
        />
      </StackLayout>
      <Button
        col="0"
        row="1"
        class="btn-primary"
        text="Apply to Exercise"
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
        text="Close"
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
    if (this.exercisePlanned.weightDisplayImperial == true) {
      this.weightUnitsShort = "lbs";
      this.weightUnitsSelectedIndex = 1;
    } else {
      this.weightUnitsShort = "Kg";
      this.weightUnitsSelectedIndex = 0;
    }

    //Overwrite List picker initialisations
    this.dataChanged = false;

    this.exerciseTargetCount = this.exercisePlanned.exerciseTargetCount;
    this.weightExtra = this.exercisePlanned.weightExtra;
  },

  methods: {
    setAmountExerciseTargetCount() {
      this.exerciseTargetCount = parseInt(
        this.$refs.input_exerciseTargetCount.nativeView.text
      );
    },

    setAmountWeightExtra() {
      this.weightExtra = parseFloat(
        this.$refs.input_weightExtra.nativeView.text
      );
    },

    repsCountPlus() {
      this.dataChanged = true;
      this.exerciseTargetCount = this.exerciseTargetCount + 1;
    },
    repsCountMinus() {
      this.dataChanged = true;
      if (this.exerciseTargetCount > 0) {
        this.exerciseTargetCount = this.exerciseTargetCount - 1;
      }
    },
    weightExtraPlus() {
      this.dataChanged = true;
      this.weightExtra = this.weightExtra + 0.5;
    },
    weightExtraMinus() {
      if (this.weightExtra >= 0.5) {
        this.dataChanged = true;
        this.weightExtra = this.weightExtra - 0.5;
      } else if (this.weightExtra > 0) {
        this.dataChanged = true;
        this.weightExtra = 0;
      }
    },

    listPickerChangeWeightUnits(args) {
      this.dataChanged = true;
      const picker = args.object;
      this.weightUnitsSelectedIndex = picker.selectedIndex;
      if (picker.selectedIndex === 1) {
        this.exercisePlanned.weightDisplayImperial = true;
      } else {
        this.exercisePlanned.weightDisplayImperial = false;
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
    exitAndSaveChanges() {
      this.exercisePlanned.exerciseTargetCount = this.exerciseTargetCount;
      this.exercisePlanned.weightExtra = this.weightExtra;
      this.$modal.close();
    },
  },
  data() {
    return {
      exerciseTargetCount: null,
      weightExtra: null,
      dataChanged: false,
      weightUnitsSelectedIndex: 0,
      weightUnits: ["Kilograms", "Pounds"],
      weightUnitsShort: "",
    };
  },
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../../../../../../_app-variables";
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
  color: $secondary-color;
  background-color: black;
  width: 80;
  height: 40;
  text-align: center;
  font-size: 24;
  font-weight: bold;
  placeholder-color: $secondary-color;
}
</style>
