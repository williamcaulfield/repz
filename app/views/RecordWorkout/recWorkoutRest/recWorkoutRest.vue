<template>
  <StackLayout class="workoutPage" verticalAlignment="top">
    <GridLayout rows="auto,auto,auto,auto,auto,auto,auto,*" columns="*">
      <Label
        row="0"
        :text="duration"
        class="workoutrecord--heading -h4 -default"
        height="10%"
      ></Label>
      <Label
        row="1"
        text="Rest Time!"
        class="workoutrecord--heading -h3 -primary"
        height="10%"
      />
      <!-- <Label

        row="2"
        :text="exercise.exerciseSubType"
        class="workoutrecord--heading -h5 -secondary"
        height="5%"
      /> -->
            <GridLayout row="2" rows="auto,auto, auto,*" columns="auto" height="7%" horizontalAlignment="center" marginTop="-2%">
              <!-- <Label row="0" col="0" text="Next: " class="workoutrecord--heading -h4 -secondary" /> -->
            
              <Label row="0" col="0" v-show="nextExerciseInSequence != ''"
                :text="'>> ' + nextExerciseInSequence.exerciseHeading + ' - ' + nextExerciseInSequence.exerciseSubType"
                class="workoutrecord--heading -h5 -bold -default" />

              <Label row="1" col="0" v-show="nextExerciseInSequence != '' && nextExerciseInSequence.weightExtra > 0"
                :text="+ ' ' + nextExerciseInSequence.weightExtra + 'Kg'" class="workoutrecord--heading -h5 -bold -primary" />
            
              <Label row="0" col="0" v-show="nextExerciseInSequence == ''" text="Workout Complete"
                class="workoutrecord--heading -h5 -secondary" />
            
            </GridLayout>

      <Label
        row="3"
        text=" "
        class="workoutrecord--heading -h5 -secondary"
        height="4%"
      ></Label>
      <GridLayout
        row="4"
        col="0"
        rows="auto"
        columns="*,auto,auto,auto,auto,*"
        verticalAlignment="center"
        horizontalAlignment="center"
        v-show="exerciseStarted == 0"
        marginTop="-6"
      >
        <Button
          row="4"
          col="2"
          colspan="2"
          class="icon-progress-wheel"
          horizontalAlignment="center"
          backgroundImage="~/assets/images/icons/icon_target_large.png"
          @tap="startExercise"
        />
        <Label
          col="2"
          row="0"
          text="Start"
          class="workoutrecord--heading -h3 -default"
          marginLeft="-30"
          @tap="startExercise"
        />

        <Image
          col="2"
          row="0"
          class="icon-start"
          marginLeft="100"
          marginTop="4"
          src="~/assets/images/icons/icon_play_red.png"
          @tap="startExercise"
        />
      </GridLayout>

      <GridLayout
        row="4"
        col="0"
        rows="auto"
        columns="*,auto,auto,auto,auto,*"
        verticalAlignment="center"
        horizontalAlignment="center"
        v-show="exerciseStarted == 1"
        marginTop="-6"
      >
        <Label
          col="2"
          row="0"
          colspan="2"
          :text="timeCompleted + 's'"
          horizontalAlignment="center"
          class="workoutrecord--heading -h3 -default"
        />
        <RadRadialGauge
          class="gauge"
          height="270"
          width="270"
          row="4"
          col="2"
          colspan="2"
        >
          <RadialScale
            ref="myScale"
            v-tkRadialGaugeScales
            startAngle="-80"
            sweepAngle="340"
            minimum="0"
            :maximum="exercise.estimateDuration"
            radius="0.8"
          >
            <ScaleStyle
              v-tkRadialScaleStyle
              ticksVisible="true"
              labelsVisible="false"
              labelsColor="white"
              labelsOffset="0.2"
            ></ScaleStyle>

            <RadialBarIndicator
              v-tkRadialScaleIndicators
              minimum="0"
              :maximum="exercise.estimateDuration"
              location="1"
            >
              <BarIndicatorStyle
                v-tkRadialBarIndicatorStyle
                fillColor="rgba(142, 3, 3,0.5)"
                barWidth="0.2"
                cap="Round"
              ></BarIndicatorStyle>
            </RadialBarIndicator>

            <RadialBarIndicator
              v-tkRadialScaleIndicators
              minimum="0"
              :maximum="timeCompleted"
              location="1"
              isAnimated="true"
            >
              <BarIndicatorStyle
                v-tkRadialBarIndicatorStyle
                cap="Round"
                fillColor="hsl(0, 95.4%, 42.9%)"
                barWidth="0.2"
              ></BarIndicatorStyle>
            </RadialBarIndicator>
          </RadialScale>
        </RadRadialGauge>
      </GridLayout>

      <Label
        row="6"
        :text="exercise.estimateDuration + ' seconds'"
        class="workoutrecord--heading -h3 -default"
        height="9%"

      />

      <GridLayout
        row="5"
        rows="auto"
        columns="*,auto,auto,auto,*"
        v-show="exerciseStarted == 1"
        marginTop="20"
      >
        <Button
          col="1"
          row="0"
          backgroundImage="~/assets/images/icons/icon_play_filled_red.png"
          class="icon-controls"
          @tap="startExercise"
        />
        <Button
          col="2"
          row="0"
          backgroundImage="~/assets/images/icons/icon_pause_filled_red.png"
          class="icon-controls"
          @tap="countdownPause"
        />
        <Button
          col="3"
          row="0"
          backgroundImage="~/assets/images/icons/icon_repeat_filled_red.png"
          class="icon-controls"
          @tap="countdownReset"
        />
      </GridLayout>

      <Button
        row="6"
        class="btn-primary"
        text="Done"
        marginTop="25"
        verticalAlignment="bottom"
        v-show="exerciseStarted == 1"
        @tap="nextExercise()"
      />
      <ContentView class="exercisedetail__container" row="7">
        <GridLayout rows="*" columns="*,auto,auto,auto,*">
          <Button
            class="icon-minus"
            col="1"
            backgroundImage="~/assets/images/icons/icon_minus_grey.png"
            @tap="restTimeMinus"
          />
          <Label
            col="2"
            text="15 seconds"
            class="workoutrecord--heading -h4 -secondary"
            fontWeight="Bold"
            horizontalAlignment="center"
            margin="20"
          />

          <Button
            class="icon-plus"
            col="3"
            backgroundImage="~/assets/images/icons/icon_plus_grey.png"
            @tap="restTimeAdd"
          />
        </GridLayout>
      </ContentView>
    </GridLayout>
  </StackLayout>
