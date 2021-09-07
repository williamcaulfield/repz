<template>
  <Page
    class="page_simple"
    actionBarHidden="false"
    backgroundSpanUnderStatusBar="true"
  >
    <ActionBar class="actionBar_simple_dark" flat="true">
      <ActionItem
        icon="~/assets/images/ic_menu_light.png"
        ios.position="left"
        @tap="onToggleDrawerTap()"
      />
      <ActionItem
        class="logo"
        icon="~/assets/images/repzText_red.png"
        height="10"
        ios.position="right"
      />
    </ActionBar>
    <ScrollView orientation="vertical">
      <Gridlayout rows="auto,auto,auto,*" columns="*">
        <GridLayout
          row="0"
          col="0"
          rows="auto,auto,auto"
          columns="*"
          horizontalAlignment="center"
        >
          <Image
            horizontalAlignment="center"
            stretch="aspectFill"
            col="0"
            row="0"
            class="profilePic"
            src="~/assets/images/users/USR000000001/USR000000001_Profile.png"
            marginTop="0"
          />
          <Label
            col="0"
            row="1"
            text="David Emery"
            class="text -primary -bold -xlarge"
            textWrap="true"
            margin="0"
            marginTop="10"
          />
          <Label
            col="0"
            row="2"
            class="text -default -bold -small"
            text="Munich, Germany"
            textWrap="true"
            margin="0"
          />
        </GridLayout>
        <GridLayout
          row="1"
          col="0"
          rows="auto,auto"
          columns="auto,auto,auto"
          horizontalAlignment="center"
          margin="20"
        >
          <Label
            col="0"
            row="0"
            text="Workouts"
            class="text -secondary -bold -medium"
            textWrap="true"
            margin="0"
            marginRight="30"
          />
          <Label
            col="1"
            row="0"
            text="Followers"
            class="text -secondary -bold -medium"
            textWrap="true"
            margin="0"
          />
          <Label
            col="2"
            row="0"
            class="text -secondary -bold -medium"
            text="Following"
            textWrap="true"
            margin="0"
            marginLeft="30"
          />
          <Label
            col="0"
            row="1"
            text="128"
            class="text -primary -bold -xlarge"
            textWrap="true"
            marginRight="30"
          />
          <Label
            col="1"
            row="1"
            text="154"
            class="text -primary -bold -xlarge"
            textWrap="true"
            margin="0"
          />
          <Label
            col="2"
            row="1"
            class="text -primary -bold -xlarge"
            text="450"
            textWrap="true"
            marginLeft="30"
          />
        </GridLayout>

        <Textview
          row="2"
          col="0"
          editable="false"
          class="profile_text"
          textWrap="true"
          :text="profileText"
          marginBottom="30"
          width="92%"
          horizontalAlignment="center"
        />

        <ListView
          row="3"
          col="0"
          ref="listview"
          for="workout in workoutHistoryMe"
          :key="index"
          backgroundColor="transparent"
          height="1200"
          width="95%"
        >
          <v-template>
            <workoutRecordSummary :workout="workout" />
          </v-template>
        </ListView>
      </Gridlayout>
    </ScrollView>
  </Page>
</template>
<script>
import navControls from "../../mixins/navControls";
import workoutRecordSummary from "../Dashboard/workoutRecordSummary/workoutRecordSummary";
import workoutRecordDetail from "../Dashboard/workoutRecordDetail/workoutRecordDetail";
import navBottom from "../../components/navBottom";

