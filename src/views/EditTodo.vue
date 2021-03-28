<template>
  <div class="d-flex justify-center flex-grow-1 pa-0">
    <v-container
      class="d-flex justify-center align-center flex-column"
      style="position: relative"
    >
      <v-col md="12" style="max-width: 400px">
        <v-row justify="end" no-gutters>
          <v-col md="12">
            <v-form ref="form" v-model="valid">
              <h2 class="text-h5 font-weight-black my-8">New Task</h2>
              <h2 class="text-body-2 font-weight-black ml-4 mb-2">Task Name</h2>
              <v-text-field
                v-model="name"
                :rules="nameRules"
                required
                label="What are you going to do?"
                placeholder="What are you going to do?"
                solo
              ></v-text-field>
              <h2 class="text-body-2 font-weight-black ml-4 mb-2">
                Description
              </h2>
              <v-text-field
                v-model="description"
                :rules="descriptionRules"
                required
                label="Add a description"
                placeholder="Add a description"
                solo
              ></v-text-field>
              <h2 class="text-body-2 font-weight-black ml-4 mb-2">
                Created at
              </h2>
              <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    :rules="dateRules"
                    required
                    label="Select a date for your task"
                    placeholder="Select a date for your task"
                    append-icon="mdi-calendar"
                    solo
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" :min="min" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.dialog.save(date)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
              <h2 class="text-body-2 font-weight-black ml-4 mb-2">Type</h2>
              <v-select
                v-model="type"
                :rules="typeRules"
                required
                :items="types"
                label="Select a type for your task"
                solo
              ></v-select>
              <h2 class="text-body-2 font-weight-black ml-4 mb-2">Status</h2>
              <v-radio-group v-model="status" row required>
                <v-radio label="Completed" value="true"></v-radio>
                <v-radio label="Pending" value="false"></v-radio>
              </v-radio-group>
            </v-form>
          </v-col>
          <v-btn depressed class="pa-6 round" @click="remove">
            <v-icon left dark> mdi-delete </v-icon> Remove
          </v-btn>
          <v-btn
            depressed
            color="primary"
            class="pa-6 round"
            @click="submit"
            :disabled="!valid"
            ><v-icon left dark> mdi-plus </v-icon> Save
          </v-btn>
        </v-row>
      </v-col>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";

import { Todo } from "../types";
import { Today } from "../utils/date";
import * as store from "../utils/localStorage";

export default Vue.extend({
  data: () => ({
    modal: false,
    // form
    valid: false,
    id: "",
    name: "",
    description: "",
    date: Today(),
    min: Today(),
    type: "",
    status: "false",
    types: ["Personal", "School", "Work"],
    nameRules: [
      (v: string) => !!v || "Name is required",
      (v: string) => v.length >= 5 || "Name must be at least 5 characters long",
    ],
    descriptionRules: [
      (v: string) => !!v || "Description is required",
      (v: string) =>
        v.length >= 10 || "Description must be at least 10 characters long",
    ],
    dateRules: [(v: string) => !!v || "Created at is required"],
    typeRules: [(v: string) => !!v || "Type is required"],
  }),
  methods: {
    fetchData() {
      const { id } = this.$route.params;
      const todos = store.Get();
      const findTodo = todos.find((i) => i.id === id);
      if (findTodo) {
        this.id = findTodo.id;
        this.name = findTodo.name;
        this.description = findTodo.description;
        this.date = findTodo.date;
        this.status = findTodo.status;
        this.type = findTodo.type;
      }
    },
    submit() {
      const { name, description, type, date, status, id } = this;
      const todo: Todo = {
        id,
        name,
        description,
        type,
        date,
        status,
      };
      store.Update(todo);
      this.$router.push("/");
    },
    remove() {
      const { id } = this;
      store.Remove(id);
      this.$router.push("/");
    },
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData",
  },
});
</script>
