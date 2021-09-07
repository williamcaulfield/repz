<template>
  <GridLayout
    class="workoutRecordSummary-titleBar"
    columns="auto,*"
    rows="auto,auto,auto"
    verticalAlignment="center"
  >
    <Image
      horizontalAlignment="center"
      stretch="aspectFill"
      col="0"
      row="1"
      class="workoutRecordSummary-titleBar__profilePic"
      :src="workout.userProfilePic"
    />

    <Label
      col="1"
      row="0"
      class="workoutRecordSummary-titleBar__workoutName"
      textwrap="false"
      :text="workout.workoutName"
    />
    <Label row="0" class="line" col="1" />
    <Label
      col="1"
      row="1"
      class="workoutRecordSummary-titleBar__dateTime"
      textwrap="false"
      :text="workout.dateTime"
    />
    <Label
      col="1"
      row="1"
      class="workoutRecordSummary-titleBar__userName"
      textwrap="false"
      :text="workout.userName"
    />
    <Label
      row="0"
      col="1"
      class="workoutRecordSummary-titleBar__caloriesBurnedDuration"
      textwrap="false"
      :text="workout.duration + ' min'"
    />
  </GridLayout>
</template>

<script>
export default {
  data() {
    return {
      workout: {
        workoutName: "Morning Park Session",
        userName: "John Doe",
        userProfilePic:
          "~/assets/images/users/USR000000001/USR000000001_Profile.png",
        dateTime: "01/12/19 12:09:09",
        duration: "22",
        caloriesBurned: "234"
      }
    };
  }
};
</script>

<style scoped lang="scss">
@import "../../../../_app-variables.scss";

.workoutRecordSummary-titleBar__profilePic {
  border-width: 1;
  border-color: rgb(151, 151, 151);
  border-radius: 50%;
  margin-left: 10;
  margin-top: -25;
  width: 65;
  height: 65;
}
.workoutRecordSummary-titleBar__workoutName {
  font-size: 18;
  font-weight: bold;
  color: white;
  vertical-align: bottom;
  margin-left: 7;
  margin-bottom: 5;
  height: 23;
  margin-right: 10;
  margin-left: 5;
  margin-top: 5;
}
.line {
  border-bottom-width: 2;
  border-bottom-color: red;
  margin-bottom: 0;
  margin-right: 10;
  margin-left: 0;
}

.workoutRecordSummary-titleBar__caloriesBurnedDuration {
  font-size: 16;
  color: red;
  text-align: right;
  margin-right: 10;
  vertical-align: bottom;
  margin-bottom: 5;
  font-weight: bold;
}
.workoutRecordSummary-titleBar__userName {
  font-size: 16;
  color: white;
  font-weight: bold;
  text-align: right;
  margin-right: 10;
  margin-bottom: 18;
  vertical-align: bottom;
}
.workoutRecordSummary-titleBar__dateTime {
  font-size: 12;
  color: white;
  text-align: left;
  vertical-align: bottom;
  margin-bottom: 20;
  margin-left: 7;
}

.workoutRecordSummary-actionBar__icon {
  height: 28;
  width: 28;
  margin-bottom: 10;
}
</style>
