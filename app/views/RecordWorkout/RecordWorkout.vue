<template>
  <Page
    @loaded="pageLoaded($event)"
    class="page"
    actionBarHidden="false"
    backgroundSpanUnderStatusBar="true"
  >
    <ActionBar
      @loaded="onActionBarLoaded($event)"
      class="actionBar"
      title="Choose Your Workout"
    >
      <ActionItem
        icon="~/assets/images/ic_menu.png"
        ios.position="left"
        @tap="onToggleDrawerTap()"
      ></ActionItem>
    </ActionBar>

    <GridLayout rows="*,auto" columns="auto">
      <GridLayout v-show="selectedTabview == 0" row="0" width="100%">
        <StackLayout>
          <GridLayout rows="*,auto">
            <StackLayout row="0">
              <SearchBar
                class="searchbar"
                hint="Search workouts..."
                [text]="searchPhrase"
                (textChange)="onTextChanged($event)"
                (clear)="onClear($event)"
                (submit)="onSubmit($event)"
                @loaded="searchBarLoaded($event)"
                textFieldHintColor="rgb(151,151,151)"
                textFieldBackgroundColor="white"
                color="black"
              ></SearchBar>

              <GridLayout rows="auto" columns="*,auto,*,auto,*">
                <Button
                  row="0"
                  col="1"
                  text="Filter"
                  class="btn-list"
                  @tap="navigateToRecWorkoutNavFrame"
                />
                <Button row="0" col="3" text="Sort" class="btn-list" />
              </GridLayout>

              <Label
                text="Scheduled"
                class="text -large -bold -primary -left"
                marginLeft="20"
                marginTop="10"
              />

              <workoutPlanSummary
                :workoutPlan="workoutPlanScheduled"
                @clicked="navigateToWorkoutPreview(workoutPlan)"
              />

              <Label
                text="Favourites"
                class="text -large -bold -default -left"
                marginLeft="20"
                marginTop="10"
              />
              <GridLayout>
                <ListView
                  ref="listview"
                  for="workoutPlan in workoutPlansMine"
                  :key="index"
                  backgroundColor="transparent"
                >
                  <v-template>
                    <workoutPlanSummary
                      :workoutPlan="workoutPlan"
                      @clicked="navigateToWorkoutPreview(workoutPlan)"
                    />
                  </v-template>
                </ListView>
              </GridLayout>
            </StackLayout>
          </GridLayout>
        </StackLayout>
      </GridLayout>

      <navBottom row="1"></navBottom>
    </GridLayout>
  </Page>
</template>
<script>
import navBottom from "../../components/navBottom";
import navControls from "../../mixins/navControls";
import workoutPlanDetail from "../Workouts/workoutPlanDetail/workoutPlanDetail";
import workoutPlanSummary from "../Workouts/workoutPlanSummary/workoutPlanSummary";

import {
  Http,
  isIOS,
  Frame,
  Color,
  ApplicationSettings,
} from "@nativescript/core";

