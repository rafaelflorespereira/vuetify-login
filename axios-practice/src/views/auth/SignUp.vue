<template>
  <v-row justify="center">
    <v-col cols="12" sm="6" md="4" lg="2" align="center" justify="center">
      <form>
        <h1>SignUp Page</h1>
        <v-card elevation="12">
          <v-card-text>
            <!-- Name -->
            <v-text-field
              v-model="name"
              :error-messages="nameErrors"
              :counter="32"
              label="Name"
              required
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
              prepend-icon="mdi-account-circle"
            ></v-text-field>
            <!-- E-mail -->
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
              v-model="emailConfirm"
              :error-messages="emailConfirmErrors"
              label="Confirm E-mail"
              required
              @input="$v.emailConfirm.$touch()"
              @blur="$v.emailConfirm.$touch()"
              prepend-icon="mdi-email"
            ></v-text-field>
            <!-- Password -->
            <v-text-field
              label="Password"
              v-model="password"
              :type="passwordType"
              prepend-icon="mdi-key"
              :append-outer-icon="eyeIcon"
              :error-messages="passwordErrors"
              @click:append-outer="togglePasswordVisible"
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
              required
            ></v-text-field>
            <v-text-field
              label="Confirm Password"
              v-model="passwordConfirm"
              :type="passwordType"
              :error-messages="passwordConfirmErrors"
              prepend-icon="mdi-key"
              :append-outer-icon="eyeIcon"
              @input="$v.passwordConfirm.$touch()"
              @blur="$v.passwordConfirm.$touch()"
              @click:append-outer="togglePasswordVisible"
              required
            ></v-text-field>
            <!-- Country -->
            <v-autocomplete
              v-model="model"
              :hint="
                !isEditing ? 'Click the icon to edit' : 'Click the icon to save'
              "
              :items="countries"
              :readonly="!isEditing"
              :label="`Country — ${isEditing ? 'Editable' : 'Readonly'}`"
              persistent-hint
              prepend-icon="mdi-map"
            >
              <template v-slot:append-outer>
                <v-slide-x-reverse-transition mode="out-in">
                  <v-icon
                    :key="`icon-${isEditing}`"
                    :color="isEditing ? 'success' : 'info'"
                    @click="isEditing = !isEditing"
                    v-text="
                      isEditing
                        ? 'mdi-check-outline'
                        : 'mdi-circle-edit-outline'
                    "
                  ></v-icon>
                </v-slide-x-reverse-transition>
              </template>
            </v-autocomplete>

            <v-checkbox
              v-model="checkbox"
              :error-messages="checkboxErrors"
              label="Do you agree?"
              required
              @change="$v.checkbox.$touch()"
              @blur="$v.checkbox.$touch()"
            ></v-checkbox>
            <v-row justify="space-around">
              <v-btn @click="submit" color="success">
                submit
              </v-btn>
              <v-btn @click="clear" color="error">
                clear
              </v-btn>
              <v-btn color="secondary" outlined to="/sign-In">Sign in</v-btn>
            </v-row>
          </v-card-text>
        </v-card>
      </form>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  email,
  sameAs,
  minLength,
  alphaNum
} from "vuelidate/lib/validators";
import countries from "../../data/countries";
export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(32) },
    email: { required, email },
    emailConfirm: { sameAsEmail: sameAs("email") },
    password: { required, minLength: minLength(8), alphaNum },
    passwordConfirm: { sameAsPassword: sameAs("password") },
    birthday: { required },
    select: { required },
    checkbox: {
      checked(val) {
        return val;
      }
    }
  },

  data: () => ({
    name: "",
    birthday: "",
    email: "",
    emailConfirm: "",
    password: "",
    passwordConfirm: "",
    select: null,
    passwordType: "password",
    eyeIcon: "mdi-eye-off",
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false
  }),

  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("Item is required");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 32 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    emailConfirmErrors() {
      const errors = [];
      if (!this.$v.emailConfirm.$dirty) return errors;
      !this.$v.emailConfirm.sameAsEmail && errors.push("E-mails must match");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Password is 8 characters minimum");
      !this.$v.password.alphaNum &&
        errors.push("Password must have numbers and symbols");
      !this.$v.password.required && errors.push("Password is required");
      return errors;
    },
    passwordConfirmErrors() {
      const errors = [];
      if (!this.$v.passwordConfirm.$dirty) return errors;
      !this.$v.passwordConfirm.sameAsPassword &&
        errors.push("Passwords must match");
      return errors;
    },
    barthdayErrors() {
      const errors = [];
      if (!this.$v.birthday.$dirty) return errors;
      !this.$v.birthday.required ||
        errors.push("Select Birthday from the Calendar Below");
      return errors;
    }
  },

  methods: {
    ...mapActions(["signUp"]),
    submit() {
      this.$v.$touch();
      // this.$store.dispatch
      this.signUp({
        name: this.name,
        email: this.email,
        password: this.password
      });
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.emailConfirm = "";
      this.password = "";
      this.passwordConfirm = "";
      this.select = null;
      this.checkbox = false;
    },
    togglePasswordVisible() {
      if (this.passwordType === "password") {
        this.passwordType = "text";
        this.eyeIcon = "mdi-eye";
      } else {
        this.passwordType = "password";
        this.eyeIcon = "mdi-eye-off";
      }
    }
  },

  mounted: {
    countries() {
      return countries;
    }
  }
};
</script>
