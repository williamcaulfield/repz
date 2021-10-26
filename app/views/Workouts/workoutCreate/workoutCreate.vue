<template>
  <StackLayout class="main">
    <ContentView
      class="wc-add__container_primary"
      id="createWorkout"
      @tap="onClickButton()"
      @touch="onTouch($event)"
    >
      <GridLayout rows="auto,*" columns="auto,*,auto">
        <Image
          col="1"
          row="0"
          class="icon-add-grey"
          src="~/assets/images/icons/icon_add_white.png"
          verticalAlignment="center"
          marginTop="10"
        />
        <Label
          col="1"
          row="1"
          class="text -large -bold -default"
          text="Create a Workout"
          marginTop="0"
        />
      </GridLayout>
    </ContentView>
  </StackLayout>
</template>

<script>
export default {
  methods: {
    onTouch(args) {
      const contentView = args.object;
      switch (args.action) {
        case "up":
          contentView.deletePseudoClass("pressed");
          break;
        case "down":
          contentView.addPseudoClass("pressed");
          break;
      }
    },
    onClickButton() {
      this.$emit("clicked");
    },
  },
};
</script>
<style scoped lang="scss">
// Start custom common variables
@import "../../../_app-variables";
// End custom common variables

// Custom styles

.wc-add__container_primary {
  width: 90%;
  border-radius: 10;
  // border-color: white;
  // border-width: $border-width;
  margin-top: 15;
  margin-bottom: 15;
  height: 80;
  background-color: $background-gradient-dark;

  background-image: linear-gradient(
    to bottom,
    $gradient-active-light,
    rgb(111, 1, 1)
  );

  //   background-image: linear-gradient(
  //   to bottom,
  //   $container-gradient-light,
  //   $container-gradient-dark
  // ;
}
.wc-add__container_primary:pressed {
  background-color: $background-gradient-light;

  background-image: linear-gradient(
    to bottom,
    $gradient-active-dark,
    $container-gradient-dark
  );
}

.wo-add__container {
  width: 90%;
  margin: auto;
  border-radius: 10;

  border-width: $border-width;
  margin-top: 15;
  margin-bottom: 10;
  height: 80;
  background-image: linear-gradient(
    to bottom,
    $btn-primary-gradient-light,
    $btn-primary-gradient-dark
  );
}
.icon-add-grey {
  height: 35;
  margin-bottom: -10;
}
</style>
