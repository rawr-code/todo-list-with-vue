<template>
  <div class="d-flex justify-center flex-grow-1 pa-0">
    <v-container
      class="d-flex justify-center align-center flex-column"
      style="position: relative"
    >
      <v-col md="12" style="max-width: 400px">
        <v-row justify="center" no-gutters>
          <v-col md="12">
            <h2 class="text-h5 font-weight-black my-8">
              All for today - {{ picker }}
            </h2>
            <todo-item
              v-for="todo in todos"
              :key="todo.id"
              :name="todo.name"
              :description="todo.description"
              :status="todo.status"
              :type="todo.type"
              :click="goToEditTodo(todo.id)"
            />
            <p
              v-if="!todos.length"
              class="text-h6 font-italic font-weight-regular"
            >
              Ups, there is not more tasks
            </p>
          </v-col>
        </v-row>
        <v-fab-transition>
          <router-link to="/todos/new">
            <v-btn
              v-show="true"
              color="primary"
              elevation="2"
              fab
              dark
              absolute
              right
              style="bottom: 28px"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </router-link>
        </v-fab-transition>
      </v-col>
    </v-container>
    <v-divider vertical />
    <div>
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant.sync="mini"
        permanent
        style="background-color: transparent"
        :style="!mini && 'width:450px'"
      >
        <v-list-item class="px-2 pt-6 mb-6" :class="!mini && 'px-8'">
          <v-list-item-avatar class="mr-2">
            <v-icon size="32">mdi-calendar</v-icon>
          </v-list-item-avatar>

          <v-list-item-title>
            <h2 class="text-h5 font-weight-black">Calendar</h2>
          </v-list-item-title>

          <v-btn icon @click.stop="mini = !mini">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>
        <v-row justify="center" v-if="!mini">
          <v-date-picker
            v-model="picker"
            elevation="2"
            :show-current="picker"
          ></v-date-picker>
        </v-row>
      </v-navigation-drawer>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import TodoItem from "@/components/TodoItem.vue";

import { Todo } from "../types";
import { Today } from "../utils/date";
import * as store from "../utils/localStorage";

export default Vue.extend({
  components: {
    TodoItem,
  },
  data: () => ({
    drawer: true,
    todos: [] as Todo[],
    mini: true,
    picker: Today(),
  }),
  methods: {
    goToEditTodo: function (id: string) {
      const router = this.$router;
      return function () {
        router.push({
          name: "EditTodo",
          params: {
            id,
          },
        });
      };
    },
    findTodos: function (date: string) {
      const todos = store.Get();
      return todos.filter((i) => i.date === date);
    },
    filterTodos: function () {
      const { type } = this.$route.params;
      const todos = store.Get();
      if (type) {
        const newTodos = todos.filter((i) => i.type === type);
        this.todos = newTodos;
      } else {
        this.todos = todos;
      }
    },
  },
  created: function () {
    this.filterTodos();
  },
  watch: {
    $route: "filterTodos",
    picker(date: string) {
      const filterTodos = this.findTodos(date);
      this.todos = filterTodos;
    },
  },
});
</script>

<style scoped>
.v-picker {
  border-radius: 1rem !important;
}
</style>