</template>
<script>
import { Utils } from "@nativescript/core";
import { TNSPlayer } from "nativescript-audio";
//const Timer = require("timer");

//const audio = require("nativescript-audio");
const player = new TNSPlayer();
const playerOptions = {
  audioFile: "~/assets/sounds/beep.mp3",
  loop: false,
};
var countId;

export default {
  props: ["exercise", "nextExerciseInSequence", "duration"],

  components: {},
  mounted() {
    this.exercise.estimateDuration = this.exercise.estimateDuration;
  },

  methods: {
    saveExerciseResult() {
      this.writeExerciseResult();
      this.$emit("exerciseComplete", this.exerciseResult);
    },

    writeExerciseResult() {
      this.exerciseResult.completedCount = this.timeCompleted;
      this.exerciseResult.timeEnd = new Date();
      this.exerciseResult.duration = parseInt(
        (this.exerciseResult.timeEnd - this.exerciseResult.timeStart) / 1000
      );
    },

    nextExercise() {
      if (this.timerActive == true) {
        this.togglePlay();
        this.countdownPause();
      }
      setTimeout(() => {
        this.writeExerciseResult();
        this.$emit("nextExercise", this.exerciseResult);
      }, 1000);
    },

    onTapButton() {
      if (this.isTouched) this.isTouched = false;
      else this.isTouched = true;
    },
    togglePlay() {
      if (player.isAudioPlaying()) {
        player.pause();
        player.playFromFile(playerOptions);
        player.resume();
        setTimeout(() => {
          player.dispose();
        }, 500);
      } else {
        player.playFromFile(playerOptions);
        setTimeout(() => {
          player.dispose();
        }, 500);
      }
    },
    searchBarLoaded(args) {
      let sb = args.object;

      sb.ios.searchBarStyle = UISearchBarStyle.Prominent;
      sb.ios.backgroundImage = UIImage.new();
    },
    restTimeMinus() {
      if (
        this.exercise.estimateDuration > this.timeChangeIncrement &&
        this.exercise.estimateDuration - this.timeChangeIncrement >
          this.timeCompleted
      ) {
        this.exercise.estimateDuration =
          this.exercise.estimateDuration - this.timeChangeIncrement;
      }
    },
    restTimeAdd() {
      this.exercise.estimateDuration =
        this.exercise.estimateDuration + this.timeChangeIncrement;
    },
    countdownStart() {
      if (this.timerActive == false) {
        this.timerActive = true;
        this.togglePlay();

        countId = Utils.setInterval(() => {
          if (this.timeCompleted < this.exercise.estimateDuration) {
            this.timeCompleted++;
          } else {
            this.togglePlay();
            Utils.clearInterval(countId);
            this.timerActive = false;
            this.exerciseCompleted = true;
          }
        }, 1000);
      }
    },

    countdownPause() {
      Utils.clearInterval(countId);
      this.timerActive = false;
      this.exerciseCompleted = true;
    },
    countdownReset() {
      Utils.clearInterval(countId);
      this.timerActive = false;
      this.timeCompleted = 0;
      this.exerciseCompleted = false;
    },
    startExercise() {
      this.exerciseStarted = 1;
      setTimeout(() => {
        this.countdownStart();
      }, this.timerHoldDelayStart);
    },
    resetExerciseData() {
      this.exerciseResult.completedCount = 0;
      this.exerciseResult.timeStart = new Date();
      this.exerciseResult.timeEnd = 0;
      this.exerciseResult.duration = 0;
      this.timeCompleted = 0;
      this.countdownReset();
      this.exerciseStarted = 0;
      this.exerciseCompleted = 0;
      this.timerActive = false;
    },
  },
  data() {
    return {
      isTouched: false,
      timerHoldDelayStart: 500,
      //targetTime: 30,
      timeCompleted: 0,
      timerActive: false,
      exerciseStarted: 0,
      exerciseCompleted: false,
      timeChangeIncrement: 15,
      exerciseResult: {
        completedCount: 0,
        timeStart: 0,
        timeEnd: 0,
        duration: 0,
      },
    };
  },
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../../../_app-variables";
// End custom common variables

// Custom styles
.gaugeIndicator {
  background-image: linear-gradient(
    to bottom,
    $background-gradient-light,
    $background-gradient-dark
  );
}
.workoutPage {
  margin: auto;
}

.btn-primary {
  width: 90%;
  font-size: 32;
  height: 60;
}

.btn-secondary {
  width: 90%;
  font-size: 32;
  height: 60;
}
.icon-progress-wheel {
  height: 271;
  width: 271;
  background-size: 271 271;
  background-repeat: no-repeat;
  background-position: center;
  vertical-align: center;
}

.icon-progress-wheel:highlighted {
  opacity: 0.6;
}
.icon-start {
  height: 30;
}
.icon-controls {
  height: 76;
  width: 76;
  margin: 5;
  margin-top: 1;
  border-radius: 38;
  background-repeat: no-repeat;
  background-position: center;
  vertical-align: center;
}
.icon-controls:highlighted {
  background-color: transparent;
}

.icon-controls:active::after {
  background-color: $secondary-color;
}

.btn-primary:hover {
  background-color: grey;
}
.exercisedetail__container {
  width: 90%;
  height: 70;
  margin: auto;
  border-top-left-radius: $border-radius;
  border-top-right-radius: $border-radius;
  margin-top: 0;
  margin-bottom: 0;
  background-color: $background-color;
  vertical-align: bottom;
  background-image: linear-gradient(
    to bottom,
    $background-gradient-light,
    $background-gradient-dark
  );
}
.exercisedetail__container:hover {
  background-color: grey;
}

.icon-plus {
  text-align: right;
  vertical-align: center;
  height: 45;
  width: 45;
  background-size: 45 45;
  background-color: transparent;
  background-repeat: no-repeat;
}

.icon-plus:highlighted {
  opacity: 0.6;
}

.icon-minus {
  text-align: left;
  vertical-align: center;
  height: 45;
  width: 45;
  background-size: 45 10;
  background-color: transparent;
  background-repeat: no-repeat;
  margin-top: 32;
}

.icon-minus:highlighted {
  opacity: 0.6;
}
</style>
