<template>
  <!-- <Page
  @loaded="pageLoaded($event)"

    class="page"
    actionBarHidden="false"
    backgroundSpanUnderStatusBar="true"
    xmlns:="http://www.nativescript.org/tns.xsd"
  >
    <ActionBar  @loaded="onActionBarLoaded($event)" class="actionBar" title="Exercise Browser">
    </ActionBar> -->

  <GridLayout
    class="exercisebrowser__background"
    rows="auto,*,auto"
    columns="auto"
    backgroundColor="black"
  >
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
                  <wbExerciseSummary
                    :exercise="exercise"
                    v-on:clicked="showExercise(exercise)"
                    v-on:selected="
                      addExerciseSelectionFavourite($event, $index)
                    "
                    v-on:deselected="
                      removeExerciseSelectionFavourite($event, $index)
                    "
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
                  <wbExerciseSummary
                    :exercise="exercise"
                    @clicked="showExercise(exercise)"
                    v-on:selected="addExerciseSelection($event, $index)"
                    v-on:deselected="removeExerciseSelection($event, $index)"
                  />
                </v-template>
              </ListView>
            </GridLayout>
          </StackLayout>
        </GridLayout>
      </StackLayout>
    </GridLayout>
    <navBottom row="2" col="0" v-on:add="addExercisesToWorkout" />
  </GridLayout>
  <!-- </Page> -->
</template>
<script>
import navBottom from "../../../../components/navBottom";
import wbExerciseSummary from "./wbExerciseSummary/wbExerciseSummary";
import exerciseCategory from "../../../Exercises/exerciseCategory/exerciseCategory";
import exerciseDetail from "../../../Exercises/exerciseDetail/exerciseDetail";
import navControls from "../../../../mixins/navControls";

import {
  Http,
  Application,
  Frame,
  Color,
  isIOS,
  ApplicationSettings,
} from "@nativescript/core";

export default {
  mixins: [navControls],
  components: {
    navBottom,
    exerciseCategory,
    wbExerciseSummary,
    exerciseDetail,
  },
  computed: {},

  mounted() {
    if (isIOS) {
      if (Application.hasLaunched) {
        Application.ios.window.backgroundColor = new Color("black").ios;
      } else {
        Application.on(
          "launch",
          (_) =>
            (Application.ios.window.backgroundColor = new Color("black").ios)
        );
      }
    }

    const userId = ApplicationSettings.getNumber("userId");
    const authToken = ApplicationSettings.getString("userToken");
    this.newExercisesToAdd = [];

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
  },
  methods: {
    async getSelectedExerciseData(exerciseId) {
      try {
        let result = await Http.getJSON(
          "https://api.repz.app/exercise/" +
            exerciseId +
            "/createExercisePlanned"
        );
        return result;
      } catch (e) {
        // just in case if an error thrown for whatever reason, can be handled / logged here
        console.log(error);
      }

      // would return `0` if there was an error
      return 0;
    },

    pageLeave() {
      console.log(this.newExercisesToAdd);
      //this.$navigateBack();
      this.$emit("closeExerciseBrowser", this.newExercisesToAdd);
      this.$modal.close(this.newExercisesToAdd);
    },

    async addExercisesToWorkout() {
      for (var i = 0; i < this.selectedItemsFavourites.length; i++) {
        var exerciseId =
          this.exerciseFavourites[this.selectedItemsFavourites[i]].exerciseID;

        await this.newExercisesToAdd.push(
          await this.getSelectedExerciseData(exerciseId)
        );
      }

      for (var i = 0; i < this.selectedItems.length; i++) {
        var exerciseId = this.exercises[this.selectedItems[i]].exerciseID;

        await this.newExercisesToAdd.push(
          await this.getSelectedExerciseData(exerciseId)
        );
      }

      this.pageLeave();
    },

    addExerciseSelection(event, index) {
      console.log("Item selected: " + index);
      this.selectedItems.push(index);
      console.log("Selected Items: " + this.exercises);
    },
    removeExerciseSelection(event, index) {
      console.log("Item deselected: " + index);
      let position = this.selectedItems.indexOf(index);
      this.selectedItems.splice(position, 1);
      console.log("Selected Items: " + this.exercises);
    },
    addExerciseSelectionFavourite(event, index) {
      console.log("Item selected: " + index);
      this.selectedItemsFavourites.push(index);
      console.log("Selected Items: " + this.exerciseFavourites);
    },
    removeExerciseSelectionFavourite(event, index) {
      console.log("Item deselected: " + index);
      let position = this.selectedItemsFavourites.indexOf(index);
      this.selectedItemsFavourites.splice(position, 1);
      console.log("Selected Items: " + this.selectedItemsFavourites);
    },
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
            UIBarMetrics.de
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
      newExercisesToAdd: [],
      selectedItemsFavourites: [],
      selectedItems: [],
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
      exerciseFavourites: [
        // {
        //   workoutPlanId: "WOP0000000001",
        //   isFavourite: "true",
        //   exerciseName: "Front planche",
        //   type: "Hold",
        //   image: "~/assets/images/exercises/thmb_ex00001_01.png",
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
        //   exerciseName: "Muscle Up",
        //   type: "Reps",
        //   image: "~/assets/images/exercises/thmb_ex00002_01.png",
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
        //   workoutPlanId: "WOP0000000003",
        //   isFavourite: "true",
        //   exerciseName: "Pushups - Planche",
        //   type: "Reps",
        //   image: "~/assets/images/exercises/thmb_ex00003_01.png",
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
        //   workoutPlanId: "WOP0000000003",
        //   isFavourite: "true",
        //   exerciseName: "Lunges",
        //   type: "Reps",
        //   image: "~/assets/images/exercises/thmb_ex00004_01.png",
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
        //   workoutPlanId: "WOP0000000001",
        //   isFavourite: "true",
        //   exerciseName: "Front planche",
        //   type: "Hold",
        //   image: "~/assets/images/exercises/thmb_ex00001_01.png",
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
        //   exerciseName: "Muscle Up",
        //   type: "Reps",
        //   image: "~/assets/images/exercises/thmb_ex00002_01.png",
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
        //   workoutPlanId: "WOP0000000003",
        //   isFavourite: "true",
        //   exerciseName: "Pushups - Planche",
        //   type: "Reps",
        //   image: "~/assets/images/exercises/thmb_ex00003_01.png",
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
        //   workoutPlanId: "WOP0000000003",
        //   isFavourite: "true",
        //   exerciseName: "Lunges",
        //   type: "Reps",
        //   image: "~/assets/images/exercises/thmb_ex00004_01.png",
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
        //   workoutPlanId: "WOP0000000001",
        //   isFavourite: "true",
        //   exerciseName: "Front planche",
        //   type: "Hold",
        //   image: "~/assets/images/exercises/thmb_ex00001_01.png",
        //   authorId: "USR000000001",
        //   authorName: "John Doe",
        //   muscles: "Arms, Chest, Back, Core",
        //   projectedDuration: "22",
        //   exerciseCount: "6",
        //   exerciseSets: "3",
        //   difficulty: "Intermediate, Hard",
        //   equipment: "Pull up bar, Parallel Bars",
        // },
      ],
      exercises: [],
    };
  },
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../../../../_app-variables";
// End custom common variables

// Custom styles

.searchbar {
  margin-top: 10;
}
.exercisebrowser__background {
  background-image: linear-gradient(
    to bottom,
    $background-gradient-light,
    $background-gradient-dark
  );
}
</style>
