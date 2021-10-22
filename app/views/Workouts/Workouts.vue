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
      title="Workouts"
    >
      <ActionItem
        icon="~/assets/images/ic_menu.png"
        ios.position="left"
        @tap="onToggleDrawerTap()"
      ></ActionItem>
    </ActionBar>

    <GridLayout rows="auto,*,auto" columns="auto">
      <GridLayout
        ref="navTab"
        class="navTab"
        width="100%"
        rows="auto"
        columns="auto,auto,auto"
        row="0"
      >
        <GridLayout
          class="tabview"
          :class="selectedTabview == 0 ? 'active' : ''"
          @tap="showMyWorkoutPlans"
          col="0"
          width="33%"
        >
          <Label
            :class="selectedTabview == 0 ? 'active' : ''"
            text="My List"
            class="tabviewText"
          ></Label>
        </GridLayout>

        <GridLayout
          class="tabview"
          :class="selectedTabview == 1 ? 'active' : ''"
          @tap="showWeekPlan"
          cols="auto"
          col="1"
          width="33%"
        >
          <Label
            :class="selectedTabview == 1 ? 'active' : ''"
            text="Workout Planner"
            class="tabviewText"
          ></Label>
        </GridLayout>

        <GridLayout
          class="tabview"
          :class="selectedTabview == 2 ? 'active' : ''"
          @tap="showAllWorkoutPlans"
          cols="auto"
          col="2"
          width="33%"
        >
          <Label
            :class="selectedTabview == 2 ? 'active' : ''"
            text="Browse"
            class="tabviewText"
          ></Label>
        </GridLayout>
      </GridLayout>

      <GridLayout
        v-show="selectedTabview == 0"
        row="1"
        rows="*,auto,auto"
        colums="auto"
        width="100%"
      >
        <RadListView
          ref="listview"
          for="workoutPlan in workoutPlanFavourites"
          :key="index"
          backgroundColor="transparent"
          row="0"
        >
          <v-template name="header">
            <workoutCreate @clicked="navigateToWorkoutBuilder()" />
          </v-template>
          <v-template>
            <workoutPlanSummary
              :workoutPlan="workoutPlan"
              @clicked="showWorkoutPlan(workoutPlan)"
            />
          </v-template>
        </RadListView>
      </GridLayout>

      <GridLayout
        v-show="selectedTabview == 1"
        row="1"
        rows="*,auto,auto"
        colums="*"
        width="100%"
      >
        <ScrollView marginTop="10"> </ScrollView>
      </GridLayout>
      <GridLayout v-show="selectedTabview == 1" row="1" width="100%">
        <StackLayout verticalAlignment="top">
          <GridLayout rows="*,auto">
            <RadCalendar row="0"></RadCalendar> </GridLayout></StackLayout
      ></GridLayout>

      <GridLayout v-show="selectedTabview == 2" row="1" width="100%">
        <StackLayout verticalAlignment="top">
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
                <Button row="0" col="1" text="Filter" class="btn-list" />
                <Button row="0" col="3" text="Sort" class="btn-list" />
              </GridLayout>

              <GridLayout>
                <ListView
                  ref="listview2"
                  for="workoutPlan in workoutPlansAll"
                  :key="index"
                  backgroundColor="transparent"
                >
                  <v-template>
                    <workoutPlanSummary
                      :workoutPlan="workoutPlan"
                      @clicked="showWorkoutPlan(workoutPlan)"
                    />
                  </v-template>
                </ListView>
              </GridLayout>
            </StackLayout>
          </GridLayout>
        </StackLayout>
      </GridLayout>
      <navBottom row="2"></navBottom>
    </GridLayout>
  </Page>
</template>
<script>
import navBottom from "../../components/navBottom";
import workoutPlanSummary from "./workoutPlanSummary/workoutPlanSummary";
import workoutPlanDetail from "./workoutPlanDetail/workoutPlanDetail";
import workoutAdd from "./workoutAdd/workoutAdd";
import workoutCreate from "./workoutCreate/workoutCreate";
import navControls from "../../mixins/navControls";
import CalendarView from "nativescript-ui-calendar/vue";

import {
  Http,
  Frame,
  Color,
  ApplicationSettings,
  isIOS,
} from "@nativescript/core";

export default {
  mixins: [navControls],
  components: {
    navBottom,
    workoutPlanSummary,
    workoutPlanDetail,
    workoutAdd,
    workoutCreate,
  },
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
        this.workoutPlanFavourites = response.content.toJSON();
        console.log(this.workoutPlanFavourites);
      },
      (e) => {}
    );

    Http.request({
      url: "https://api.repz.app/workoutplans",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    }).then(
      (response) => {
        this.workoutPlansAll = response.content.toJSON();
        //console.log(this.workoutPlansAll);
      },
      (e) => {}
    );
  },
  methods: {
    showWorkoutPlan(payload) {
      //clearTimeout(navigationBar.setBackgroundImageForBarMetrics)
      this.$navigateTo(workoutPlanDetail, {
        props: {
          workoutPlan: payload,
        },
        animated: true,
        transition: {
          name: "slideLeft",
          duration: 300,
          curve: "easeIn",
        },
      });
    },
    pageLoaded(args) {
      const page = args.object;
    },

    onActionBarLoaded(args) {
      this.addGradient();
    },

    addGradient() {
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
            UIBarMetrics.de
          );
        });
      }
    },

    searchBarLoaded(args) {
      let sb = args.object;

      sb.ios.searchBarStyle = UISearchBarStyle.Prominent;
      sb.ios.backgroundImage = UIImage.new();
    },
    showMyWorkoutPlans() {
      this.selectedTabview = 0;
    },
    showWeekPlan() {
      this.selectedTabview = 1;
    },
    showAllWorkoutPlans() {
      this.selectedTabview = 2;
    },
    addWorkouts() {
      this.selectedTabview = 2;
    },

    home() {
      this.selectedTab = 0;
    },
  },
  data() {
    return {
      index: 0,
      lastDelY: 0,
      headerCollapsed: false,
      selectedTab: 0,
      selectedTabview: 0,
      workoutPlanFavourites: [],
      workoutPlansAll: [],
    };
  },
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../../_app-variables";
// End custom common variables

// Custom styles

.searchbar {
  margin-top: 10;
}
</style>
