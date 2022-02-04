<template>
  <GridLayout class="root" rows="*,*,*,*,*,*,*,*,*,*,*,*,*">
    <Label
      row="0"
      text="Exercise Breakdown"
      class="text -default -bold -large"
      horizontalAlignment="left"
      verticalAlignment="center"
      marginTop="10"
      marginBottom="10"
    />

    <RadCartesianChart
      class="barchart_exercise"
      row="1"
      width="100%"
      height="480"
    >
      <BarSeries
        v-tkCartesianSeries
        :items="breakdownExercises"
        categoryProperty="exerciseName"
        valueProperty="totalVolume"
        fillColor="red"
        strokeWidth="4"
        stackMode="None"
      />
      <!-- <BarSeries
        v-tkCartesianSeries
        :items="breakdownExercises"
        categoryProperty="exerciseName"
        valueProperty="totalVolume"
        fillColor="hsl(0, 96%, 34%)"
        strokeWidth="4"
        stackMode="Stack"
      />
      <BarSeries
        v-tkCartesianSeries
        :items="breakdownExercises"
        categoryProperty="exerciseName"
        valueProperty="totalVolume"
        fillColor="hsl(0, 96%, 20%)"
        strokeWidth="3"
        stackMode="Stack"
      /> -->

      <CategoricalAxis
        v-tkCartesianHorizontalAxis
        labelTextColor="white"
        labelFitMode="Rotate"
        labelRotationAngle="-215"
        labelMargin="5"
      />
      <LinearAxis v-tkCartesianVerticalAxis labelTextColor="white" />
    </RadCartesianChart>

    <!-- <Button
      row="1"
      class="btn-primary"
      text="Change Data"
      marginTop="2%"
      @tap="swapData()"
    /> -->

    <!-- <ListPicker #picker class="picker" [items]="items" [selectedIndex]="selectedIndex" 
    verticalAlignment="center" horizontalAlignment="center" 
    (selectedIndexChange)="selectedIndexChanged(picker)"></ListPicker> -->
    <GridLayout row="3" rows="*,*,*" marginTop="20">
      <Label
        row="0"
        text="Difficulty Levels"
        class="text -default -bold -large"
        horizontalAlignment="left"
        verticalAlignment="top"
        marginTop="20"
        marginBottom="10"
      />

      <RadPieChart
        row="1"
        height="400"
        marginTop="-35"
        backgroundColor="transparent"
      >
        <DonutSeries
          v-tkPieSeries
          selectionMode="DataPoint"
          expandRadius="0.4"
          outerRadiusFactor="0.8"
          innerRadiusFactor="0.4"
          valueProperty="categoryValue"
          legendLabel="category"
          :items="breakdownDifficultyLevels"
          showLabels="false"
          fillColors="#FF0000,#BE0D0D,#6E0000,#5A0202,#510101"
          strokeColors="$secondary-color,$secondary-color,$secondary-color,$secondary-color,$secondary-color,$secondary-color"
          strokeWidth="1"
        >
          <PointLabelStyle
            tkDonutLabelStyle
            margin="15"
            fillcolor="blue"
            fontStyle="Bold"
            textSize="10"
          ></PointLabelStyle>
        </DonutSeries>
      </RadPieChart>
      <GridLayout
        class="text -default -bold -small"
        row="2"
        rows="auto,auto"
        columns="80,auto,60,auto"
        marginTop="-20"
      >
        <ContentView
          row="0"
          col="0"
          class="piechart_key"
          backgroundColor="#FF0000"
          horizontalAlignment="right"
          marginRight="10"
        />
        <ContentView
          row="0"
          col="2"
          class="piechart_key"
          backgroundColor="#BE0D0D"
          horizontalAlignment="right"
          marginRight="10"
        />
        <ContentView
          row="1"
          col="0"
          class="piechart_key"
          backgroundColor="#BE0D0D"
          horizontalAlignment="right"
          marginRight="10"
        />
        <ContentView
          row="1"
          col="2"
          class="piechart_key"
          backgroundColor="#510101"
          horizontalAlignment="right"
          marginRight="10"
        />
        <label row="0" col="1" text="foundation" horizontalAlignment="left" />
        <label row="0" col="3" text="intermediate" horizontalAlignment="left" />
        <label row="1" col="1" text="advanced" horizontalAlignment="left" />
        <label row="1" col="3" text="badass" horizontalAlignment="left" />
      </GridLayout>
    </GridLayout>
    <GridLayout row="4" rows="*,*,*" marginTop="20">
      <Label
        row="0"
        text="Muscle Zones"
        class="text -default -bold -large"
        horizontalAlignment="left"
        verticalAlignment="top"
        marginTop="20"
        marginBottom="10"
      />

      <RadPieChart
        row="1"
        height="400"
        marginTop="-35"
        backgroundColor="transparent"
      >
        <DonutSeries
          v-tkPieSeries
          selectionMode="DataPoint"
          expandRadius="0.4"
          outerRadiusFactor="0.8"
          innerRadiusFactor="0.4"
          valueProperty="categoryValue"
          legendLabel="category"
          :items="breakdownMuscleZones"
          showLabels="false"
          fillColors="#FF0000,#BE0D0D,#6E0000,#5A0202,#510101"
          strokeColors="$secondary-color,$secondary-color,$secondary-color,$secondary-color,$secondary-color,$secondary-color"
          strokeWidth="1"
        >
        </DonutSeries>
      </RadPieChart>

      <GridLayout
        class="text -default -bold -small"
        row="2"
        rows="auto,auto,auto,auto"
        columns="80,auto,60,auto"
        marginTop="-20"
      >
        <ContentView
          row="0"
          col="0"
          class="piechart_key"
          backgroundColor="#FF0000"
          horizontalAlignment="right"
          marginRight="10"
        />
        <ContentView
          row="0"
          col="2"
          class="piechart_key"
          backgroundColor="#BE0D0D"
          horizontalAlignment="right"
          marginRight="10"
        />
        <ContentView
          row="1"
          col="0"
          class="piechart_key"
          backgroundColor="#BE0D0D"
          horizontalAlignment="right"
          marginRight="10"
        />
        <ContentView
          row="1"
          col="2"
          class="piechart_key"
          backgroundColor="#510101"
          horizontalAlignment="right"
          marginRight="10"
        />
        <ContentView
          row="2"
          col="0"
          class="piechart_key"
          backgroundColor="#BE0D0D"
          horizontalAlignment="right"
          marginRight="10"
        />
        <ContentView
          row="2"
          col="2"
          class="piechart_key"
          backgroundColor="#510101"
          horizontalAlignment="right"
          marginRight="10"
        />
        <ContentView
          row="3"
          col="0"
          class="piechart_key"
          backgroundColor="#BE0D0D"
          horizontalAlignment="right"
          marginRight="10"
        />
        <ContentView
          row="3"
          col="2"
          class="piechart_key"
          backgroundColor="#510101"
          horizontalAlignment="right"
          marginRight="10"
        />

        <label row="0" col="1" text="Legs" horizontalAlignment="left" />
        <label row="0" col="3" text="Glutes" horizontalAlignment="left" />
        <label row="1" col="1" text="Core" horizontalAlignment="left" />
        <label row="1" col="3" text="Lower Back" horizontalAlignment="left" />
        <label row="2" col="1" text="Upper Back" horizontalAlignment="left" />
        <label row="2" col="3" text="Chest" horizontalAlignment="left" />
        <label row="3" col="1" text="Arms" horizontalAlignment="left" />
        <label row="3" col="3" text="Shoulders" horizontalAlignment="left" />
      </GridLayout>
    </GridLayout>
    <Label
      row="5"
      text="Progress: Repetitions"
      class="text -default -bold -large"
      horizontalAlignment="left"
      verticalAlignment="center"
      marginTop="40"
      marginBottom="10"
    />
    <ListPicker
      class="list_picker"
      ref="picker"
      row="7"
      :items="trackVolumeExercises"
      height="100"
      selectedIndex="0"
      @selectedIndexChange="listPickerExerciseChange($event)"
    ></ListPicker>

    <RadCartesianChart
      class="barchart_exercise"
      row="6"
      width="110%"
      height="400"
      marginRight="0"
      marginLeft="-10"
      marginTop="0"
      marginBottom="10"
    >
      <AreaSeries
        v-tkCartesianSeries
        :items="currentProgressTrackVolume"
        legendTitle="Total Volume"
        categoryProperty="dateRecorded"
        valueProperty="value"
        strokeColor="white"
        strokeWidth="1"
        stackMode="Stack"
        showLabels="true"
      >
        <!-- fillColor="rgba(255, 0, 0, 0.4)"? -->
        <!-- <PointLabelStyle
          v-tkAreaLabelStyle
          margin="10"
          fontStyle="Bold"
          fillColor="#FC6060"
          textSize="10"
          textColor="White"
        ></PointLabelStyle> -->
      </AreaSeries>
      <AreaSeries
        v-tkCartesianSeries
        :items="currentProgressTrackMaxReps"
        legendTitle="Max Reps"
        categoryProperty="dateRecorded"
        valueProperty="value"
        strokeColor="red"
        strokeWidth="1"
        stackMode="Stack"
        showLabels="true"
      >
        <!-- fillColor="rgba(25, 0, 0, 0.4)" -->
        <!-- <PointLabelStyle
          v-tkAreaLabelStyle
          margin="10"
          fontStyle="Bold"
          fillColor="#FC6060"
          textSize="10"
          textColor="Red"
        ></PointLabelStyle> -->
      </AreaSeries>
      <CategoricalAxis
        v-tkCartesianHorizontalAxis
        labelTextColor="white"
        labelFitMode="Rotate"
        labelRotationAngle="-215"
        labelMargin="5"
      />
      <LinearAxis v-tkCartesianVerticalAxis labelTextColor="white" />
      <RadLegendView
        v-tkCartesianLegend
        position="Floating"
        height="150"
        enableSelection="false"
        horizontalOffset="0"
        verticalOffset="-50"
        offsetOrigin="TopRight"
      ></RadLegendView>
    </RadCartesianChart>

    <Label
      row="8"
      text="Progress: Weight (Kg)"
      class="text -default -bold -large"
      horizontalAlignment="left"
      verticalAlignment="center"
      marginTop="20"
      marginBottom="10"
    />

    <ListPicker
      ref="picker"
      class="list_picker"
      row="10"
      :items="trackMaxWeightExercises"
      height="100"
      selectedIndex="0"
      @selectedIndexChange="listPickerExerciseChangeMw($event)"
    ></ListPicker>

    <RadCartesianChart
      class="barchart_exercise"
      row="9"
      width="110%"
      height="500"
      marginRight="0"
      marginLeft="-10"
    >
      <AreaSeries
        v-tkCartesianSeries
        :items="currentProgressTrackMaxWeight"
        legendTitle="Max Weight"
        categoryProperty="dateRecorded"
        valueProperty="value"
        showLabels="true"
        strokeColor="red"
        strokeWidth="1"
        stackMode="Stack"
      />
      <!-- <AreaSeries
        v-tkCartesianSeries
        :items="currentProgressTrackMaxWeight"
        categoryProperty="dateRecorded"
        valueProperty="value"
        fillColor="rgba(25, 0, 0, 0.4)"
        strokeColor="red"
        strokeWidth="1"
        stackMode="Stack"
      /> -->
      <CategoricalAxis
        v-tkCartesianHorizontalAxis
        labelTextColor="white"
        labelFitMode="Rotate"
        labelRotationAngle="-215"
        labelMargin="5"
        hidden="true"
      />
      <LinearAxis v-tkCartesianVerticalAxis labelTextColor="white" />
      <RadLegendView
        v-tkCartesianLegend
        position="Floating"
        height="150"
        enableSelection="false"
        horizontalOffset="0"
        verticalOffset="-38"
        offsetOrigin="TopRight"
      ></RadLegendView>
    </RadCartesianChart>
  </GridLayout>
