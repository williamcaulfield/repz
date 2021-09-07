<template>
  <StackLayout class="main">
    <ContentView class="wo-add__container" id="myView" @tap="onClickButton()">
      <GridLayout rows="auto,*" columns="auto,*,auto">
        <Image
          col="1"
          row="0"
          class="icon-add-grey"
          src="~/assets/images/icons/icon_add_grey.png"
          verticalAlignment="center"
          marginTop="10"
        />
        <Label
          col="1"
          row="1"
          class="text -xlarge -bold -secondary"
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
.wo-add__container {
  width: 90%;
  height: 238;
  margin: auto;
  border-radius: 10;
  border-color: $border-color;
  border-width: $border-width;
  margin-top: 10;
  margin-bottom: 10;
  height: 100;
  background-image: linear-gradient(
    to bottom,
    $container-gradient-light,
    $container-gradient-dark
  );
}
.icon-add-grey {
  height: 45;
  margin-bottom: -10;
}
</style>
