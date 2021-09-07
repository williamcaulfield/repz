<template>
  <StackLayout class="main">
    <Gridlayout rows="auto" columns="auto,*,auto">
      <ContentView
        class="wo-add__container"
        id="myView"
        @tap="clickAddRest()"
        @touch="onTouch($event)"
        col="0"
        row="0"
      >
        <GridLayout rows="auto,*" columns="auto,*,auto">
          <Image
            col="1"
            row="0"
            class="icon-add"
            src="~/assets/images/icons/icon_add_white.png"
            verticalAlignment="center"
            marginTop="7"
            marginLeft="30"
            marginRight="30"
          />
          <Label
            col="1"
            row="1"
            class="text -large -default"
            text="Rest"
            align="center"
            marginTop="10"
          />
        </GridLayout>
      </ContentView>
      <ContentView
        class="wo-add__container_primary"
        id="myView"
        @tap="clickAddExercise()"
        @touch="onTouch($event)"
        col="1"
        row="0"
        marginLeft="10"
        marginRight="10"
      >
        <GridLayout rows="auto,*" columns="auto,*,auto">
          <Image
            col="1"
            row="0"
            class="icon-add"
            src="~/assets/images/icons/icon_add_white.png"
            verticalAlignment="center"
            marginTop="7"
            marginLeft="30"
            marginRight="30"
          />
          <Label
            col="1"
            row="1"
            class="text -large -bold -default"
            text="Exercise"
            marginTop="10"
          />
        </GridLayout>
      </ContentView>
      <ContentView
        class="wo-add__container"
        id="myView"
        @tap="clickAddRestSet()"
        @touch="onTouch($event)"
        col="2"
        row="0"
      >
        <GridLayout rows="auto,*" columns="auto,*,auto">
          <Image
            col="1"
            row="0"
            class="icon-add"
            src="~/assets/images/icons/icon_add_white.png"
            verticalAlignment="center"
            marginTop="7"
            marginLeft="30"
            marginRight="30"
          />
          <Label
            col="1"
            row="1"
            class="text -large -default"
            text="Rest Set"
            marginTop="10"
          />
        </GridLayout>
      </ContentView>
    </Gridlayout>
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
    clickAddExercise() {
      this.$emit("clickAddExercise");
    },
    clickAddRest: function () {
      this.$emit("clickAddRest");
    },
    clickAddRestSet: function () {
      this.$emit("clickAddRestSet");
    },
  },
};
</script>
<style scoped lang="scss">
// Start custom common variables
@import "../../../../_app-variables";
// End custom common variables

// Custom styles
.wo-add__container {
  border-radius: 10;
  // border-color: white;
  // border-width: $border-width;
  margin-top: 20;
  margin-bottom: 20;
  height: 80;
  background-color: red;
  background-image: linear-gradient(
    to bottom,
    $container-gradient-light,
    $background-gradient-mid
  );
}
.wo-add__container_primary {
  border-radius: 10;
  // border-color: white;
  // border-width: $border-width;
  margin-top: 20;
  margin-bottom: 20;
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
.wo-add__container_primary:pressed {
  background-color: $background-gradient-light;

  background-image: linear-gradient(
    to bottom,
    $gradient-active-dark,
    $container-gradient-dark
  );
}
.wo-add__container:pressed {
  background-color: $background-gradient-light;

  background-image: linear-gradient(to bottom, $gradient-active-dark, black);
}
.icon-add {
  height: 35;
  margin-bottom: -10;
}
</style>
