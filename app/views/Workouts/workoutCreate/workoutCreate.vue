<template>
  <StackLayout class="main">
    <ContentView class="wo-add__container" id="myView" @tap="onClickButton()">
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
  margin: auto;
  border-radius: 10;

  border-width: $border-width;
  margin-top: 10;
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
