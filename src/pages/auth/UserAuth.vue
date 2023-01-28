<template>
  <div>
    <base-dialog
      :show="!!error"
      @close="handleError"
      title="An error occured"
      >{{ error }}</base-dialog
    >
    <base-dialog :show="isLoading" fixed title="Authenticating...">
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitData">
        <div class="form-control" :class="{ errors: !formIsValid }">
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control" :class="{ errors: !formIsValid }">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <transition name="confirm" :class="{ errors: !formIsValid }">
          <div class="form-control" v-if="authMode === 'signup'">
            <label for="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              v-model.trim="confirmPassword"
            />
          </div>
        </transition>
        <base-button>{{ setAuthStr }}</base-button>
        <base-button type="button" mode="outline" @click="switchAuthMode">{{
          setSwitchAuthStr
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      authMode: 'login',
      switchAuth: 'signup',
      formIsValid: true,
      isLoading: false,
      error: null,
    };
  },
  computed: {
    setSwitchAuthStr() {
      const str = this.switchAuth;
      return str.charAt(0).toLocaleUpperCase() + str.slice(1) + ' ' + 'Instead';
    },
    setAuthStr() {
      const str = this.authMode;
      return str.charAt(0).toLocaleUpperCase() + str.slice(1);
    },
  },
  methods: {
    async submitData() {
      if (this.authMode === 'login') {
        this.submitLogin();
      } else {
        this.submitSignUp();
      }
    },
    switchAuthMode() {
      if (this.authMode === 'login') {
        this.authMode = 'signup';
        this.switchAuth = 'login';
      } else {
        this.authMode = 'login';
        this.switchAuth = 'signup';
      }
    },
    async submitLogin() {
      this.isLoading = true;
      this.formIsValid = true;
      if (
        !this.email ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }
      try {
        await this.$store.dispatch('signIn', {
          email: this.email,
          password: this.password,
        });
      } catch (error) {
        this.error = error.message;
      }
      this.email = '';
      this.password = '';
      this.isLoading = false;
    },
    async submitSignUp() {
      this.formIsValid = true;
      this.isLoading = true;
      if (
        !this.email ||
        !this.email.includes('@') ||
        this.password.length < 6 ||
        this.confirmPassword < 6 ||
        this.password !== this.confirmPassword
      ) {
        this.formIsValid = false;
        return;
      }
      try {
        await this.$store.dispatch('signUp', {
          email: this.email,
          password: this.password,
        });
      } catch (error) {
        this.error = error.message;
      }
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  color: red;
}
.errors input {
  border: 1px solid red;
}

.confirm-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.confirm-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.confirm-enter-active {
  transition: all 0.6s ease-out;
}
.confirm-leave-active {
  transition: all 0.5s ease-in;
}

.confirm-enter-to,
.confirm-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
