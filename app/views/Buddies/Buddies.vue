<template>
  <Page
  @loaded="pageLoaded($event)"

    class="page"
    actionBarHidden="false"
    backgroundSpanUnderStatusBar="true"
    xmlns:="http://www.nativescript.org/tns.xsd"
  >
    <ActionBar  @loaded="onActionBarLoaded($event)" class="actionBar" title="Buddies">
      <ActionItem
        icon="~/assets/images/ic_menu.png"
        ios.position="left"
        @tap="onToggleDrawerTap()"
      ></ActionItem>
    </ActionBar>

    <GridLayout rows="auto,*,auto" columns="auto">
      <GridLayout
        ref="navTab"
        class="navTab"
        width="100%"
        rows="auto"
        columns="auto,auto"
        row="0"
      >
        <GridLayout
          class="tabview"
          :class="selectedTabview == 0 ? 'active' : ''"
          @tap="showYours"
          col="0"
          width="50%"
        >
          <Label
            :class="selectedTabview == 0 ? 'active' : ''"
            text="Yours"
            class="tabviewText"
          ></Label>
        </GridLayout>
        <GridLayout
          class="tabview"
          :class="selectedTabview == 1 ? 'active' : ''"
          @tap="showSearch"
          cols="auto"
          col="1"
          width="50%"
        >
          <Label
            :class="selectedTabview == 1 ? 'active' : ''"
            text="Search"
            class="tabviewText"
          ></Label>
        </GridLayout>
      </GridLayout>

      <GridLayout v-show="selectedTabview == 0" row="1" width="100%">
        <ScrollView>   
          <ListView
                  ref="listviewfollowing"
                  for="user in usersFollowing"
                  @itemTap="toggleFollowingFollower"
                  backgroundColor="transparent"
                >
                  <v-template>
                    <buddySummary
                      :user="user"
                      :following="user.following"
                      @clicked="showUser(user)"
                    />
                    <!-- @clicked="showUser(user)" -->
                  </v-template>
                </ListView>
              
     
        </ScrollView>
      </GridLayout>

      <GridLayout v-show="selectedTabview == 1" row="1" width="100%">
        <StackLayout verticalAlignment="top">
          <GridLayout rows="*,auto">
            <StackLayout row="0">
              <SearchBar
                class="searchbar"
                hint="Search users..."
                [text]="searchPhrase"
                (textChange)="onTextChanged($event)"
                (clear)="onClear($event)"
                (submit)="onSubmit($event)"
                @loaded="searchBarLoaded($event)"
                textFieldHintColor="rgb(151,151,151)"
                textFieldBackgroundColor="white"
                color="black"
              ></SearchBar>



              <GridLayout>
                <ListView
                  ref="listviewusers"
                  for="user in users"            
                  @itemTap="toggleFollowingUser"
                  backgroundColor="transparent"
                >
                  <v-template>
                    <buddySummary
                      :user="user"
                      :following="user.following"
                      @clicked="showUser(user)"
                    />
                    <!-- @clicked="showUser(user)" -->
                  </v-template>
                </ListView>
              </GridLayout>
            </StackLayout>
          </GridLayout>
        </StackLayout>
      </GridLayout>
      <navBottom row="2"></navBottom>
    </GridLayout>
  </Page>
</template>
<script>
import navBottom from "../../components/navBottom";
import buddySummary from "./buddySummary/buddySummary";
import buddyDetail from "./buddyDetail/buddyDetail";

import navControls from "../../mixins/navControls";

import {
  Frame,
  Color,
  isIOS,
  Http,
  ApplicationSettings,
} from "@nativescript/core";