export default {
  mixins: [navControls],
  components: { navBottom, workoutPlanSummary, workoutPlanDetail },
  computed: {},

  mounted() {
    const userId = ApplicationSettings.getNumber("userId");
    const authToken = ApplicationSettings.getString("userToken");

    Http.request({
      url: "https://api.repz.app/user/" + userId + "/workoutplans",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    }).then(
      (response) => {
        this.workoutPlansMine = response.content.toJSON();
        console.log(this.workoutPlansMine);
      },
      (e) => {}
    );
  },
  methods: {
    startWorkout() {
      navigateToRecWorkoutNavFrame;
    },

    pageLoaded(args) {
      const page = args.object;
    },

    onActionBarLoaded(args) {
      if (isIOS) {
        const navigationBar = Frame.topmost().ios.controller.navigationBar;

        const gradient = CAGradientLayer.layer();
        const bounds = navigationBar.bounds;
        gradient.frame = bounds;

        gradient.colors = [
          new Color("red").ios.CGColor,
          new Color("hsl(352.5, 100%, 25%)").ios.CGColor,
        ];
        gradient.startPoint = CGPointMake(0, 0);
        gradient.endPoint = CGPointMake(1, 0);
        const size = CGSizeMake(bounds.size.width, bounds.size.height);
        UIGraphicsBeginImageContext(size);
        gradient.renderInContext(UIGraphicsGetCurrentContext());
        const gradientImage = UIGraphicsGetImageFromCurrentImageContext();
        UIGraphicsEndImageContext();

        // doesn't work without this setTimeout
        setTimeout(() => {
          navigationBar.setBackgroundImageForBarMetrics(
            gradientImage,
            UIBarMetrics.default
          );
        });
      }
    },

    searchBarLoaded(args) {
      let sb = args.object;

      sb.ios.searchBarStyle = UISearchBarStyle.Prominent;
      sb.ios.backgroundImage = UIImage.new();
    },
  },
  data() {
    return {
      index: 0,
      lastDelY: 0,
      headerCollapsed: false,
      selectedTab: 0,
      selectedTabview: 0,
      workoutPlanScheduled: {
        workoutPlanID: 10,
        workoutPlanName: "Arm Builder",
        author: "abaser",
        authorID: 78,
        muscleZones: ["Arms", "Chest", "Back"],
        difficultyLevels: ["Foundation", "Intermediate"],
        equipment: ["Pull-up bar", "Paralettes"],
        setsPlannedTotal: 8,
        exercisesPlannedTotal: 40,
        objectivesDescription: "abandonment",
        projectedDuration: 120,
        projectedCalories: 3993,
        exercisesPlanned: null,
      },
      workoutPlansMine: [
        // {
        //   workoutPlanId: "WOP0000000001",
        //   isFavourite: "true",
        //   workoutPlanName: "Upper Body Builder",
        //   authorId: "USR000000001",
        //   authorName: "John Doe",
        //   muscles: "Arms, Chest, Back, Core",
        //   projectedDuration: "22",
        //   exerciseCount: "6",
        //   exerciseSets: "3",
        //   difficulty: "Intermediate, Hard",
        //   equipment: "Pull up bar, Parallel Bars",
        // },
        // {
        //   workoutPlanId: "WOP0000000002",
        //   isFavourite: "true",
        //   workoutPlanName: "Rock Hard Abs",
        //   authorId: "USR000000001",
        //   authorName: "John Doe",
        //   muscles: "Arms, Chest, Back, Core",
        //   projectedDuration: "50",
        //   exerciseCount: "6",
        //   exerciseSets: "3",
        //   difficulty: "Intermediate, Hard",
        //   equipment: "Pull up bar, Parallel Bars",
        // },
        // {
        //   workoutPlanId: "WOP0000000003",
        //   isFavourite: "true",
        //   workoutPlanName: "Legs, Bums, and Numbs",
        //   authorId: "USR000000001",
        //   authorName: "John Doe",
        //   muscles: "Arms, Chest, Back, Core",
        //   projectedDuration: "45",
        //   exerciseCount: "6",
        //   exerciseSets: "3",
        //   difficulty: "Intermediate, Hard",
        //   equipment: "Pull up bar, Parallel Bars",
        // },
        // {
        //   workoutPlanId: "WOP0000000004",
        //   isFavourite: "true",
        //   workoutPlanName: "Easy Day",
        //   authorId: "USR000000001",
        //   authorName: "John Doe",
        //   muscles: "Arms, Chest, Back, Core",
        //   projectedDuration: "13",
        //   exerciseCount: "6",
        //   exerciseSets: "3",
        //   difficulty: "Intermediate, Hard",
        //   equipment: "Pull up bar, Parallel Bars",
        // },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../../_app-variables";
// End custom common variables

// Custom styles
</style>
