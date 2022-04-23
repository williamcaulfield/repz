
import navBottom from "../../components/navBottom";
import buddySummary from "./buddySummary/buddySummary";
import buddyDetail from "./buddyDetail/buddyDetail";

import navControls from "../../mixins/navControls";

import Vue from 'vue';


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
      this.dataReady= true;

  },
  methods: {
    toggleFollowingUser(index) {
    //   console.log("addFollowUsers " + event.index);
    //   console.log(this.users[event.index]);
    //   //let position = this.selectedItems.indexOf(index);
    //   if (this.users[event.index].following === false) {
    //     this.users[event.index].following = true;

    //     // this.$refs.listviewusers.refresh();
    //     // this.forceRerender();

    //     var user = this.users[event.index];
    //     this.followUser(user);
    //     this.refreshUsersFollowingList();
    //   } else {
    //     this.users[event.index].following = false;
    //     var user = this.users[event.index];
    //     this.unfollowUser(user);
    //     this.refreshUsersFollowingList();
    //     this.$refs.listviewfollowing.refresh();
    //   }

// var index = this.getUserIndex(user)
          
    //   console.log(user);

    
    

    
       
        console.log("updated user at index " + index);

    if (this.users[index].following == false) {
        this.users[index].following = true;
        this.followUser(this.users[index]);
        console.log("followed")
    //this.$forceUpdate();
    }
    else {
        this.users[index].following = false;
        this.unfollowUser(this.users[index]);
        console.log("unfollowed")
        //this.$forceUpdate();

    }

    //   var users = this.getUsers
    //   //let position = this.selectedItems.indexOf(index);
    //   if (users[index].following === false) {
        

    //     // this.$refs.listviewusers.refresh();
    //     // this.forceRerender();

 
    //     this.followUser(users[index]);
    //     this.updateUsersFollowing(index);
       
    //     console.log("updated user at index " + index);
  

        
    //   } else {
        
      
    //     this.unfollowUser(users[index]);
    //     this.updateUsersFollowing(index);
    //     //this.getUsers(index,false);
    //     console.log("unfollow user at index " + index);
    //     // this.refreshUsersFollowingList();
    //     // this.$refs.listviewfollowing.refresh();
  
    //   }


      




    // console.log("addFollowUsers " + user);
    //   console.log(user);
    //   //let position = this.selectedItems.indexOf(index);
    //   if (user.following === false) {
    //     user.following = true;

    //     // this.$refs.listviewusers.refresh();
    //     // this.forceRerender();

   
    //     this.followUser(user);
    //     this.refreshUsersFollowingList();
    //   } else {
    //     user.following = false;
   
    //     this.unfollowUser(user);
    //     this.refreshUsersFollowingList();
    //     this.$refs.listviewfollowing.refresh();
    //   }
    },

    toggleFollowingFollower(index) {

    
    //   console.log("addFollowUsers " + event.index);
    //   console.log(this.users[event.index]);
    //   //let position = this.selectedItems.indexOf(index);
    //   if (this.usersFollowing[event.index].following === false) {
    //     this.usersFollowing[event.index].following = true;

    //     // this.$refs.listviewusers.refresh();
    //     // this.forceRerender();

    //     var user = this.users[event.index];
    //     this.followUser(user);
    //     this.refreshUsersList();
    //   } else {
    //     this.usersFollowing[event.index].following = false;
    //     var user = this.usersFollowing[event.index];
    //     this.unfollowUser(user);
    //     this.refreshUsersList();
    //     this.$refs.listviewusers.refresh();
    //   }

    // var index = this.getFollowerIndex(user)
    //   console.log("addFollowUsers " + this.usersFollowing[index]);
    //   console.log(user);

    //   //let position = this.selectedItems.indexOf(index);
    //   if (this.usersFollowing[index].following === false) {
    //     this.usersFollowing[index].following = true;

    //     // this.$refs.listviewusers.refresh();
    //     // this.forceRerender();

    //     this.followUser(user);
    //     this.refreshUsersList();
    //     this.$refs.listviewusers.refresh();
    //   } else {
    //     this.usersFollowing[index].following = false;

    //     this.unfollowUser(user);
    //     this.refreshUsersList();
    //     this.$refs.listviewusers.refresh();
    //   }


              console.log("updated userfollowing at index " + index);

    if (this.usersFollowing[index].following == false) {
        this.usersFollowing[index].following = true;
        this.followUser(this.usersFollowing[index]);
        console.log("followed")
    //this.$forceUpdate();
    }
    else {
        this.usersFollowing[index].following = false;
        this.unfollowUser(this.usersFollowing[index]);
        console.log("unfollowed")
    }},

    // console.log("addFollowUsers " + user);
    //   console.log(user);
    //   //let position = this.selectedItems.indexOf(index);
    //   if (user.following === false) {
    //     user.following = true;

    //     // this.$refs.listviewusers.refresh();
    //     // this.forceRerender();

    
    //     this.followUser(user);
    //     this.refreshUsersList();
    //   } else {
    //     user.following = false;
 
    //     this.unfollowUser(user);
    //     this.refreshUsersList();
    //     this.$refs.listviewusers.refresh();
    //   }
    

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

    getUserIndex(user){

        for (var i = 0; i < this.users.length; i++) {  
        if (this.users[i].userID == user.userID) {
            return i;
        } 

        

        //  for (var i = 0; i < this.$refs.listviewusers.items.length; i++) {  
        // if (this.$refs.listviewusers.items[i].userID == user.userID) {
        //     return i;
        // } 
    }

    },

        getFollowerIndex(user){

        for (var i = 0; i < this.usersFollowing.length; i++) {  
        if (this.usersFollowing[i].userID == user.userID) {
            return i;
        } 
    }

    },


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
    updateUsersFollowing(index) {
        var tempObj = this.users[index]
        tempObj.following = !tempObj.following
         this.$set(this.users, index, tempObj)
    }
  },

  

  data() {
    return {
        dataReady: false,
      index: 0,
      lastDelY: 0,
      headerCollapsed: false,
      selectedTab: 0,
      selectedTabview: 0,
      users: [],
      usersFollowing: [],
    }},

        computed: {
    getUsers: {
      //return this.users;

       // getter
    get: function() {
      return this.users;
    },
    // // setter

    //       set: function(id) {
    //     var role = this.roles.filter(role => role.id === id)[0];
    //     Vue.set(this.form.roles, 0, role);
    //   }
    // set: function(index,following) {
      
    //   Vue.set(this.users, index, .following = following;
     
    // }
    },
       getUsersFollowing: {
          get: function() {
      return this.usersFollowing;
    },
    }


  

  },
};