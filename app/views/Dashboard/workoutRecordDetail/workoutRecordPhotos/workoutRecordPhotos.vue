<template>
  <GridLayout height="250">
    <Carousel
      ref="myCarousel"
      debug="true"
      height="250"
      color="white"
      @pageChanged="myChangePageEvent"
      android:indicatorAnimation="slide"
      indicatorColor="#fff"
      indicatorOffset="0, -10"
      showIndicator="true"
    >
      <CarouselItem
        v-for="(item, i) in myData"
        :key="i"
        :backgroundColor="item.color"
        verticalAlignment="middle"
        @tap="myTapPageEvent"
        class="workoutRecordSummary-imageArray"
      >
        <GridLayout>
          <Image :src="item.image" stretch="aspectFill" />
          <!-- <Label
            :text="item.title"
            horizontalAlignment="center"
            backgroundColor="#50000000"
            height="30"
          /> -->
        </GridLayout>
      </CarouselItem>
    </Carousel>
  </GridLayout>
</template>

<script>
const carousel = require("nativescript-carousel");

export default {
  mixins: [],
  created() {},
  computed: {
    hasItems() {
      return this.myData.length > 0;
    },
  },
  watch: {
    async myData(to) {
      await this.$nextTick();
      this.$refs.myCarousel.nativeView.refresh();
    },
  },
  methods: {
    myChangePageEvent(args) {
      console.log("current page: ", args.index);
      this.currentPage = args.index;
    },
    myTapPageEvent: function (args) {
      console.log("tap page: ", this.$refs.myCarousel.nativeView.selectedPage);
      this.tappedPage = this.$refs.myCarousel.nativeView.selectedPage;
    },
    toggleIndicator: function () {
      this.$refs.myCarousel.nativeView.showIndicator = !this.indicatorEnabled;
      this.indicatorEnabled = !this.indicatorEnabled;
    },
    toggleColor: function () {
      this.$refs.myCarousel.nativeView.indicatorColor = "#FED700";
      this.$refs.myCarousel.nativeView.indicatorColorUnselected = "#50FED700";
    },
  },
  data() {
    return {
      hasItems: true,
      myData: [
        {
          title: "Slide 1",
          color: "#b3cde0",
          image:
            "~/assets/images/workoutRecorded/WOR0000000003/WOR0000000003_PIC_01.jpg",
        },
        {
          title: "Slide 2",
          color: "#6497b1",
          image:
            "~/assets/images/workoutRecorded/WOR0000000003/WOR0000000003_PIC_02.jpg",
        },
        {
          title: "Slide 3",
          color: "#005b96",
          image:
            "~/assets/images/workoutRecorded/WOR0000000003/WOR0000000003_PIC_03.jpg",
        },
        {
          title: "Slide 4",
          color: "#03396c",
          image:
            "~/assets/images/workoutRecorded/WOR0000000003/WOR0000000003_PIC_04.jpg",
        },
      ],
      currentPage: 0,
      tappedPage: 0,
      indicatorEnabled: false,
      images: [
        {
          src: "~/assets/images/workoutRecorded/WOR0000000003/WOR0000000003_PIC_01.jpg",
        },
        {
          src: "~/assets/images/workoutRecorded/WOR0000000003/WOR0000000003_PIC_02.jpg",
        },
        {
          src: "~/assets/images/workoutRecorded/WOR0000000003/WOR0000000003_PIC_03.jpg",
        },
        {
          src: "~/assets/images/workoutRecorded/WOR0000000003/WOR0000000003_PIC_04.jpg",
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../../../../_app-variables.scss";

#slide1 {
  background: linear-gradient(45deg, #f06f7e, #f34a30);
  vertical-align: center;
}

#slide2 {
  background: linear-gradient(-45deg, #1d976c, #93f9b9);
  vertical-align: center;
}

#slide3 {
  background: linear-gradient(45deg, #1d2b64, #f8cdda);
  vertical-align: center;
}

#slide4 {
  background: linear-gradient(tobottom, #003973, #e5e5be);
  vertical-align: center;
}
.carousel-layout-fix {
  padding: 0.1 0;
  margin: -0.1 0;
}
.workoutRecordSummary-imageArray {
  width: 1000%;

  margin: auto;
  border-radius: 0;

  border-color: rgb(151, 151, 151);
  border-width: 0;
}
</style>
