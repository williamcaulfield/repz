<template>
  <GridLayout
    class="navBottom"
    height="50"
    width="100%"
    rows="auto"
    columns="auto,auto,auto,auto,auto"
  >
    <GridLayout
      :class="selectedTab == 0 ? 'active' : ''"
      @touch="onTouch($event, 0)"
      @tap="createSet"
      rows="*,auto"
      cols="auto"
      class="nav"
      col="0"
      row="0"
      width="20%"
    >
      <Image
        :class="selectedTab == 0 ? 'active' : ''"
        row="0"
        class="wb_navicon"
        :src="
          selectedTab == 0
            ? '~/assets/images/icons/icon_set_red.png'
            : '~/assets/images/icons/icon_set_grey.png'
        "
      />
      <Label row="1" text="Set" class="navText"></Label>
    </GridLayout>
    <GridLayout
      :class="selectedTab == 1 ? 'active' : ''"
      @touch="onTouch($event, 1)"
      @tap="editSet"
      rows="*,auto"
      cols="auto"
      class="nav"
      col="1"
      row="0"
      width="20%"
    >
      <Image
        :class="selectedTab == 1 ? 'active' : ''"
        row="0"
        class="wb_navicon"
        :src="
          selectedTab == 1
            ? '~/assets/images/icons/icon_editset_red.png'
            : '~/assets/images/icons/icon_editset_grey.png'
        "
      />
      <Label row="1" text="Edit Set" class="navText"></Label>
    </GridLayout>
    <GridLayout
      :class="selectedTab == 2 ? 'active' : ''"
      @touch="onTouch($event, 2)"
      @tap="editRepeat"
      rows="*,auto"
      cols="auto"
      class="nav"
      col="2"
      row="0"
      width="20%"
    >
      <Image
        :class="selectedTab == 2 ? 'active' : ''"
        row="0"
        class="wb_navicon"
        :src="
          selectedTab == 2
            ? '~/assets/images/icons/icon_repeat_red.png'
            : '~/assets/images/icons/icon_repeat_grey.png'
        "
      />
      <Label row="1" text="Repeat" class="navText"></Label>
    </GridLayout>

    <GridLayout
      :class="selectedTab == 3 ? 'active' : ''"
      @tap="saveWorkout"
      @touch="onTouch($event, 3)"
      rows="*,auto"
      cols="auto"
      class="nav"
      col="3"
      row="0"
      width="20%"
    >
      <Image
        :class="selectedTab == 3 ? 'active' : ''"
        row="0"
        class="wb_navicon"
        :src="
          selectedTab == 3
            ? '~/assets/images/icons/icon_save_red.png'
            : '~/assets/images/icons/icon_save_grey.png'
        "
      />
      <Label row="1" text="Save" class="navText"></Label>
    </GridLayout>

    <GridLayout
      :class="selectedTab == 4 ? 'active' : ''"
      @tap="closeWorkout"
      @touch="onTouch($event, 4)"
      rows="*,auto"
      cols="auto"
      class="nav"
      col="4"
      row="0"
      width="20%"
    >
      <Image
        :class="selectedTab == 4 ? 'active' : ''"
        row="0"
        class="wb_navicon"
        :src="
          selectedTab == 4
            ? '~/assets/images/icons/icon_close_red.png'
            : '~/assets/images/icons/icon_close_grey.png'
        "
      />
      <Label row="1" text="Close" class="navText"></Label>
    </GridLayout>
  </GridLayout>
</template>

<script>
import app from "../../../../views/App";
import navControls from "../../../../mixins/navControls";

export default {
  mixins: [navControls],
  components: {
    app,
  },
  data() {
    return {
      selectedTab: -1,
    };
  },

  methods: {
    onTouch(args, selectedTab) {
      const contentView = args.object;
      switch (args.action) {
        case "up":
          contentView.deletePseudoClass("pressed");
          this.selectedTab = -1;
          break;
        case "down":
          contentView.addPseudoClass("pressed");
          this.selectedTab = selectedTab;
          break;
      }
    },

    editSet: function () {
      this.$emit("editSet");
    },
    editRepeat: function () {
      this.$emit("editRepeat");
    },
    createSet: function () {
      this.$emit("createSet");
    },
    saveWorkout: function () {
      this.$emit("saveWorkout");
    },
    closeWorkout: function () {
      this.$emit("closeWorkout");
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

.wb_navicon {
  text-align: center;
  vertical-align: center;
  height: 30;
  margin-top: 3;
}
.wb_navicon:pressed {
  text-align: center;
  vertical-align: center;
  height: 30;
  margin-top: 3;
}
.wb_navicon.active {
  vertical-align: bottom;
}

.recordIcon.active {
  vertical-align: bottom;
}

.navText {
  margin-bottom: -5;
  font-size: 12;
  color: rgb(210, 210, 210);
  text-align: center;
}
</style>
