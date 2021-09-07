<template>
  <Page
    class="page_simple"
    actionBarHidden="false"
    backgroundSpanUnderStatusBar="true"
  >
    <ActionBar class="actionBar_simple_dark" flat="true" title="App Settings">
      <ActionItem
        icon="~/assets/images/ic_menu_light.png"
        ios.position="left"
        @tap="onToggleDrawerTap()"
      ></ActionItem>
      <ActionItem
        class="logo"
        icon="~/assets/images/repzText_red.png"
        height="10"
        ios.position="right"
      />
    </ActionBar>
    <StackLayout class="main" verticalAlignment="top" padding="30">
      <Label
        text="Notifications"
        class="text -primary -bold -large"
        horizontalAlignment="left"
      />
      <GridLayout rows="auto" columns="auto,*" marginTop="10">
        <Label
          row="0"
          col="0"
          text="Allow Notifications"
          class="text -secondary -medium -left"
          horizontalAlignment="left"
        />
        <Switch
          row="0"
          col="1"
          checked="true"
          loaded="onSwitchLoaded"
          offBackgroundColor="hsl(0, 4.2%, 40%)"
          color="rgb(194, 194, 194)"
          backgroundColor="red"
          horizontalAlignment="right"
        />
      </GridLayout>

      <GridLayout rows="auto" columns="auto,*" marginTop="10">
        <Label
          row="0"
          col="0"
          text="Sounds Enabled"
          class="text -secondary -medium -left"
          horizontalAlignment="left"
        />
        <Switch
          row="0"
          col="1"
          checked="true"
          loaded="onSwitchLoaded"
          offBackgroundColor="hsl(0, 4.2%, 40%)"
          color="rgb(194, 194, 194)"
          backgroundColor="red"
          horizontalAlignment="right"
        />
      </GridLayout>

      <GridLayout rows="auto" columns="auto,*" marginTop="10">
        <Label
          row="0"
          col="0"
          text="Abuse Laziness"
          class="text -secondary -medium -left"
          horizontalAlignment="left"
        />
        <Switch
          row="0"
          col="1"
          checked="true"
          loaded="onSwitchLoaded"
          offBackgroundColor="hsl(0, 4.2%, 40%)"
          color="rgb(194, 194, 194)"
          backgroundColor="red"
          horizontalAlignment="right"
        />
      </GridLayout>
      <Label
        text="Default Exercise Speed"
        class="text -secondary -medium -left"
        horizontalAlignment="left"
        marginTop="20"
      />

      <Slider
        value="10"
        minValue="0"
        maxValue="100"
        backgroundColor="red"
        color="red"
        marginTop="10"
      />
      <Label
        text="Personal Statistics"
        class="text -primary -bold -large"
        horizontalAlignment="left"
        marginTop="20"
      />
      <GridLayout rows="auto" columns="auto,*" marginTop="10">
        <Label
          row="0"
          col="0"
          text="Weight"
          class="text -secondary -medium -left"
          horizontalAlignment="left"
        />
        <TextField
          row="0"
          col="1"
          hint="70"
          class="field_numberentry"
          maxLength="3"
          horizontalAlignment="right"
        />
      </GridLayout>

      <GridLayout rows="auto" columns="auto,*" marginTop="10">
        <Label
          row="0"
          col="0"
          text="Height"
          class="text -secondary -medium -left"
          horizontalAlignment="left"
        />
        <TextField
          row="0"
          col="1"
          hint="160"
          class="field_numberentry"
          maxLength="3"
          horizontalAlignment="right"
        />
      </GridLayout>
      <Label
        text="Term and Conditions"
        class="text -primary -bold -large"
        horizontalAlignment="left"
        marginTop="20"
      />
      <Textview
        editable="false"
        class="description-value"
        textWrap="true"
        :text="profileText"
      />
    </StackLayout>
  </Page>
</template>
<script>
import navControls from "../../mixins/navControls";

export default {
  mixins: [navControls],
  data() {
    return {
      profileText:
        "Help protect your website and its users with clear and fair website terms and conditions. These terms and conditions for a website set out key issues such as acceptable use, privacy, cookies, registration and passwords, intellectual property, links to other sites, termination and disclaimers of responsibility.",
    };
  },
};
</script>
<style scoped lang="scss">
@import "../../_app-variables.scss";
TextView {
  background-color: transparent;
}

.main {
  font-size: 14;
  font-weight: bold;
  color: white;
}
.field_numberentry {
  color: $primary-color;
  background-color: black;
  width: 40;
  height: 40;
  text-align: center;
  font-size: 20;
  border-width: 1;
  border-color: $border-color;
  border-radius: $border-radius;
  placeholder-color: $secondary-color;
}
.page {
  background-color: black;
  background-image: linear-gradient(to bottom, rgb(32, 32, 32), black);
}
</style>
