import routes from "../routes";

// import {
//   topmost
// } from "ui/frame";

import { Frame } from "@nativescript/core";

export function navigatingTo() {
  if (Frame.topmost().ios) {
    var navigationBar = Frame.topmost().ios.controller.navigationBar;
    navigationBar.translucent = false;
  }
}
export default {
  data() {
    return {
      gesturesEnabled: true
    };
  },
  computed: {
    drawerElement() {
      return (this.$refs && this.$refs.drawer) || null;
    },

    drawer: {
      get() {
        return this.$store.getters.sideDrawer;
      },
      set(v) {
        return this.$store.commit("setSideDrawer", v);
      }
    }
  },
  watch: {
    drawer(v) {
      if (this.drawerElement) {
        return v ?
          this.drawerElement.nativeView.showDrawer() :
          this.drawerElement.nativeView.closeDrawer();
      }
    }
  },
  methods: {
    showDrawer() {
      this.drawer = true;
    },
    closeDrawer() {
      this.drawer = false;
    },
    onNavigationButtonTap() {
      this.drawer = false;
    },
    onOpenDrawerTap() {
      this.drawer = true;
    },
    onCloseDrawerTap() {
      this.drawer = false;
    },
    onToggleDrawerTap() {
      this.drawer = !this.drawer;
    },
    onDrawerClosed() {
      this.drawer = false;
    },
    navigateToBuddies() {
      this.$navigateTo(routes.buddies, {
        frame: "mainContent",
        clearHistory: true
      });
      this.drawer = false;
    },
    navigateToDashboard() {
      this.$navigateTo(routes.dashboard, {
        frame: "mainContent",
        clearHistory: true
      });
      this.drawer = false;
    },
    navigateToExercises() {
      this.$navigateTo(routes.exercises, {
        frame: "mainContent",
        clearHistory: true
      });
      this.drawer = false;
    },
    navigateToLogin() {
      this.$navigateTo(routes.login, {
        frame: "mainContent",
        clearHistory: true
      });
      this.drawer = false;
    },
    navigateToProfile() {
      this.$navigateTo(routes.profile, {
        frame: "mainContent",
        clearHistory: false
      });
      this.drawer = false;
    },
    navigateToRecordWorkout() {
      this.$navigateTo(routes.recordWorkout, {
        frame: "mainContent",
        clearHistory: true
      });
      this.drawer = false;
    },
    navigateToRecWorkoutNavFrame(payload) {
      this.$navigateTo(routes.recWorkoutNavFrame, {
         props: {
          workoutPlan: payload,
        },
        frame: "mainContent",
        clearHistory: true
      });
      this.drawer = false;
    },

    navigateToWorkoutPreview(payload) {
      this.$navigateTo(routes.recWorkoutPreview, {
         props: {
          workoutPlan: payload,
        },
        frame: "mainContent",
        clearHistory: false
      });
      this.drawer = false;
    },
    navigateToWorkoutBuilder() {
      this.$navigateTo(routes.workoutBuilder, {
        frame: "mainContent",
        clearHistory: true
      });
      this.drawer = false;
    },
    navigateToSettings() {
      this.$navigateTo(routes.settings, {
        frame: "mainContent",
        clearHistory: true
      });
      this.drawer = false;
    },
    navigateToWorkouts() {
      this.$navigateTo(routes.workouts, {
        frame: "mainContent",
        clearHistory: true
      });
      this.drawer = false;
    },
    navigateToExerciseBrowser() {
      this.$navigateTo(routes.wbExerciseBrowser, {
        frame: "mainContent",
        clearHistory: false
      });
      this.drawer = false;
    }
  }
};