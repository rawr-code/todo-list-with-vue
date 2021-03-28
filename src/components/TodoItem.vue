<template>
  <v-card
    class="pa-4 d-flex mb-4 todoItem flex-grow-1"
    elevation="4"
    @click="click"
  >
    <v-radio-group v-model="status" readonly hide-details="true">
      <v-radio color="blue" value="true" readonly></v-radio>
    </v-radio-group>
    <div class="d-flex flex-column flex-grow-1">
      <p class="text-body-2 mb-0 black--text font-weight-medium">
        {{ name }}
      </p>
      <p class="text-caption mb-0 font-italic">{{ description }}</p>
    </div>
    <v-icon v-if="type === 'Personal'" class="mr-1" size="24">
      mdi-account
    </v-icon>
    <v-icon v-else-if="type === 'School'" class="mr-1" size="24">
      mdi-home
    </v-icon>
    <v-icon v-else-if="type === 'Work'" class="mr-1" size="24">mdi-card</v-icon>
  </v-card>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";

export default Vue.extend({
  name: "TodoItem",
  props: {
    name: String,
    description: String,
    type: String,
    status: String,
    click: Function,
  },
});
</script>

<style>
.todoItem {
  border-radius: 1rem !important;
}
.todoItem :hover {
  cursor: pointer;
}

.todoItem .v-input {
  padding: 0;
  margin: 0;
  margin-right: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.todoItem .v-input .v-input__control .v-input__slot {
  padding: 0 !important;
}
</style>
