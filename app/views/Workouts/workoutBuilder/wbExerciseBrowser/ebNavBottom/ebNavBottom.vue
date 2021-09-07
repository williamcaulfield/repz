<template>
  <GridLayout class="navBottom" height="50" width="100%" rows="*" columns="*">
    <GridLayout
      @tap="add"
      rows="*,auto"
      cols="auto"
      class="nav"
      col="0"
      row="0"
      width="20%"
    >
      <Image
        @tap="editSet"
        row="0"
        class="eb_navicon"
        src="~/assets/images/icons/icon_add_white.png"
        @touch="onTouch($event)"
      />
      <!-- <Label row="1" text="Add Exercises" class="navText"></Label> -->
    </GridLayout>
  </GridLayout>
</template>

<script>
import app from "../../../../../views/App";
import navControls from "../../../../../mixins/navControls";

export default {
  mixins: [navControls],
  components: {
    app,
  },
  data() {
    return {
      selectedTab: 1,
    };
  },

  methods: {
    onTouch(args, selectedTab) {
      const contentView = args.object;
      switch (args.action) {
        case "up":
          contentView.deletePseudoClass("pressed");
          break;
        case "down":
          contentView.addPseudoClass("pressed");
          break;
      }
    },

    add: function () {
      this.$emit("add");
    },
  },
};
</script>

<style>
.navBottom {
  background-color: black;
  border-color: red;
}

.nav {
  height: 100%;
  width: 100%;
}

.eb_navicon {
  text-align: center;
  vertical-align: center;
  height: 50;
  margin-top: 10;
}
.eb_navicon:pressed {
  text-align: center;
  vertical-align: center;
  height: 50;
  margin-top: 10;
  tint-color: red;
}
.wb_navicon.active {
  vertical-align: bottom;
}

.recordIcon.active {
  vertical-align: bottom;
}

.buttonText {
  margin-bottom: -5;
  font-size: 24;
  color: rgb(210, 210, 210);
  align-content: center;
  vertical-align: middle;
}
</style>
