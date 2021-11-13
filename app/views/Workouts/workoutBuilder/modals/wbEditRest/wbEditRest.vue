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
            text="Edit Rest"
            marginLeft="10"
          />
        </GridLayout>

        <GridLayout rows="auto" columns="auto,*,auto,auto,auto" marginTop="30">
          <Label
            row="0"
            col="0"
            text="Rest Time (Seconds)"
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
    //Overwrite List picker initialisations
    this.dataChanged = false;

    this.exerciseTargetCount = this.exercisePlanned.estimateDuration;
  },

  methods: {
    setAmountExerciseTargetCount() {
      this.exerciseTargetCount = parseInt(
        this.$refs.input_exerciseTargetCount.nativeView.text
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
      this.exercisePlanned.estimateDuration = this.exerciseTargetCount;

      this.$modal.close();
    },
  },
  data() {
    return {
      exerciseTargetCount: null,

      dataChanged: false,
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
