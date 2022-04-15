import {   Http, isIOS,
  ApplicationSettings,
  Frame,
  Color,} from "@nativescript/core";

import navControls from "../../../mixins/navControls";

import workoutPlanWarmup from "../workoutPlanDetail/workoutPlanWarmup/workoutPlanWarmup";
import workoutPlanExercise from "../workoutPlanDetail/workoutPlanExercise/workoutPlanExercise";
import workoutPlanOverview from "../workoutPlanDetail/workoutPlanOverview/workoutPlanOverview";
import workoutPlanRest from "../workoutPlanDetail/workoutPlanRest/workoutPlanRest";
import workoutPlanRestSet from "../workoutPlanDetail/workoutPlanRestSet/workoutPlanRestSet";
import exerciseDetail from "../../Exercises/exerciseDetail/exerciseDetail";

export default {

  mixins: [navControls],
  components: {
    workoutPlanWarmup,
    workoutPlanExercise,
    workoutPlanOverview,
    workoutPlanRest,
    workoutPlanRestSet,
    exerciseDetail,
  },
  mounted() {
    const wpid = this.workoutPlan.workoutPlanID;
    const authToken = ApplicationSettings.getString("userToken");

    console.log(this.workoutPlanDetail)

    Http.request({
      url:
        "https://api.repz.app/workoutplan/" +
        this.workoutPlan.workoutPlanID +
        "/workoutplandetail",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    }).then(
      (response) => {
        this.workoutPlanDetail = response.content.toJSON();
        console.log(this.workoutPlanDetail)
      },

      (e) => {}
    );
  },
  methods: {
    close() {
      this.$navigateBack();
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
  },
  data() {
    return {
    
      workoutPlanDetail: [],
      
    };
  },
};

