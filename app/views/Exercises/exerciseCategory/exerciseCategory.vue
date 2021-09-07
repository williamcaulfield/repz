<template>
  <StackLayout class="main">
    <ContentView class="exerciseSummary__container" id="myView">
      <GridLayout
        class="exerciseSummary__container-grid"
        rows="auto,1.5,*"
        columns="*"
        @tap="categoryClick"
      >
        <Image
          col="0"
          row="0"
          class="category-image"
          stretch="aspectFill"
          horizontalAlignment="left"
          :src="exerciseCategory.categoryImage"
        />
        <Label row="1" class="line" col="1" marginBottom="0"></Label>
        <Label
          row="2"
          col="0"
          class="text -medium -default -bold -left"
          marginLeft="10"
          :text="exerciseCategory.categoryName"
          marginTop="0"
        />
      </GridLayout>
    </ContentView>
  </StackLayout>
</template>

<script>
export default {
  props: ["exerciseCategory"],
  components: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    categoryClick: function () {
      this.$emit("categoryClick");
    },
  },
  data() {
    return {
      // isLike: false,
      // isHeart: false
    };
  },
};
</script>
<style scoped lang="scss">
// Start custom common variables
@import "../../../_app-variables";
// End custom common variables

// Custom styles
.exerciseSummary__container {
  height: 200;
  width: 170;
  border-radius: 10;
  border-color: $border-color;
  border-width: $border-width;
  margin-top: 10;
  margin-bottom: 10;
  background-image: linear-gradient(
    to bottom,
    $container-gradient-light,
    $container-gradient-dark
  );
}

.line {
  border-bottom-width: 1.5;
  border-bottom-color: $primary-color;
  margin-left: 0;
  margin-right: 0;
}
.category-image {
  vertical-align: center;
  margin-left: 0;
  margin-top: 0;
  width: 100%;
}
</style>
