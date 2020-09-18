<template>
  <v-row justify-lg="start" justify-md="center">
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
    <v-snackbar
      v-model="snackbar.toggle"
      absolute
    >
    {{ snackbar.msg }}
      <v-btn text color="primary" @click.native="snackbar.toggle = false">Close</v-btn>
    </v-snackbar>
  </v-row>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      headers: [
        {
          text: 'Name',
          value: 'name',
          align: 'start'
        },
        {
          text: 'E-mail',
          value: 'email',
          align: 'start'
        },
        {
          text: 'Password',
          value: 'password',
          align: 'start'
        }
      ],
      users: [],
      snackbar: {
        toggle: false,
        msg: ''
      }
    }
  },
  created () {
    axios.get('https://vuejs-stock-trader-8b558.firebaseio.com/users.json')
      .then(response => {
        for (const key in response.data) {
          const user = response.data[key]
          this.users.push(user[0])
        }
      })
      .catch(errors => console.log(errors))
  },
  methods: {
    selectRow (event) {
      this.snackbar.toggle = !this.snackbar.toggle
      this.snackbar.msg = `You clicked on ${event.name}`
    }
  }
}
</script>
