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
            text="Repetitions"
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
            hint="160"
            class="field_numberentry"
            maxLength="3"
            horizontalAlignment="right"
          />
          <Image
            col="4"
            row="0"
            class="icon-minus"
            :src="'~/assets/images/icons/icon_plus_small_red.png'"
          />
        </GridLayout>

        <GridLayout rows="auto" columns="auto,*,auto,auto,auto" marginTop="30">
          <Label
            row="0"
            col="0"
            text="Extra Weight"
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
            hint="160"
            class="field_numberentry"
            maxLength="3"
            horizontalAlignment="right"
          />
          <Image
            col="4"
            row="0"
            class="icon-minus"
            :src="'~/assets/images/icons/icon_plus_small_red.png'"
          />
        </GridLayout>
        <Label
          text="Exercise Pace"
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
          text="Weight Units"
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
          text="Rest Periods"
          class="text -default -medium -left"
          horizontalAlignment="left"
        />
        <ListPicker
          class="picker"
          :items="restPeriods"
          selectedIndex="7"
          @selectedIndexChange="selectedIndexChanged"
        />
      </StackLayout>
      <Button
        col="0"
        row="1"
        class="btn-primary"
        text="Apply to Exercise"
        @tap="$modal.close()"
        marginBottom="15"
        marginLeft="25"
        marginRight="25"
      />
      <Button
        col="0"
        row="2"
        class="btn-primary"
        text="Remove Exercise"
        @tap="$modal.close()"
        marginBottom="20"
        marginLeft="23"
        marginRight="23"
      />
    </GridLayout>
  </ContentView>
</template>

<script>
export default {
  methods: {},
  data() {
    return {
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
