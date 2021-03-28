<template>
  <div>
    <v-card
      color="grey lighten-4"
      flat
      tile
      style="position: relative; z-index: 100"
    >
      <v-toolbar>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer">
          <v-icon v-if="!drawer">mdi-menu</v-icon>
          <v-icon v-else>mdi-close</v-icon>
        </v-app-bar-nav-icon>
        <router-link to="/">
          <v-toolbar-title class="font-weight-black black--text">
            My Task List
          </v-toolbar-title>
        </router-link>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-badge color="pink" content="3" overlap>
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>

        <v-btn icon>
          <v-avatar size="36">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
        </v-btn>
      </v-toolbar>
    </v-card>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      hide-overlay
      class="pt-16"
    >
      <v-list nav dense class="pa-0">
        <h2 class="text-h6 font-weight-black mx-6 my-4">Collections</h2>
        <v-list-item-group
          v-model="group"
          active-class="deep-blue--text text--accent-4"
        >
          <router-link
            :to="'/' + nawItem.type"
            v-for="nawItem in navItems"
            :key="nawItem.title"
          >
            <v-list-item class="py-2 pl-6 mb-0">
              <v-avatar
                tile
                :color="nawItem.color"
                size="32"
                class="rounded-lg mr-5"
              >
                <v-icon dark size="20"> mdi-{{ nawItem.icon }} </v-icon>
              </v-avatar>
              <v-list-item-title>
                <h2 class="text-body-1 font-weight-black">
                  {{ nawItem.title }}
                </h2>
              </v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";

export default Vue.extend({
  data: () => ({
    drawer: false,
    group: null,
    navItems: [
      {
        icon: "grid",
        title: "All tasks",
        color: "blue",
        type: "",
      },
      {
        icon: "account",
        title: "Personal",
        color: "yellow",
        type: "Personal",
      },
      {
        icon: "home",
        title: "School",
        color: "red",
        type: "School",
      },
      {
        icon: "card",
        title: "Work",
        color: "brown",
        type: "Work",
      },
    ],
  }),
});
</script>

<style scoped>
* {
  text-decoration: none;
}
</style>
