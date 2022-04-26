import workoutRecordSummary from "./workoutRecordSummary/workoutRecordSummary";
import workoutRecordDetail from "./workoutRecordDetail/workoutRecordDetail";
import navBottom from "../../components/navBottom";
import navControls from "../../mixins/navControls";


import {
  Http,
  isIOS,
  ApplicationSettings,
  Frame,
  Color,
  Utils
} from "@nativescript/core";

export default {
  mixins: [navControls],
  components: {
    workoutRecordSummary,
    workoutRecordDetail,
    navBottom,
  },
  computed: {},

  async mounted() {
    this.getWorkoutSummariesFollowing();
    this.getWorkoutSummaries();


    setTimeout(() => {
      if (this.workoutRecordSummaries.length < 1) {
        this.getWorkoutSummariesFollowing();
        this.getWorkoutSummaries();
        this.dataReady = true;
      }
    }, 220);

    if (this.workoutRecordSummaries.length < 1) {
      this.dataReady = true;
    }

    // this.dataReady = true;

  },
  data() {
    return {
      dataReady: false,
      index: 0,
      lastDelY: 0,
      headerCollapsed: false,
      selectedTab: 0,
      selectedTabview: 0,
      workoutRecordSummariesFollowing: [],

      workoutRecordSummaries: [],

      workoutHistoryFollowing: [],
    };
  },
  methods: {

    async getWorkoutSummaries() {

      const userId = ApplicationSettings.getNumber("userId");
      const authToken = ApplicationSettings.getString("userToken")

      await Http.request({
        url: "https://api.repz.app/user/" +
          userId +
          "/workoutrecorded/workoutrecords",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
      }).then(
        (response) => {
          this.workoutRecordSummaries = response.content.toJSON();
        },
        (e) => {}
      );
    },

    async getWorkoutSummariesFollowing() {

      const userId = ApplicationSettings.getNumber("userId");
      const authToken = ApplicationSettings.getString("userToken")

      await Http.request({
        url: "https://api.repz.app/user/" +
          userId +
          "/workoutrecorded/workoutrecordsfollowing",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
      }).then(
        (response) => {
          this.workoutRecordSummariesFollowing = response.content.toJSON();
          console.log(this.workoutRecordSummariesFollowing);
        },
        (e) => {}
      );

    },

    async showWorkout(payload) {
      console.log(payload.workoutRecordedID);

      const userId = ApplicationSettings.getNumber("userId");
      const authToken = ApplicationSettings.getString("userToken");

      var tempWorkoutRecorded;

      await Http.request({
        url: "https://api.repz.app/user/" +
          userId +
          "/workoutrecorded/" +
          payload.workoutRecordedID +
          "/workoutrecordeddetail",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
      }).then(
        (response) => {
          tempWorkoutRecorded = response.content.toJSON();
          console.log(tempWorkoutRecorded);
        },
        (e) => {}
      );

      this.$navigateTo(workoutRecordDetail, {
        props: {
          workoutRecorded: tempWorkoutRecorded,
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
      console.log("onNavigatedTo");
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
    onNavigatingTo(args) {
      console.log("onNavigatedTo");
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

    onActionBarLoaded(args) {
      // if (isIOS) {
      //   const navigationBar = Frame.topmost().ios.controller.navigationBar;
      //   const gradient = CAGradientLayer.layer();
      //   const bounds = navigationBar.bounds;
      //   gradient.frame = bounds;
      //   gradient.colors = [
      //     new Color("red").ios.CGColor,
      //     new Color("hsl(352.5, 100%, 25%)").ios.CGColor
      //   ];
      //   gradient.startPoint = CGPointMake(0, 0);
      //   gradient.endPoint = CGPointMake(1, 0);
      //   const size = CGSizeMake(bounds.size.width, bounds.size.height);
      //   UIGraphicsBeginImageContext(size);
      //   gradient.renderInContext(UIGraphicsGetCurrentContext());
      //   const gradientImage = UIGraphicsGetImageFromCurrentImageContext();
      //   UIGraphicsEndImageContext();
      //   // doesn't work without this setTimeout
      //   setTimeout(() => {
      //     navigationBar.setBackgroundImageForBarMetrics(
      //       gradientImage,
      //       UIBarMetrics.default
      //     );
      //   });
      // }
    },

    showFollowing() {
      this.selectedTabview = 0;
    },
    showYou() {
      this.selectedTabview = 1;
    },
    home() {
      this.selectedTab = 0;
    },
  },

  computed: {
    getWorkoutRecordSummariesFollowing: {

      get: function () {
        return this.workoutRecordSummariesFollowing;
      },

    },
    getWorkoutRecordSummaries: {

      get: function () {
        return this.workoutRecordSummaries;
      },

    },

  }
};
