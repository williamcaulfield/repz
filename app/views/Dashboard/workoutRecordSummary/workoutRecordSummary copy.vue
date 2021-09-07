<template>
  <StackLayout class="main">
    <StackLayout>
      <GridLayout rows="auto,auto" columns="*">
        <Image
          class="workoutRecordSummary-imageArray"
          row="0"
          col="0"
          stretch="aspectFill"
          @tap="onClickButton()"
          :src="workout.coverImage"
        />
      </GridLayout>

      <GridLayout
        class="workoutRecordSummary-titleBar"
        row="1"
        width="100%"
        columns="auto,*"
        rows="auto,auto,auto"
        verticalAlignment="center"
      >
        <Image
          horizontalAlignment="left"
          stretch="aspectFill"
          col="0"
          row="1"
          class="workoutRecordSummary-titleBar__profilePic"
          :src="workout.userProfilePic"
        />

        <!-- <StackLayout class="hr-light" col="1" row="1" /> -->
        <Label
          col="1"
          row="0"
          class="workoutRecordSummary-titleBar__workoutName"
          textwrap="false"
          :text="workout.workoutName"
        />
        <Label
          col="1"
          row="1"
          class="workoutRecordSummary-titleBar__dateTime"
          textwrap="false"
          :text="workout.dateTime"
        />
        <Label
          col="1"
          row="1"
          class="workoutRecordSummary-titleBar__userName"
          textwrap="false"
          :text="workout.userName"
        />
        <Label
          row="0"
          col="1"
          class="workoutRecordSummary-titleBar__caloriesBurnedDuration"
          textwrap="false"
          :text="
            workout.caloriesBurned + ' Kcal - ' + workout.duration + ' min'
          "
        />
      </GridLayout>

      <GridLayout rows="*,auto" columns="*,auto,auto,auto,auto,*" row="2">
        <Image
          row="0"
          col="1"
          class="workoutRecordSummary-actionBar__icon"
          :src="'~/assets/images/icons/icon_comment.png'"
        />
        <Image
          row="0"
          col="2"
          class="workoutRecordSummary-actionBar__icon"
          :src="'~/assets/images/icons/icon_share.png'"
        />
        <Image
          row="0"
          col="3"
          class="workoutRecordSummary-actionBar__icon"
          :src="'~/assets/images/icons/icon_thumbsUp.png'"
        />
        <Image
          row="0"
          col="4"
          class="workoutRecordSummary-actionBar__icon"
          :src="'~/assets/images/icons/icon_thumbsUpCount.png'"
        />
      </GridLayout>
      <StackLayout width="100%" marginTop="5" class="line" />
    </StackLayout>
  </StackLayout>
</template>

<script>
export default {
  props: ["workout"],
  components: {},
  computed: {
    // categoryIcon() {
    //   switch (this.workout.category) {
    //     case "Burger":
    //       return "fa-cutlery";
    //       break;
    //     case "Beer":
    //       return "fa-beer";
    //       break;
    //     case "Pancake":
    //       return "fa-coffee";
    //       break;
    //     case "Cake":
    //       return "fa-birthday-cake";
    //       break;
    //     default:
    //       return "fa-fire";
    //       break;
    //   }
    // }
  },
  created() {
    // this.isLike =  this.workout.isLike
    // this.isHeart =  this.workout.isFavorite
  },
  mounted() {},
  methods: {
    // animateLike() {
    //   if (isIOS) {
    //     return;
    //   }
    //   let imgLogo = this.$refs.like.nativeView;
    //   imgLogo
    //     .animate({
    //       scale: {
    //         x: 0.6,
    //         y: 0.6
    //       },
    //       duration: 100,
    //       delay: 0
    //     })
    //     .then(function() {
    //       return imgLogo.animate({
    //         scale: {
    //           x: 1.2,
    //           y: 1.2,
    //           duration: 50
    //         }
    //       });
    //     })
    //     .then(function() {
    //       return imgLogo.animate({
    //         scale: {
    //           x: 1,
    //           y: 1,
    //           duration: 100
    //         }
    //       });
    //     })
    //     .then(function() {});
    // },
    // animateFavorite() {
    //   if (isIOS) {
    //     return;
    //   }
    //   let imgLogo = this.$refs.favorite.nativeView;
    //   imgLogo
    //     .animate({
    //       scale: {
    //         x: 0.6,
    //         y: 0.6
    //       },
    //       duration: 50,
    //       delay: 0
    //     })
    //     .then(function() {
    //       return imgLogo.animate({
    //         scale: {
    //           x: 1.2,
    //           y: 1.2,
    //           duration: 50
    //         }
    //       });
    //     })
    //     .then(function() {
    //       return imgLogo.animate({
    //         scale: {
    //           x: 1,
    //           y: 1,
    //           duration: 100
    //         }
    //       });
    //     })
    //     .then(function() {});
    // },
    // toggleLike() {
    //   this.animateLike();
    //   this.workout.isLike = !this.workout.isLike;
    //   if (this.workout.isLike) {
    //     this.workout.likes += 1;
    //   } else {
    //     this.workout.likes -= 1;
    //   }
    // },
    // toggleHeart() {
    //   this.animateFavorite();
    //   this.workout.isFavorite = !this.workout.isFavorite;
    // },
    onClickButton() {
      this.$emit("clicked", this.workout);
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
<style scoped>
.workoutRecordSummary-imageArray {
  width: 95%;
  height: 238;
  margin: auto;
  border-radius: 10;

  border-color: rgb(151, 151, 151);
  border-width: 1;
}
.workoutRecordSummary-titleBar__profilePic {
  border-width: 1;
  border-color: rgb(151, 151, 151);
  border-radius: 50%;
  margin-left: 10;
  margin-top: -25;
  width: 50;
  height: 50;
}
.workoutRecordSummary-titleBar__workoutName {
  font-size: 16;
  font-weight: bold;
  color: white;
  vertical-align: bottom;
  margin-left: 7;
  margin-bottom: 5;
  height: 23;
  border-bottom-width: 1;
  border-bottom-color: red;
  margin-right: 10;
  margin-top: 5;
}

.workoutRecordSummary-titleBar__caloriesBurnedDuration {
  font-size: 12;
  color: red;
  text-align: right;
  margin-right: 10;
  vertical-align: bottom;
  margin-bottom: 8;
  font-weight: bold;
}
.workoutRecordSummary-titleBar__userName {
  font-size: 14;
  color: white;
  font-weight: bold;
  text-align: right;
  margin-right: 10;
  margin-bottom: 5;
  vertical-align: bottom;
}
.workoutRecordSummary-titleBar__dateTime {
  font-size: 10;
  color: white;
  text-align: left;
  vertical-align: bottom;
  margin-bottom: 10;
  margin-left: 7;
}

.workoutRecordSummary-actionBar__icon {
  height: 28;
  width: 28;
  margin-bottom: 10;
}
</style>