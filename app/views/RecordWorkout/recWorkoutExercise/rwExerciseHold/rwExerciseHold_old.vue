<template>
  <StackLayout class="workoutPage" verticalAlignment="top">
    <GridLayout rows="auto,auto,auto,auto,auto,auto,auto,*" columns="*">
      <Label
        row="0"
        text="Total: 00:27"
        class="workoutrecord--heading -h4 -default"
        height="10%"
        horizontalAlignment="center"
      ></Label>
      <Label
        row="1"
        text="Hold"
        class="workoutrecord--heading -h3 -primary"
        height="10%"
        horizontalAlignment="center"
      />
      <Label
        row="2"
        :text="exercise.exerciseHeading"
        class="workoutrecord--heading -h3 -default"
        height="5%"
        marginTop="-2%"
        horizontalAlignment="center"
      ></Label>
      <Label
        row="3"
        :text="exercise.exerciseSubType"
        class="workoutrecord--heading -h4 -secondary"
        height="5%"
        horizontalAlignment="center"
      ></Label>
      <GridLayout
        row="4"
        col="0"
        rows="auto"
        columns="*,auto,auto,auto,auto,*"
        verticalAlignment="center"
        horizontalAlignment="center"
        v-show="exerciseStarted == 0"
        marginTop="2"
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
        <!-- <Image
          row="4"
          col="2"
          colspan="2"
          height="271"
          class="icon-progress-wheel"
          horizontalAlignment="center"
          src="~/assets/images/icons/icon_target_large.png"
          @tap="startExercise"
        /> -->
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
        v-show="exerciseStarted == 1 && exerciseCompleted == false"
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
            :maximum="targetTime"
            radius="0.8"
          >
            <ScaleStyle
              v-tkRadialScaleStyle
              ticksVisible="true"
              labelsVisible="true"
              labelsColor="white"
              labelsOffset="0.2"
            ></ScaleStyle>

            <RadialBarIndicator
              v-tkRadialScaleIndicators
              minimum="0"
              :maximum="targetTime"
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
        row="5"
        :text="targetTime + ' seconds'"
        class="workoutrecord--heading -h3 -default"
        height="9%"
        v-show="exerciseStarted == 0"
      ></Label>
      <GridLayout
        row="5"
        rows="auto"
        columns="*,auto,auto,auto,*"
        v-show="exerciseStarted == 1 && exerciseCompleted == false"
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

      <GridLayout
        row="4"
        col="0"
        rows="auto"
        columns="*,auto,auto,auto,auto,*"
        verticalAlignment="center"
        horizontalAlignment="center"
        marginTop="2"
        v-show="exerciseCompleted == true"
      >
        <Image
          row="4"
          col="2"
          colspan="2"
          height="271"
          class="icon-progress-wheel"
          horizontalAlignment="center"
          v-show="targetAchieved == true && exerciseCompleted == true"
          src="~/assets/images/icons/icon-done_large_red.png"
        />
        <Image
          row="4"
          col="2"
          colspan="2"
          height="271"
          class="icon-progress-wheel"
          horizontalAlignment="center"
          v-show="targetAchieved == false"
          src="~/assets/images/icons/icon_done_large_grey.png"
        />
      </GridLayout>
      <GridLayout
        row="6"
        columns="auto,auto,auto"
        horizontalAlignment="center"
        marginTop="2%"
        v-show="exerciseCompleted == true"
      >
        <Label
          col="0"
          :text="this.timeCompleted"
          class="workoutrecord--heading -h3 -default"
          height="10%"
        />
        <Label
          col="1"
          text=" of "
          class="workoutrecord--heading -h3 -secondary"
          height="10%"
        />
        <Label
          col="2"
          :text="this.targetTime"
          class="workoutrecord--heading -h3 -primary"
          height="10%"
        />
      </GridLayout>

      <Label
        row="7"
        text="Good Job!"
        class="workoutrecord--heading -h2 -default"
        height="10%"
        horizontalAlignment="center"
        v-show="exerciseCompleted == true && targetAchieved == true"
      />
      <Label
        row="7"
        text="Rest day is it?"
        class="workoutrecord--heading -h2 -default"
        height="10%"
        horizontalAlignment="center"
        v-show="exerciseCompleted == true && targetAchieved == false"
      />

      <Button
        row="6"
        class="btn-primary"
        text="Done"
        marginTop="25"
        verticalAlignment="bottom"
        v-show="exerciseStarted == 1 && exerciseCompleted == false"
        @tap="completeExercise()"
      />
      <ContentView
        class="exercisedetail__container"
        row="7"
        v-show="exerciseCompleted == false"
      >
        <GridLayout
          rows="*"
          columns="*,auto,auto,*"
          @tap="showExercise(exercise)"
        >
          <Image
            src="~/assets/images/icons/icon_exercisedetail.png"
            col="1"
            height="50"
            marginleft="-10"
            marginBottom="0"
          />
          <Label
            col="2"
            text="Exercise Detail"
            :class="
              isTouched
                ? 'workoutrecord--heading -h4 -default'
                : 'workoutrecord--heading -h4 -secondary'
            "
            fontWeight="Bold"
            horizontalAlignment="center"
            @touch="onTapButton()"
          ></Label>
        </GridLayout>
      </ContentView>
    </GridLayout>
  </StackLayout>
