import App from "../views/App";
import Buddies from "../views/Buddies/Buddies";
import Dashboard from "../views/Dashboard/Dashboard";
import Exercises from "../views/Exercises/Exercises";
import Login from "../views/Login/Login";
import Profile from "../views/Profile/Profile";
import RecordWorkout from "../views/RecordWorkout/RecordWorkout";
import Settings from "../views/Settings/Settings";
import Workouts from "../views/Workouts/Workouts";
import RecWorkoutNavFrame from "../views/RecordWorkout/recWorkoutNavFrame/recWorkoutNavFrame";
import WorkoutBuilder from "../views/Workouts/workoutBuilder/workoutBuilder";
import WbExerciseBrowser from "../views/Workouts/workoutBuilder/wbExerciseBrowser/wbExerciseBrowser";
import RecWorkoutPreview from "../views/RecordWorkout/recWorkoutPreview/recWorkoutPreview";
import NavControls from "../mixins/navControls";

const routes = {
  app: App,
  buddies: Buddies,
  dashboard: Dashboard,
  exercises: Exercises,
  login: Login,
  profile: Profile,
  recordWorkout: RecordWorkout,
  recWorkoutPreview: RecWorkoutPreview,
  settings: Settings,
  workouts: Workouts,
  navControls: NavControls,
  recWorkoutNavFrame: RecWorkoutNavFrame,
  workoutBuilder: WorkoutBuilder,
  wbExerciseBrowser: WbExerciseBrowser
};
export default routes;