export default {
  mixins: [navControls],
  components: {
    workoutRecordSummary,
    workoutRecordDetail,
    navBottom,
  },
  data() {
    return {
      workoutHistoryMe: [
        {
          workoutId: "WOR0000000001",
          workoutName: "My Morning Park Session",
          coverImage:
            "~/assets/images/workoutRecorded/WOR0000000001/WOR0000000001_PIC_01.jpg",
          images: [
            {
              src: "~/assets/images/workoutRecorded/WOR0000000001/WOR0000000001_PIC_01.jpg",
            },
            {
              src: "~/assets/images/workoutRecorded/WOR0000000001/WOR0000000001_PIC_02.jpg",
            },
            {
              src: "~/assets/images/workoutRecorded/WOR0000000001/WOR0000000001_PIC_03.jpg",
            },
            {
              src: "~/assets/images/workoutRecorded/WOR0000000001/WOR0000000001_PIC_04.jpg",
            },
          ],
          userId: "USR000000001",
          userName: "John Doe",
          userProfilePic:
            "~/assets/images/users/USR000000001/USR000000001_Profile.png",
          dateTime: "01/12/19 12:09:09",
          duration: "22",
          caloriesBurned: "234",
          thumbsUps: "21",
          notes: "Jacked on amphetamines, grrr",
          comments: [
            { userName: "Elvis Presly", comment: "You da bomb" },
            { userName: "Snoop Dog", comment: "Mad props" },
          ],
          exercises: [
            {
              exerciseName: "Muscle Up",
              repOrHold: "rep",
              count: "8",
              difficulty: "4",
            },
            {
              exerciseName: "Dragon Flag",
              repOrHold: "rep",
              count: "12",
              difficulty: "3",
            },
            {
              exerciseName: "Front Lever - One Legged",
              repOrHold: "hold",
              count: "30",
              difficulty: "3",
            },
            {
              exerciseName: "Pull Up - High - Overhand Grip",
              repOrHold: "rep",
              count: "9",
              difficulty: "3",
            },
            {
              exerciseName: "Pull Up - Inverted L-Sit - Overhand Grip",
              repOrHold: "rep",
              count: "8",
              difficulty: "3",
            },
          ],
        },
        {
          workoutId: "WOR0000000002",
          workoutName: "My Beach Session",
          coverImage:
            "~/assets/images/workoutRecorded/WOR0000000002/WOR0000000002_PIC_03.jpg",
          images: [
            {
              src: "~/assets/images/workoutRecorded/WOR0000000002/WOR0000000002_PIC_01.jpg",
            },
            {
              src: "~/assets/images/workoutRecorded/WOR0000000002/WOR0000000002_PIC_02.jpg",
            },
            {
              src: "~/assets/images/workoutRecorded/WOR0000000002/WOR0000000002_PIC_03.jpg",
            },
            {
              src: "~/assets/images/workoutRecorded/WOR0000000002/WOR0000000002_PIC_04.jpg",
            },
          ],
          userId: "USR000000002",
          userName: "Mickey Rourke",
          userProfilePic:
            "~/assets/images/users/USR000000002/USR000000002_Profile.png",
          dateTime: "01/12/19 12:09:09",
          duration: "22",
          caloriesBurned: "234",
          thumbsUps: "21",
          notes: "Too old for this shit",
          comments: [
            { userName: "Elvis Presly", comment: "You da bomb" },
            { userName: "Snoop Dog", comment: "Mad props" },
          ],
          exercises: [
            {
              exerciseName: "Muscle Up",
              repOrHold: "rep",
              count: "8",
              difficulty: "4",
            },
            {
              exerciseName: "Dragon Flag",
              repOrHold: "rep",
              count: "12",
              difficulty: "3",
            },
            {
              exerciseName: "Front Lever - One Legged",
              repOrHold: "hold",
              count: "30",
              difficulty: "3",
            },
            {
              exerciseName: "Pull Up - High - Overhand Grip",
              repOrHold: "rep",
              count: "9",
              difficulty: "3",
            },
            {
              exerciseName: "Pull Up - Inverted L-Sit - Overhand Grip",
              repOrHold: "rep",
              count: "8",
              difficulty: "3",
            },
          ],
        },
        {
          workoutId: "WOR0000000003",
          workoutName: "My Beach Session",
          coverImage:
            "~/assets/images/workoutRecorded/WOR0000000003/WOR0000000003_PIC_04.jpg",
          images: [
            {
              src: "~/assets/images/workoutRecorded/WOR0000000003/WOR0000000003_PIC_01.jpg",
            },
            {
              src: "~/assets/images/workoutRecorded/WOR0000000003/WOR0000000003_PIC_02.jpg",
            },
            {
              src: "~/assets/images/workoutRecorded/WOR0000000003/WOR0000000003_PIC_03.jpg",
            },
            {
              src: "~/assets/images/workoutRecorded/WOR0000000003/WOR0000000003_PIC_04.jpg",
            },
          ],
          userId: "USR000000003",
          userName: "Donald Trumpy",
          userProfilePic:
            "~/assets/images/users/USR000000003/USR000000003_Profile.png",
          dateTime: "01/12/19 12:09:09",
          duration: "22",
          caloriesBurned: "234",
          thumbsUps: "21",
          notes: "Knackered, Melania been tiring me out",
          comments: [
            { userName: "Elvis Presly", comment: "You da bomb" },
            { userName: "Snoop Dog", comment: "Mad props" },
          ],
          exercises: [
            {
              exerciseName: "Muscle Up",
              repOrHold: "rep",
              count: "8",
              difficulty: "4",
            },
            {
              exerciseName: "Dragon Flag",
              repOrHold: "rep",
              count: "12",
              difficulty: "3",
            },
            {
              exerciseName: "Front Lever - One Legged",
              repOrHold: "hold",
              count: "30",
              difficulty: "3",
            },
            {
              exerciseName: "Pull Up - High - Overhand Grip",
              repOrHold: "rep",
              count: "9",
              difficulty: "3",
            },
            {
              exerciseName: "Pull Up - Inverted L-Sit - Overhand Grip",
              repOrHold: "rep",
              count: "8",
              difficulty: "3",
            },
          ],
        },
      ],
      profileText:
        "Calisthenics convert. Busy job and family but squeeze in the workouts whenever I can. Hate working out indoors. Love the beach. House or Drum and Bass when Im getting a sweat on.",
    };
  },
};
</script>
<style scoped lang="scss">
@import "../../_app-variables.scss";
TextView {
  background-color: transparent;
}

.main {
  font-size: 14;
  font-weight: bold;
  color: white;
}
.profile_text {
  font-size: 14;
  font-weight: bold;
  color: white;
}
.page {
  background-color: black;
  background-image: linear-gradient(to bottom, rgb(32, 32, 32), black);
}

.profilePic {
  border-width: 1.5;
  border-color: rgb(151, 151, 151);
  border-radius: 200;
  width: 200;
}
</style>