</template>
<script>
import exerciseDetail from "../../../Exercises/exerciseDetail/exerciseDetail";

import { Utils } from "@nativescript/core";
//const Timer = require("timer");
import { TNSPlayer } from "nativescript-audio";
//const audio = require("nativescript-audio");
const player = new TNSPlayer();
const playerOptions = {
  audioFile: "~/assets/sounds/beep.mp3",
  loop: false,
};
var countId;

export default {
  props: ["exercise"],
  components: { exerciseDetail },
  methods: {
    onExerciseLoaded(args) {
      this.exerciseResult.timeStart = new Date();
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
    countdownStart() {
      if (this.timerActive == false) {
        this.timerActive = true;
        this.togglePlay();

        countId = Utils.setInterval(() => {
          if (this.timeCompleted < this.targetTime) {
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
    completeExercise() {
      this.countdownPause();
      this.exerciseCompleted = true;
      if (this.timeCompleted >= this.targetTime * this.slackerTargetCutoff) {
        this.targetAchieved = true;
      }
    },
    countdownPause() {
      Utils.clearInterval(countId);
      this.timerActive = false;
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

    showExercise(payload) {
      this.countdownPause();
      this.$navigateTo(exerciseDetail, {
        props: {
          exercise: payload,
        },
        animated: true,
        transition: {
          name: "slideTop",
          duration: 300,
          curve: "easeIn",
        },
      });
      this.isTouched = false;
    },
    resetExerciseData() {
      this.exerciseResult.completedCount = 0;
      this.exerciseResult.timeStart = new Date();
      this.exerciseResult.timeEnd = 0;
      this.exerciseResult.duration = 0;
      this.timeCompleted = 0;
      this.countdownReset();
      this.targetAchieved = false;
      this.exerciseStarted = 0;
      this.timerActive = false;
    },
  },

  data() {
    return {
      isTouched: false,
      timerHoldDelayStart: 2000,
      targetTime: 10,
      timeCompleted: 0,
      timerActive: false,
      exerciseStarted: 0,
      exerciseCompleted: false,
      targetAchieved: false,
      slackerTargetCutoff: 0.35,
      exercise: {
        workoutPlanId: "WOP0000000001",
        isFavourite: "true",
        exerciseName: "Upper Body Builder",
        authorId: "USR000000001",
        authorName: "John Doe",
        muscles: "Arms, Chest, Back, Core",
        projectedDuration: "22",
        exerciseCount: "6",
        exerciseSets: "3",
        difficulty: "Intermediate, Hard",
        equipment: "Pull up bar, Parallel Bars",
      },
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
@import "../../../../_app-variables";
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
</style>
