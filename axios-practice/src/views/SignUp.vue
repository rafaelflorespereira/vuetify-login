<template>
  <v-row justify="center">
    <v-col
      cols="3"
      align="center"
    >
      <form>
        <h1>SignUp Page</h1>
        <v-card
          sm="6"
        >
        <v-card-text>
        <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            :counter="10"
            label="Name"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
            append-outer-icon="mdi-account-circle"
          ></v-text-field>
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
            append-outer-icon="mdi-email"
          ></v-text-field>
          <v-text-field
            v-model="emailConfirm"
            :error-messages="emailConfirmErrors"
            label="Confirm E-mail"
            required
            @input="$v.emailConfirm.$touch()"
            @blur="$v.emailConfirm.$touch()"
            append-outer-icon="mdi-email"
          ></v-text-field>
          <v-text-field
            label="Password"
            :error-messages="passwordErrors"
            required
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
            append-outer-icon="mdi-key"
          ></v-text-field>
          <v-text-field
            label="Confirm Password"
            :error-messages="passwordConfirmErrors"
            required
            @input="$v.passwordConfirm.$touch()"
            @blur="$v.passwordConfirm.$touch()"
            append-outer-icon="mdi-key"
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
          ></v-checkbox>
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
          </v-card-text>
        </v-card>
      </form>
    </v-col>
  </v-row>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email, sameAs, minLength, alphaNum } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    emailConfirm: { required, email, sameAsEmail: sameAs('email') },
    password: { required, minLength: minLength(8), alphaNum },
    passwordConfirm: { sameAsPassword: sameAs('password') },
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
    emailConfirm: '',
    password: '',
    passwordConfirm: '',
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
    emailConfirmErrors () {
      const errors = []
      if (!this.$v.emailConfirm.$dirty) return errors
      !this.$v.emailConfirm.email && errors.push('Must be valid e-mail')
      !this.$v.emailConfirm.required && errors.push('E-mail is required')
      !this.$v.emailConfirm.sameAsEmail && errors.push('E-mails must be the same')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required')
      !this.$v.password.minLength && errors.push('Password is 8 characters minimum')
      !this.$v.password.alphaNum && errors.push('Password must have numbers and symbols')
      return errors
    },
    passwordConfirmErrors () {
      const errors = []
      if (!this.$v.passwordConfirm.$dirty) return errors
      !this.$v.passwordConfirm.sameAsPassword && errors.push('Passwords must match')
      return errors
    }
  },

  methods: {
    submit () {
      this.$v.$touch()
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.emailConfirm = ''
      this.password = ''
      this.passwordConfirm = ''
      this.select = null
      this.checkbox = false
    }
  }
}
</script>
