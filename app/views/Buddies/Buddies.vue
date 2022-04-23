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
        <!-- <ScrollView>   
          <ListView
                  ref="listviewfollowing"
                  for="user in usersFollowing"
                  
                  backgroundColor="transparent"
                >
                  <v-template>
                    <buddySummary
                      :user="user"
                      :following="user.following"
                      @clicked="showUser(user)"
                      @toggle="toggleFollowingFollower(user)"
                    />
       
                  </v-template>
                </ListView>
              
     
        </ScrollView> -->

                                <ScrollView>
          <StackLayout

      
          >
            <buddySummary :v-if="dataReady"
              ref="listviewfollowing"
                                    :user="user"
                      :following="user.following"

            v-for="(user, index) in getUsersFollowing"
                  v-bind:key="index" 
             
              @toggle="toggleFollowingFollower(index)"
            />
          </StackLayout>

     
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
                <!-- <ListView
                  ref="listviewusers"
                  for="user in users"            
                  
                  backgroundColor="transparent"
                >
                  <v-template>
                    <buddySummary
                      :user="user"
                      :following="user.following"
                      @clicked="showUser(user)"
                      @toggle="toggleFollowingUser(user)"
                    />
              
                  </v-template>
                </ListView> -->

                        <ScrollView>
          <StackLayout

      
          >
            <buddySummary :v-if="dataReady"
              ref="listviewusers"
                                    :user="user"
                      :following="user.following"

            v-for="(user, index) in getUsers"
                  v-bind:key="index" 
             
              @toggle="toggleFollowingUser(index)"
            />
          </StackLayout>

     
        </ScrollView>
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
import Buddies from "./Buddies.js";

import {
  Frame,
  Color,
  isIOS,
  Http,
  ApplicationSettings,
} from "@nativescript/core";

export default {
  mixins: [Buddies],
  components: { navBottom, buddySummary, buddyDetail },
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
