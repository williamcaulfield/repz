<template>
  <StackLayout class="main">
    <ContentView class="userSummary__container" id="myView">
      <GridLayout
        class="userSummary__container-grid"
        rows="auto,auto,auto"
        columns="auto,*,auto"
        padding="0"
      >
        <Image
          col="0"
          row="0"
          rowSpan="3"
          class="user-image-thumbnail"
          stretch="aspectFill"
          horizontalAlignment="left"
          :src="user.profilePicture"
          @tap="onClickButton()"
        />
        <Label
          row="0"
          col="1"
          class="text -medium -default -bold -left"
          :text="user.userName"
          marginTop="5"
          marginLeft="7"
        />
        <Label
          row="1"
          col="1"
          class="text -small -secondary -left"
          :text="user.city"
          marginTop="0"
          marginLeft="7"
          verticalAlignment="top"
        />
        <GridLayout
          rows="auto"
          columns="auto,auto"
          row="2"
          col="1"
          marginLeft="7"
          marginBottom="5"
          verticalAlignment="bottom"
        >
          <Label
            row="0"
            col="0"
            class="text -small -default -left"
            text="Workouts: "
          />
          <Label
            row="0"
            col="1"
            class="text -small -primary -bold -left"
            :text="user.workoutsCount"
          />
        </GridLayout>
        <GridLayout
          rows="auto"
          columns="auto,auto"
          row="0"
          col="2"
          rowSpan="3"
          marginRight="10"
          verticalAlignment="center"
        >
          <Label
            row="0"
            col="0"
            class="text -small -default -bold -left"
            text="Follow  "
          />
          <Switch
            row="0"
            col="1"
            ref="switch"
            v-model="thisfollowing"
            offBackgroundColor="hsl(0, 4.2%, 40%)"
            color="rgb(194, 194, 194)"
            backgroundColor="red"
            horizontalAlignment="right"
            @tap="onCheckedChange()"
          />
          <!-- @checkedChangeEvent="switched()" -->
        </GridLayout>
      </GridLayout>
    </ContentView>
  </StackLayout>
</template>

<script>
export default {
  components: {},
  props: ["user", "following"],
  components: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    // switched() {
    //   this.$refs.switch.checked = this.$refs.switch.checked;
    // },
    onClickButton() {
      this.$emit("clicked");
    },
    onCheckedChange() {
      this.$emit("toggle");
    },
    // toggleFollowing() {
    //   this.$emit("toggleFollowing");
    // if (this.following) {
    //   this.removeFollowing();
    // } else {
    //   this.addFollowing();
    // }
    // // this.$emit("toggleFollowing");
  },
  // addFollowing() {
  //   this.$emit("addFollowing");
  // },
  // removeFollowing() {
  //   this.$emit("removeFollowing");
  // },
  // },
  data() {
    return {
      thisfollowing: this.following,
    };
  },
};
</script>
<style scoped lang="scss">
// Start custom common variables
@import "../../../_app-variables";
// End custom common variables

// Custom styles
.userSummary__container {
  width: 90%;
  height: 76;
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
  border-bottom-width: $border-width;
  border-bottom-color: $primary-color;
  margin-left: 0;
  margin-right: 10;
}
.user-image-thumbnail {
  vertical-align: center;
  margin-left: -4;
  margin-top: 0;
  width: 76;
}
.icon-heart {
  width: 20;
  margin-top: 5;
  margin-right: 5;
}
</style>
