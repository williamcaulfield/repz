<template>
  <Page actionBarHidden="true" class="page">
    <ScrollView orientation="vertical">
      <StackLayout class="main">
        <Label
          text="< Back"
          @tap="close"
          class="text -primary -bold -medium -left"
          marginLeft="10"
          horizontalAlignment="left"
        />
        <VideoPlayer
          marginTop="5"
          ref="player"
          src="https://repz-resources.ams3.digitaloceanspaces.com/exercises/EX000001/videos/muscleUp.mp4"
          autoplay="true"
          height="235"
          marginBottom="20"
        />

        <GridLayout
          rows="auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,*"
          columns="*"
        >
          <StackLayout
            class="main"
            verticalAlignment="top"
            horizontalAlignment="center"
          >
            <Label
              row="1"
              col="0"
              class="text -xlarge -primary -bold -left"
              text="Pull up - Chest"
              marginLeft="15"
            />
            <Label
              row="2"
              col="0"
              class="text -xlarge -default -bold -left"
              text="Shoulder Width Grip - Overhand"
              marginLeft="15"
              marginBottom="5"
            />
            <ContentView
              row="3"
              col="0"
              class="exercisedetail--container"
              id="myView"
            >
              <GridLayout
                class="exercisedetail--container-grid"
                rows="auto,auto,auto,auto,auto,auto"
                columns="auto,*"
              >
                <Label
                  col="0"
                  row="0"
                  class="text -medium -default -left"
                  text="Exercise Type"
                />
                <Label
                  col="1"
                  row="0"
                  class="text -medium -primary -right"
                  text="Repetitions"
                />
                <Label
                  col="0"
                  row="1"
                  class="text -medium -default -left"
                  text="Muscle Zones"
                  verticalAlignment="Top"
                />
                <Label
                  col="1"
                  row="1"
                  class="text -medium -primary -right"
                  text="Arms, Chest, Back, Core"
                  textWrap="true"
                  width="80%"
                />
                <Label
                  col="0"
                  row="2"
                  class="text -medium -default -left"
                  text="Difficulty level"
                />
                <Label
                  col="1"
                  row="2"
                  class="text -medium -primary -right"
                  text="Intermediate"
                />
                <Label
                  col="0"
                  row="3"
                  class="text -medium -default -left"
                  text="Skill Level"
                />
                <Label
                  col="1"
                  row="3"
                  class="text -medium -primary -right"
                  text="Low"
                />
                <Label
                  col="0"
                  row="4"
                  class="text -medium -default -left"
                  text="Equipment:"
                />
                <Label
                  col="1"
                  row="4"
                  class="text -medium -primary -right"
                  text="Pull up bar"
                />
                <Label
                  col="0"
                  row="5"
                  class="text -medium -default -left"
                  textWrap="true"
                  :text="'Alternatives:'"
                  verticalAlignment="Top"
                />
                <Label
                  col="1"
                  row="5"
                  verticalAlignment="Top"
                  class="text -medium -primary -right"
                  textWrap="true"
                  text="Door, Tree Branch, Roof beam, Cupboard side"
                />
              </GridLayout>
            </ContentView>
            <Label
              row="4"
              col="0"
              class="text -xlarge -primary -bold -left"
              text="Steps"
              marginLeft="15"
              marginBottom="5"
            />
            <ContentView
              row="7"
              col="0"
              class="exercisedetail--container"
              id="myView"
            >
              <GridLayout
                class="exercisedetail--container-grid"
                rows="auto,auto,auto,auto,auto,auto"
                columns="auto,auto"
              >
                <Label
                  col="0"
                  row="0"
                  class="text -medium -primary -left"
                  text="*"
                  verticalAlignment="top"
                  marginTop="2"
                />
                <Label
                  col="1"
                  row="0"
                  class="text -small -default -left"
                  textWrap="true"
                  marginLeft="2%"
                  marginBottom="5"
                  width="87%"
                  horizontalAlignment="left"
                  text="Leap up and grip the bar with your hands shoulder width apart and your palms facing away from you."
                />
                <Label
                  col="0"
                  row="1"
                  class="text -medium -primary -left"
                  text="*"
                  verticalAlignment="top"
                  marginTop="2"
                />
                <Label
                  col="1"
                  row="1"
                  class="text -small -default -left"
                  textWrap="true"
                  marginLeft="2%"
                  marginBottom="5"
                  width="87%"
                  horizontalAlignment="left"
                  text="Hang with your arms fully extended, you can bend your legs at the knee if they’re dragging on the ground."
                />
                <Label
                  col="0"
                  row="2"
                  class="text -medium -primary -left"
                  text="*"
                  verticalAlignment="top"
                  marginTop="2"
                />
                <Label
                  col="1"
                  row="2"
                  class="text -small -default -left"
                  textWrap="true"
                  marginLeft="2%"
                  marginBottom="5"
                  width="87%"
                  horizontalAlignment="left"
                  text="Keep your shoulders back and your core engaged throughout. Then pull up. Focus on enlisting every upper body muscle to aid your upward endeavours."
                />
                <Label
                  col="0"
                  row="3"
                  class="text -medium -primary -left"
                  text="*"
                  verticalAlignment="top"
                  marginTop="2"
                />
                <Label
                  col="1"
                  row="3"
                  class="text -small -default -left"
                  textWrap="true"
                  marginLeft="2%"
                  marginBottom="5"
                  width="87%"
                  horizontalAlignment="left"
                  text="Move slowly upward until your chin is above the bar, then equally slowly downward until your arms are extended again."
                />
                <Label
                  col="0"
                  row="4"
                  class="text -medium -primary -left"
                  text="*"
                  verticalAlignment="top"
                  marginTop="2"
                />
                <Label
                  col="1"
                  row="4"
                  class="text -small -default -left"
                  textWrap="true"
                  marginLeft="2%"
                  marginBottom="5"
                  width="87%"
                  horizontalAlignment="left"
                  text="Aim for 10 pull-ups to start. If you get to 15 then move to a harder progression."
                />
              </GridLayout>
            </ContentView>
            <Label
              row="6"
              col="0"
              class="text -xlarge -primary -bold -left"
              text="Progressions"
              marginLeft="15"
              marginBottom="5"
            />
            <ContentView
              row="7"
              col="0"
              class="exercisedetail--container"
              id="myView"
            >
              <GridLayout
                class="exercisedetail--container-grid"
                rows="auto,auto,auto,auto,auto,auto"
                columns="auto,*"
              >
                <Label
                  col="0"
                  row="0"
                  class="text -medium -default -left"
                  text="High Pull Up"
                />
                <Label
                  col="1"
                  row="0"
                  class="text -medium -primary -right"
                  text="Intermediate"
                />
                <Label
                  col="0"
                  row="1"
                  class="text -medium -default -left"
                  text="Clapping Pull Ups"
                />
                <Label
                  col="1"
                  row="1"
                  class="text -medium -primary -right"
                  text="Intermediate"
                />
                <Label
                  col="0"
                  row="2"
                  class="text -medium -default -left"
                  text="Muscle up"
                />
                <Label
                  col="1"
                  row="2"
                  class="text -medium -primary -right"
                  text="Hard"
                />
                <Label
                  col="0"
                  row="3"
                  class="text -medium -default -left"
                  text="Swinging Planch Pull ups"
                />
                <Label
                  col="1"
                  row="3"
                  class="text -medium -primary -right"
                  text="Hard"
                />
                <Label
                  col="0"
                  row="4"
                  class="text -medium -default -left"
                  text="Jump on the Bar Pull Ups"
                />
                <Label
                  col="1"
                  row="4"
                  class="text -medium -primary -right"
                  text="Elite"
                />
              </GridLayout>
            </ContentView>

            <Label
              row="8"
              col="0"
              class="text -xlarge -primary -bold -left"
              text="Preparatory"
              marginLeft="15"
              marginBottom="5"
            />
            <ContentView
              row="9"
              col="0"
              class="exercisedetail--container"
              id="myView"
            >
              <GridLayout
                class="exercisedetail--container-grid"
                rows="auto,auto,auto,auto,auto,auto"
                columns="auto,*"
              >
                <Label
                  col="0"
                  row="0"
                  class="text -medium -default -left"
                  text="Austrailian Pull Ups"
                />
                <Label
                  col="1"
                  row="0"
                  class="text -medium -primary -right"
                  text="Foundation"
                />
                <Label
                  col="0"
                  row="1"
                  class="text -medium -default -left"
                  text="Press Ups"
                />
                <Label
                  col="1"
                  row="1"
                  class="text -medium -primary -right"
                  text="Foundation"
                />
                <Label
                  col="0"
                  row="2"
                  class="text -medium -default -left"
                  text="Chin Ups"
                />
                <Label
                  col="1"
                  row="2"
                  class="text -medium -primary -right"
                  text="Foundation"
                />
              </GridLayout>
            </ContentView>
          </StackLayout>
        </GridLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import navControls from "../../../mixins/navControls";

export default {
  beforeDestroy() {
    this.$refs.player.nativeView.destroy();
  },
  mixins: [navControls],
  components: {},
  methods: {
    close() {
      this.$navigateBack();
    },
    onClickButton() {
      this.$emit("clicked");
    },
  },
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../../../_app-variables.scss";
// End custom common variables

// Custom styles

.exercisedetail--video {
  width: 100%;
}
.exercisedetail--container {
  width: 370;
  border-radius: $border-radius;
  margin-bottom: 20;
  background-color: $container-gradient-light;
}
.exercisedetail--container-grid {
  padding: 15;
}
</style>
