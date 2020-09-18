<template>
<v-row justify="center">
  <v-col
      cols="3"
      align="center">
    <form>
      <h1>Login Page</h1>
      <v-card>
      <v-card-text>
      <v-text-field
          v-model="name"
          :error-messages="nameErrors"
          :counter="10"
          label="Name"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
          prepend-icon="mdi-account-circle"
        ></v-text-field>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
          prepend-icon="mdi-email"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="password"
          :error-messages="passwordErrors"
          :type="passwordType"
          prepend-icon="mdi-key"
          :append-outer-icon="eyeIcon"
          @click:append-outer="togglePasswordVisible"
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
          required
        ></v-text-field>
        <v-select
          v-model="select"
          :items="items"
          :error-messages="selectErrors"
          label="Item"
          required
          @change="$v.select.$touch()"
          @blur="$v.select.$touch()"
        ></v-select>
        <v-checkbox
          v-model="checkbox"
          :error-messages="checkboxErrors"
          label="Do you agree?"
          required
          @change="$v.checkbox.$touch()"
          @blur="$v.checkbox.$touch()"
        ></v-checkbox >
        <v-row justify="space-between">
        <v-btn
            @click="submit"
            color="success"
          >
            submit
          </v-btn>
          <v-btn
            @click="clear"
            color="error"
          >
            clear
            </v-btn>
          <v-btn color="secondary" to="/sign-up" outlined>Sign Up?</v-btn>
        </v-row>
        </v-card-text>
      </v-card>
    </form>
    <v-snackbar
      v-model="isUserId"
    >
      <v-btn text color="primary" @click.native="isUserId = false">Close</v-btn>
    </v-snackbar>
  </v-col>
</v-row>

</template>

<script>
import { mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, maxLength, email, minLength, alphaNum } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    password: { required, minLength: minLength(8), alphaNum },
    select: { required },
    checkbox: {
      checked (val) {
        return val
      }
    }
  },

  data: () => ({
    name: '',
    email: '',
    password: '',
    passwordType: 'password',
    eyeIcon: 'mdi-eye-off',
    select: null,
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4'
    ],
    checkbox: false
  }),

  computed: {
    checkboxErrors () {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('You must agree to continue!')
      return errors
    },
    selectErrors () {
      const errors = []
      if (!this.$v.select.$dirty) return errors
      !this.$v.select.required && errors.push('Item is required')
      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('Password is 8 characters minimum')
      !this.$v.password.alphaNum && errors.push('Password must have numbers and symbols')
      !this.$v.password.required && errors.push('Password is required')
      return errors
    },
    isUserId () {
      return !!this.$store.getters.userId
    }
  },

  methods: {
    ...mapActions([
      'login'
    ]),
    submit () {
      this.$v.$touch()
      this.login({ email: this.email, password: this.password })
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.select = null
      this.checkbox = false
    },
    togglePasswordVisible () {
      if (this.passwordType === 'password') {
        this.passwordType = 'text'
        this.eyeIcon = 'mdi-eye'
      } else {
        this.passwordType = 'password'
        this.eyeIcon = 'mdi-eye-off'
      }
    }
  }
}
</script>
