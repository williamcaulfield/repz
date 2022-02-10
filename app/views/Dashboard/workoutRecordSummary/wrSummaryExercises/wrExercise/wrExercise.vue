<template>
  <StackLayout class="main">
    <GridLayout rows="40" columns="25,18" class="wrexercise__grid">
      <Image
        col="0"
        row="0"
        class="exercise-icon"
        src="~/assets/images/icons/icon_ex00001.png"
      />
      <Label
        col="1"
        row="0"
        class="text -default -bold -xsmall"
        :text="count"
      />
    </GridLayout>
  </StackLayout>
</template>

<script>
export default {
  props: ["image", "count"],
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../../../../../_app-variables";
// End custom common variables

// Custom styles
.wrexercise__grid {
}
.exercise-icon {
  height: 30;
}
</style>
