<template>
  <StackLayout class="main">
    <GridLayout class="wp-overview-container-grid" rows="*" columns="*,*">
      <ContentView class="wp-progressbar-outer" row="0" col="0" colSpan="2" />

      <ContentView
        row="0"
        col="0"
        class="wp-progressbar-complete"
        width="40%"
        alignContent="left"
        verticalAlignment="top"
        marginLeft="-38"
      />
    </GridLayout>
  </StackLayout>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../../../../_app-variables.scss";
// End custom common variables

// Custom styles

.wp-progressbar-outer {
  height: 20;
  border-radius: $border-radius;
  background-color: $container-gradient-dark;
  margin-bottom: 20;
  border-color: $secondary-color;
  border-width: $border-width;
}

.wp-progressbar-complete {
  height: 20;
  border-radius: $border-radius;
  background-color: $gradient-active-dark;
  vertical-align: top;
  background-image: linear-gradient(
    to right,
    $gradient-active-dark,
    $gradient-active-light
  );
  border-color: $secondary-color;
  border-width: $border-width;
}

.wp-overview-text {
  color: $secondary-color;
  font-size: $btn-primary-text-size;
  text-align: left;
  font-size: 15;
  font-weight: bold;
  margin-left: 10;
  margin-right: 10;
  margin-top: 5;
}

.-right {
  @extend .wp-overview-text;
  text-align: right;
  color: $text-color-primary;
}

.-left {
  @extend .wp-overview-text;
  text-align: left;
}

.-primary {
  @extend .wp-overview-text;
  color: $text-color-primary;
}
.-default {
  @extend .wp-overview-text;
  color: $text-color;
}
</style>