export default {
  mixins: [navControls],
  components: { navBottom, buddySummary, buddyDetail },
  computed: {},

  mounted() {
    const userId = ApplicationSettings.getNumber("userId");
    const authToken = ApplicationSettings.getString("userToken");

    Http.request({
      url: "https://api.repz.app/user/" + userId + "/users/following",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    }).then(
      (response) => {
        this.usersFollowing = response.content.toJSON();
        // this.usersFollowing.forEach((user) => {
        //   Object.assign(user, { following: true });
        // });
        console.log(this.usersFollowing);
      },
      (e) => {}
    );

    Http.request({
      url: "https://api.repz.app/user/" + userId + "/users",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    }).then(
      (response) => {
        this.users = response.content.toJSON();
        // this.users.forEach((user) => {
        //   Object.assign(user, { following: false });
        // });
        console.log(this.users);
      },
      (e) => {}
    );
  },
  methods: {
    toggleFollowingUser(event) {
      console.log("addFollowUsers " + event.index);
      console.log(this.users[event.index]);
      //let position = this.selectedItems.indexOf(index);
      if (this.users[event.index].following === false) {
        this.users[event.index].following = true;

        // this.$refs.listviewusers.refresh();
        // this.forceRerender();

        var user = this.users[event.index];
        this.followUser(user);
        this.refreshUsersFollowingList();
      } else {
        this.users[event.index].following = false;
        var user = this.users[event.index];
        this.unfollowUser(user);
        this.refreshUsersFollowingList();
        this.$refs.listviewfollowing.refresh();
      }
    },

    toggleFollowingFollower(event) {
      console.log("addFollowUsers " + event.index);
      console.log(this.users[event.index]);
      //let position = this.selectedItems.indexOf(index);
      if (this.usersFollowing[event.index].following === false) {
        this.usersFollowing[event.index].following = true;

        // this.$refs.listviewusers.refresh();
        // this.forceRerender();

        var user = this.users[event.index];
        this.followUser(user);
        this.refreshUsersList();
      } else {
        this.usersFollowing[event.index].following = false;
        var user = this.usersFollowing[event.index];
        this.unfollowUser(user);
        this.refreshUsersList();
        this.$refs.listviewusers.refresh();
      }
    },

    // removeFollowUsers(event) {
    //   console.log("removeFollowUsers " + event.index);
    //   console.log(this.users[event.index]);
    //   if (this.users[event.index].following == true) {
    //     this.users[event.index].following = false;

    //     // this.$refs.listviewusers.refresh();
    //     // this.forceRerender();

    //     // var user = this.users[event.index];
    //     // this.unfollowUser(user);
    //     //this.refreshUsersFollowingList();
    //   }
    // },

    // addFollowFollowing(event) {
    //   console.log("addFollowUsers " + event.index);
    //   console.log(this.usersFollowing[event.index]);
    //   if (this.usersFollowing[event.index].following === false) {
    //     this.usersFollowing[event.index].following = true;

    //     // this.$refs.listviewfollowing.refresh();
    //     // this.forceRerender();

    //     // var user = this.usersFollowing[event.index];
    //     // this.followUser(user);
    //     //this.refreshUsersList();
    //   }
    // },

    // removeFollowFollowing(event) {
    //   console.log("removeFollowFollowing " + event.index);
    //   console.log(this.usersFollowing[event.index]);
    //   if (this.usersFollowing[event.index].following === true) {
    //     this.usersFollowing[event.index].following = false;

    //     // this.$refs.listviewfollowing.refresh();
    //     // this.forceRerender();

    //     // var user = this.usersFollowing[index];
    //     // this.unfollowUser(user);

    //     //this.refreshUsersList();
    //   }
    // },

    refreshUsersList() {
      const userId = ApplicationSettings.getNumber("userId");
      const authToken = ApplicationSettings.getString("userToken");

      Http.request({
        url: "https://api.repz.app/user/" + userId + "/users",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
      }).then(
        (response) => {
          this.users = response.content.toJSON();
          console.log(this.users);
        },
        (e) => {}
      );
    },

    refreshUsersFollowingList() {
      const userId = ApplicationSettings.getNumber("userId");
      const authToken = ApplicationSettings.getString("userToken");

      Http.request({
        url: "https://api.repz.app/user/" + userId + "/users/following",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
      }).then(
        (response) => {
          this.usersFollowing = response.content.toJSON();
          console.log(this.usersFollowing);
        },
        (e) => {}
      );
    },

    // toggleFollowing(payload) {
    //   var user = payload;
    //   if (user.following == true) {
    //     this.unfollowUser(user);
    //     user.following = false;
    //   } else {
    //     this.followUser(user);
    //     user.following = true;
    //   }
    //   this.$refs.listviewusers.refresh();
    //   this.$refs.listviewfollowing.refresh();
    // },
    followUser(payload) {
      const userId = ApplicationSettings.getNumber("userId");
      const authToken = ApplicationSettings.getString("userToken");
      const userIdFollow = payload.userID;

      Http.request({
        url: "https://api.repz.app/user/" + userId + "/follow/" + userIdFollow,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
        content: JSON.stringify({
          userID: userIdFollow,
          userIDFollower: userId,
        }),
      }).then(
        (response) => {
          console.log(`Response Status Code: ${response.statusCode}`);
        },
        (e) => {}
      );
    },

    unfollowUser(payload) {
      const userId = ApplicationSettings.getNumber("userId");
      const authToken = ApplicationSettings.getString("userToken");
      const userIdFollow = payload.userID;

      Http.request({
        url: "https://api.repz.app/user/" + userId + "/follow/" + userIdFollow,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
        content: JSON.stringify({
          userID: userIdFollow,
          userIDFollower: userId,
        }),
      }).then(
        (response) => {
          console.log(`Response Status Code: ${response.statusCode}`);
        },
        (e) => {}
      );
    },

    showUser(payload) {
      this.$navigateTo(buddyDetail, {
        props: {
          user: payload,
        },
        animated: true,
        transition: {
          name: "slideLeft",
          duration: 300,
          curve: "easeIn",
        },
      });
    },

    searchBarLoaded(args) {
      let sb = args.object;

      sb.ios.searchBarStyle = UISearchBarStyle.Prominent;
      sb.ios.backgroundImage = UIImage.new();
    },

    pageLoaded(args) {
      const page = args.object;
    },

    onActionBarLoaded(args) {
      if (isIOS) {
        const navigationBar = Frame.topmost().ios.controller.navigationBar;

        const gradient = CAGradientLayer.layer();
        const bounds = navigationBar.bounds;
        gradient.frame = bounds;

        gradient.colors = [
          new Color("red").ios.CGColor,
          new Color("hsl(352.5, 100%, 25%)").ios.CGColor,
        ];
        gradient.startPoint = CGPointMake(0, 0);
        gradient.endPoint = CGPointMake(1, 0);
        const size = CGSizeMake(bounds.size.width, bounds.size.height);
        UIGraphicsBeginImageContext(size);
        gradient.renderInContext(UIGraphicsGetCurrentContext());
        const gradientImage = UIGraphicsGetImageFromCurrentImageContext();
        UIGraphicsEndImageContext();

        // doesn't work without this setTimeout
        setTimeout(() => {
          navigationBar.setBackgroundImageForBarMetrics(
            gradientImage,
            UIBarMetrics.default
          );
        });
      }
    },

    showYours() {
      this.selectedTabview = 0;
    },
    showSearch() {
      this.selectedTabview = 1;
    },

    home() {
      this.selectedTab = 0;
    },
  },
  data() {
    return {
      index: 0,
      lastDelY: 0,
      headerCollapsed: false,
      selectedTab: 0,
      selectedTabview: 0,
      users: [],
      usersFollowing: [],
    };
  },
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../../_app-variables";
// End custom common variables

// Custom styles

.searchbar {
  margin-top: 10;
}
</style>
