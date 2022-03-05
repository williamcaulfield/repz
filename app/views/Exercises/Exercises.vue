<template>
  <Page
  @loaded="pageLoaded($event)"

    class="page"
    actionBarHidden="false"
    backgroundSpanUnderStatusBar="true"
    xmlns:="http://www.nativescript.org/tns.xsd"
  >
    <ActionBar  @loaded="onActionBarLoaded($event)" class="actionBar" title="Exercises">
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
          @tap="showMyList"
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
          @tap="showCategories"
          col="1"
          width="33%"
        >
          <Label
            :class="selectedTabview == 1 ? 'active' : ''"
            text="Categories"
            class="tabviewText"
          ></Label>
        </GridLayout>
        <GridLayout
          class="tabview"
          :class="selectedTabview == 2 ? 'active' : ''"
          @tap="showBrowse"
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

      <GridLayout v-show="selectedTabview == 0" row="1" width="100%">
        <StackLayout verticalAlignment="top">
          <GridLayout rows="*,auto">
            <StackLayout row="0">
              <SearchBar
                class="searchbar"
                hint="Search exercises..."
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
                  ref="listview"
                  for="exercise in exerciseFavourites"
                  :key="index"
                  backgroundColor="transparent"
                >
                  <v-template>
                    <exerciseSummary
                      :exercise="exercise"
                      @clicked="showExercise(exercise)"
                    />
                  </v-template>
                </ListView>
              </GridLayout>
            </StackLayout>
          </GridLayout>
        </StackLayout>
      </GridLayout>

      <GridLayout v-show="selectedTabview == 1" row="1" width="100%">
        <ScrollView>
          <GridLayout rows="*,*,*" columns="*,*" width="94%">
            <exerciseCategory
              row="0"
              col="0"
              :exerciseCategory="exerciseCategories[0]"
              margin="5"
              v-on:categoryClick="showBrowse"
            />
            <exerciseCategory
              row="0"
              col="1"
              :exerciseCategory="exerciseCategories[1]"
              margin="5"
              v-on:categoryClick="showBrowse"
            />
            <exerciseCategory
              row="1"
              col="0"
              :exerciseCategory="exerciseCategories[2]"
              margin="5"
              v-on:categoryClick="showBrowse"
            />
            <exerciseCategory
              row="1"
              col="1"
              :exerciseCategory="exerciseCategories[3]"
              margin="5"
              v-on:categoryClick="showBrowse"
            />
            <exerciseCategory
              row="2"
              col="0"
              :exerciseCategory="exerciseCategories[4]"
              margin="5"
              v-on:categoryClick="showBrowse"
            />
            <exerciseCategory
              row="2"
              col="1"
              :exerciseCategory="exerciseCategories[5]"
              margin="5"
              v-on:categoryClick="showBrowse"
            />
          </GridLayout>
        </ScrollView>
      </GridLayout>

      <GridLayout v-show="selectedTabview == 2" row="1" width="100%">
        <StackLayout verticalAlignment="top">
          <GridLayout rows="*,auto">
            <StackLayout row="0">
              <SearchBar
                class="searchbar"
                hint="Search exercises..."
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
                  ref="listview"
                  for="exercise in exercises"
                  :key="index"
                  backgroundColor="transparent"
                >
                  <v-template>
                    <exerciseSummary
                      :exercise="exercise"
                      @clicked="showExercise(exercise)"
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
import exerciseSummary from "./exerciseSummary/exerciseSummary";
import exerciseCategory from "./exerciseCategory/exerciseCategory";
import exerciseDetail from "./exerciseDetail/exerciseDetail";
import navControls from "../../mixins/navControls";

import {
  Http,
  isIOS,
  Frame,
  Color,
  ApplicationSettings,
} from "@nativescript/core";

export default {
  mixins: [navControls],
  components: { navBottom, exerciseCategory, exerciseSummary, exerciseDetail },
  computed: {},

  mounted() {
    const userId = ApplicationSettings.getNumber("userId");
    const authToken = ApplicationSettings.getString("userToken");

    Http.request({
      url: "https://api.repz.app/user/" + userId + "/exercises",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    }).then(
      (response) => {
        this.exerciseFavourites = response.content.toJSON();
        console.log(this.exerciseFavourites);
      },
      (e) => {}
    );

    // Http.request({
    //   url: "https://api.repz.app/user//exercises",
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + authToken,
    //   },
    // }).then(
    //   (response) => {
    //     this.exercises = response.content.toJSON();
    //     console.log(this.exercises);
    //   },
    //   (e) => {}
    // );
  },
  methods: {
    showExercise(payload) {
      this.$navigateTo(exerciseDetail, {
        props: {
          exercise: payload,
        },
        animated: true,
        transition: {
          name: "slideLeft",
          duration: 300,
          curve: "easeIn",
        },
      });
    },

    showExerciseCategory(payload) {},

    searchBarLoaded(args) {
      let sb = args.object;

      sb.ios.searchBarStyle = UISearchBarStyle.Prominent;
      sb.ios.backgroundImage = UIImage.new();
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
    showMyList() {
      this.selectedTabview = 0;
    },

    showCategories() {
      this.selectedTabview = 1;
    },
    showBrowse() {
      const authToken = ApplicationSettings.getString("userToken");
      Http.request({
        url: "https://api.repz.app/exercises",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
      }).then(
        (response) => {
          this.exercises = response.content.toJSON();
          console.log(this.exercises);
        },
        (e) => {}
      );

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
      exercisesTest: [],
      exerciseCategories: [
        {
          categoryName: "Holds",
          categoryImage:
            "https://repz-resources.ams3.digitaloceanspaces.com/exercises/categories/exercise_category_back@3x.png",
        },
        {
          categoryName: "Arms and Chest",
          categoryImage:
            "https://repz-resources.ams3.digitaloceanspaces.com/exercises/categories/exercise_category_armschest@3x.png",
        },
        {
          categoryName: "Core",
          categoryImage:
            "https://repz-resources.ams3.digitaloceanspaces.com/exercises/categories/exercise_category_core@3x.png",
        },
        {
          categoryName: "Legs",
          categoryImage:
            "https://repz-resources.ams3.digitaloceanspaces.com/exercises/categories/exercise_category_hold@3x.png",
        },
        {
          categoryName: "Back",
          categoryImage:
            "https://repz-resources.ams3.digitaloceanspaces.com/exercises/categories/exercise_category_back@3x.png",
        },
        {
          categoryName: "Skills",
          categoryImage:
            "https://repz-resources.ams3.digitaloceanspaces.com/exercises/categories/exercise_category_skills@3x.png",
        },
      ],
      exerciseFavourites: [],
      exercises: [],
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
