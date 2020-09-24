<template>
  <v-row align="center" justify="center">
    <v-col md="8" lg="6">
      <h1>Dashboard</h1>
      <v-data-table
        :headers="headers"
        :items="users"
        :items-per-page="5"
        class="elevation-1"
        @click:row="selectRow"
      ></v-data-table>
    </v-col>
    <v-snackbar v-model="snackbar.toggle" absolute>
      {{ snackbar.msg }}
      <v-btn text color="primary" @click.native="snackbar.toggle = false">Close</v-btn>
    </v-snackbar>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Name",
          value: "name",
          align: "start"
        },
        {
          text: "E-mail",
          value: "email",
          align: "start"
        },
        {
          text: "Password",
          value: "password",
          align: "start"
        }
      ],
      snackbar: {
        toggle: false,
        msg: ""
      }
    };
  },
  mounted() {
    //fetch users from server store on local
    this.$store.dispatch("fetchUsers");
  },
  computed: {
    //get from local
    users() {
      return this.$store.getters.users;
    }
  },
  methods: {
    selectRow(event) {
      this.snackbar.toggle = !this.snackbar.toggle;
      this.snackbar.msg = `You clicked on ${event.name}`;
    }
  }
};
</script>
