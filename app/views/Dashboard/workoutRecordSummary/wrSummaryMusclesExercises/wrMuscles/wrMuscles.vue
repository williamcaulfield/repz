<template>
  <StackLayout class="main">
    <GridLayout rows="auto" columns="*,*" class="wrMuscles__grid">
      <Image
        col="0"
        row="0"
        class="image-muscleGroups"
        src="https://repz-resources.ams3.digitaloceanspaces.com/muscleMap/male_front_base@3x.png"
      />
      <Image
        col="0"
        row="0"
        class="image-muscleGroups"
        :tintColor="this.front_chest_tint"
        src="https://repz-resources.ams3.digitaloceanspaces.com/muscleMap/male_front_chest@3x.png"
      />
      <Image
        col="0"
        row="0"
        class="image-muscleGroups"
        :tintColor="this.front_core_tint"
        src="https://repz-resources.ams3.digitaloceanspaces.com/muscleMap/male_front_core@3x.png"
      />
      <Image
        col="0"
        row="0"
        class="image-muscleGroups"
        :tintColor="this.front_arms_tint"
        src="https://repz-resources.ams3.digitaloceanspaces.com/muscleMap/male_front_arms@3x.png"
      />
      <Image
        col="0"
        row="0"
        class="image-muscleGroups"
        :tintColor="this.front_shoulders_tint"
        src="https://repz-resources.ams3.digitaloceanspaces.com/muscleMap/male_front_shoulders@3x.png"
      />
      <Image
        col="0"
        row="0"
        class="image-muscleGroups"
        :tintColor="this.front_legs_tint"
        src="https://repz-resources.ams3.digitaloceanspaces.com/muscleMap/male_front_legs@3x.png"
      />
      <Image
        col="1"
        row="0"
        class="image-muscleGroups"
        src="https://repz-resources.ams3.digitaloceanspaces.com/muscleMap/male_back_base@3x.png"
      />

      <Image
        col="1"
        row="0"
        class="image-muscleGroups"
        :tintColor="this.back_upper_back_tint"
        src="https://repz-resources.ams3.digitaloceanspaces.com/muscleMap/male_back_upper_back@3x.png"
      />
      <Image
        col="1"
        row="0"
        class="image-muscleGroups"
        :tintColor="this.back_lower_back_tint"
        src="https://repz-resources.ams3.digitaloceanspaces.com/muscleMap/male_back_lower_back@3x.png"
      />
      <Image
        col="1"
        row="0"
        class="image-muscleGroups"
        :tintColor="this.back_glutes_tint"
        src="https://repz-resources.ams3.digitaloceanspaces.com/muscleMap/male_back_glutes@3x.png"
      />
      <Image
        col="1"
        row="0"
        class="image-muscleGroups"
        :tintColor="this.back_arms_tint"
        src="https://repz-resources.ams3.digitaloceanspaces.com/muscleMap/male_back_arms@3x.png"
      />
      <Image
        col="1"
        row="0"
        class="image-muscleGroups"
        :tintColor="this.back_shoulders_tint"
        src="https://repz-resources.ams3.digitaloceanspaces.com/muscleMap/male_back_shoulders@3x.png"
      />
      <Image
        col="1"
        row="0"
        class="image-muscleGroups"
        :tintColor="this.back_legs_tint"
        src="https://repz-resources.ams3.digitaloceanspaces.com/muscleMap/male_back_legs@3x.png"
      />
    </GridLayout>
  </StackLayout>
</template>

<script>
export default {
  props: ["breakdownMuscleZones"],
  mounted() {
    console.log(this.breakdownMuscleZones);
    this.breakdownMuscleZones.forEach((element) => {
      var multiplier = 2.0;

      if (element.category == "Arms") {
        this.front_arms = (element.categoryPercent * multiplier) / 100;
        this.back_arms = (element.categoryPercent * multiplier) / 100;
        if (this.front_arms > 1.0) {
          this.front_arms = 1.0;
          this.back_arms = 1.0;
        }
      }
      if (element.category == "Legs") {
        this.front_legs = (element.categoryPercent * multiplier) / 100;
        this.back_legs = (element.categoryPercent * multiplier) / 100;
        if (this.front_legs > 1.0) {
          this.front_legs = 1.0;
          this.back_legs = 1.0;
        }
      }
      if (element.category == "Chest") {
        this.front_chest = (element.categoryPercent * multiplier) / 100;
        if (this.front_chest > 1.0) {
          this.front_chest = 1.0;
        }
      }
      if (element.category == "Glutes") {
        this.back_glutes = (element.categoryPercent * multiplier) / 100;
        if (this.back_glutes > 1.0) {
          this.back_glutes = 1.0;
        }
      }
      if (element.category == "Back") {
        this.back_lower_back = (element.categoryPercent * multiplier) / 100;
        this.back_upper_back = (element.categoryPercent * multiplier) / 100;
        if (this.back_lower_back > 1.0) {
          this.back_lower_back = 1.0;
          this.back_upper_back = 1.0;
        }
      }
      if ((element.category = "Shoulders")) {
        this.front_shoulders = (element.categoryPercent * multiplier) / 100;
        this.back_shoulders = (element.categoryPercent * multiplier) / 100;
        if (this.front_shoulders > 1.0) {
          this.front_shoulders = 1.0;
          this.back_shoulders = 1.0;
        }
      }
      if (element.category == "Core") {
        this.front_core = (element.categoryPercent * multiplier) / 100;
        this.back_core = (element.categoryPercent * multiplier) / 100;
        if (this.front_core > 1.0) {
          this.front_core = 1.0;
          this.back_core = 1.0;
        }
      }
    });
    var tintColour;

    tintColour = "rgba(255, 0, 0, "; //red

    this.front_legs_tint = tintColour + this.front_legs + ")";
    this.front_core_tint = tintColour + this.front_core + ")";
    this.front_arms_tint = tintColour + this.front_arms + ")";
    this.front_chest_tint = tintColour + this.front_chest + ")";
    this.front_shoulders_tint = tintColour + this.front_shoulders + ")";
    this.back_legs_tint = tintColour + this.back_legs + ")";
    this.back_glutes_tint = tintColour + this.back_glutes + ")";
    this.back_lower_back_tint = tintColour + this.back_lower_back + ")";
    this.back_upper_back_tint = tintColour + this.back_upper_back + ")";
    this.back_arms_tint = tintColour + this.back_arms + ")";
    this.back_shoulders_tint = tintColour + this.back_shoulders + ")";

    console.log(this.front_arms);
    console.log(this.back_arms);
    console.log(this.front_arms_tint);
    console.log(this.back_arms_tint);
  },
  data() {
    return {
      front_legs: 0.0,
      front_core: 0.0,
      front_arms: 0.0,
      front_chest: 0.0,
      front_shoulders: 0.0,
      back_legs: 0.0,
      back_glutes: 0.0,
      back_lower_back: 0.0,
      back_upper_back: 0.0,
      back_arms: 0.0,
      back_shoulders: 0.0,

      front_legs_tint: "",
      front_core_tint: "",
      front_arms_tint: "",
      front_chest_tint: "",
      front_shoulders_tint: "",
      back_legs_tint: "",
      back_glutes_tint: "",
      back_lower_back_tint: "",
      back_upper_back_tint: "",
      back_arms_tint: "",
      back_shoulders_tint: "",
    };
  },
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../../../../../_app-variables";
// End custom common variables

// Custom styles

.image-muscleGroups {
  height: 210;
}
</style>
