<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ errors: !email.isValid }">
      <label for="email">Your E-mail</label>
      <input
        type="email"
        id="email"
        @change="clearValidity('email')"
        v-model="email.val"
      />
    </div>
    <div class="form-control" :class="{ errors: !message.isValid }">
      <label for="message">Message</label>
      <textarea
        id="message"
        rows="5"
        @change="clearValidity('message')"
        v-model="message.val"
      ></textarea>
    </div>
    <div class="errors" v-if="!formIsValid">
      <p>Please Enter a Valid E-mail and not empty Message.</p>
    </div>
    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: { val: '', isValid: true },
      message: { val: '', isValid: true },
      formIsValid: true,
    };
  },
  computed: {
    requests() {
      return this.$store.getters['requests/requests'];
    },
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
      if (this.email.isValid && this.message.isValid) {
        this.formIsValid = true;
      }
    },
    formValidity() {
      if (!this.email.val && !this.email.val.includes('@')) {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (!this.message.val) {
        this.message.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.formValidity();
      if (!this.formIsValid) {
        return;
      }
      this.$store.dispatch('requests/contactCoach', {
        email: this.email.val,
        message: this.message.val,
        coachId: this.$route.params.id,
      });
      this.$router.replace('/');
      console.log(this.requests);
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
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
.errors input,
.errors textarea {
  border: 1px solid red;
}

.actions {
  text-align: center;
}
</style>
