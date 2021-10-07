<template>
  <StackLayout class="main" @tap="onClickButton()">
    <ContentView class="achievement__container" id="myView">
      <GridLayout
        class="achievement__container-grid"
        rows="auto,5,auto,*"
        columns="auto,*,"
      >
        <Label
          row="0"
          col="0"
          class="text -medium -primary -bold -left"
          :text="achievementName"
          marginTop="10"
          marginLeft="12"
        />
        <Label
          class="line"
          row="1"
          col="0"
          colSpan="2"
          marginTop="2"
          marginLeft="10"
          marginRight="10"
        />
        <Textview
          row="2"
          col="0"
          editable="false"
          class="profile_text"
          textWrap="true"
          :text="description"
          marginTop="0"
          marginLeft="10"
          width="95%"
          horizontalAlignment="center"
          height="50"
        />
      </GridLayout>
    </ContentView>
  </StackLayout>
</template>

<script>
export default {
  props: ["achievementName", "description"],
  components: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {},
  data() {
    return {};
  },
};
</script>
<style scoped lang="scss">
// Start custom common variables
@import "../../../../_app-variables.scss";
// End custom common variables

// Custom styles
.achievement__container {
  width: 90%;
  height: 90;
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
.profile_text {
  font-size: 14;
  color: white;
  font-weight: normal;
  background-color: transparent;
}

.line {
  border-bottom-width: $border-width;
  border-bottom-color: $primary-color;
  margin-left: 0;
  margin-right: 10;
}
</style>