</template>

<script>
export default {
  props: ["workoutRecordedAnalysis"],
  mounted() {
    this.breakdownExercises = this.workoutRecordedAnalysis.breakdownExercises;
    this.breakdownDifficultyLevels =
      this.workoutRecordedAnalysis.breakdownDifficultyLevels;
    this.breakdownMuscleZones =
      this.workoutRecordedAnalysis.breakdownMuscleZones;
    this.progressTrackVolume = this.workoutRecordedAnalysis.progressTrackVolume;
    this.progressTrackMaxReps =
      this.workoutRecordedAnalysis.progressTrackMaxReps;
    this.progressTrackMaxWeight =
      this.workoutRecordedAnalysis.progressTrackMaxWeight;
    this.userComment = this.workoutRecordedAnalysis.userComment;
    this.achievements = this.workoutRecordedAnalysis.achievements;

    if (this.progressTrackMaxReps.length !== 0) {
      this.selectedTrackVolumeIndex = 0;
      this.currentProgressTrackVolume =
        this.progressTrackVolume[this.selectedTrackVolumeIndex].exerciseRecords;
    }

    if (this.progressTrackMaxReps.length !== 0) {
      this.selectedTrackMaxRepsIndex = 0;
      this.currentProgressTrackMaxReps =
        this.progressTrackMaxReps[
          this.selectedTrackMaxRepsIndex
        ].exerciseRecords;
    }

    if (this.progressTrackMaxWeight.length !== 0) {
      this.selectedTrackMaxWeightIndex = 0;
      this.currentProgressTrackMaxWeight =
        this.progressTrackMaxWeight[
          this.selectedTrackMaxWeightIndex
        ].exerciseRecords;
    }

    for (var i = 0; i < this.progressTrackVolume.length; i++) {
      this.trackVolumeExercises.push(this.progressTrackVolume[i].exerciseName);
      for (
        var p = 0;
        p < this.progressTrackVolume[i].exerciseRecords.length;
        p++
      ) {
        this.progressTrackVolume[i].exerciseRecords[p].dateRecorded =
          this.progressTrackVolume[i].exerciseRecords.length - p;
      }
    }

    for (var i = 0; i < this.progressTrackMaxReps.length; i++) {
      this.trackMaxRepsExercises.push(
        this.progressTrackMaxReps[i].exerciseName
      );
      for (
        var p = 0;
        p < this.progressTrackMaxReps[i].exerciseRecords.length;
        p++
      ) {
        this.progressTrackMaxReps[i].exerciseRecords[p].dateRecorded =
          this.progressTrackMaxReps[i].exerciseRecords.length - p;
      }
    }

    for (var i = 0; i < this.progressTrackMaxWeight.length; i++) {
      this.trackMaxWeightExercises.push(
        this.progressTrackMaxWeight[i].exerciseName
      );
      for (
        var p = 0;
        p < this.progressTrackMaxWeight[i].exerciseRecords.length;
        p++
      ) {
        this.progressTrackMaxWeight[i].exerciseRecords[p].dateRecorded =
          this.progressTrackMaxWeight[i].exerciseRecords.length - p;
      }
    }
  },
  methods: {
    listPickerExerciseChange(args) {
      const picker = args.object;
      this.selectedTrackVolumeIndex = picker.selectedIndex;
      this.selectedTrackMaxRepsIndex = picker.selectedIndex;

      //this.selectedTrackVolumeIndex = this.selectedTrackVolumeIndex + 1;
      //this.selectedTrackMaxRepsIndex = this.selectedTrackMaxRepsIndex + 1;
      this.currentProgressTrackVolume =
        this.progressTrackVolume[this.selectedTrackVolumeIndex].exerciseRecords;
      this.currentProgressTrackMaxReps =
        this.progressTrackMaxReps[
          this.selectedTrackMaxRepsIndex
        ].exerciseRecords;
    },
    listPickerExerciseChangeMw(args) {
      const picker = args.object;
      this.selectedTrackMaxWeightIndex = picker.selectedIndex;
      //this.selectedTrackMaxWeightIndex = this.selectedTrackMaxWeightIndex + 1;

      this.currentProgressTrackMaxWeight =
        this.progressTrackMaxWeight[
          this.selectedTrackMaxWeightIndex
        ].exerciseRecords;
    },
  },
  data() {
    return {
      selectedTrackVolumeIndex: "",
      selectedTrackMaxRepsIndex: "",
      selectedTrackMaxWeightIndex: "",
      currentProgressTrackVolume: [],
      currentProgressTrackMaxReps: [],
      currentProgressTrackMaxWeight: [],
      breakdownExercises: [],
      breakdownDifficultyLevels: [],
      breakdownMuscleZones: [],
      trackVolumeExercises: [],
      trackMaxRepsExercises: [],
      trackMaxWeightExercises: [],
      progressTrackVolume: [],
      progressTrackMaxReps: [],
      progressTrackMaxWeight: [],
      userComment: "",
      achievements: [],
    };
  },
};
</script>

<style scoped lang="scss">
@import "../../../../_app-variables";

.list_picker {
  color: red;
  font-weight: bold;
  margin: 10;
}

.piechart_key {
  width: 10;
  height: 10;
  border-radius: 0;
}
.barchart_exercise {
  background-color: transparent;
}
.root {
  background: transparent;
}
.legend {
  color: #5f6368;
  margin: 24 12;
}

.legend .symbol {
  border-radius: 12;
  width: 12;
  height: 12;
  margin: 0 6;
}

.legend .first {
  background: #3a15ea;
}

.legend .second {
  background: #9926ae;
}

.legend .third {
  background: #d01a5d;
}

.legend .fourth {
  background: #ff9802;
}

.legend .fifth {
  background: #c0ca33;
}
</style>
