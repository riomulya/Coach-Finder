<template>
  <form @submit.prevent="submitData">
    <div class="form-control">
      <label for="firstname">First name</label>
      <input type="text" id="firstname" v-model="firstname" />
    </div>
    <div class="form-control">
      <label for="lastname">Last name</label>
      <input type="text" id="lastname" v-model="lastname" />
    </div>
    <div class="form-control">
      <label for="description">Description</label>
      <textarea
        name="description"
        id="description"
        rows="5"
        v-model="description"
      ></textarea>
    </div>
    <div class="form-control">
      <label for="rate">Hourly Rate</label>
      <input type="number" id="rate" v-model.number="rate" />
    </div>
    <div class="form-control">
      <h3>Area of Expertise</h3>
      <div>
        <input
          type="checkbox"
          name="frontend"
          id="frontend"
          value="frontend"
          v-model="areas"
        />
        <label for="frontend">Front End Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="backend"
          id="backend"
          value="backend"
          v-model="areas"
        />
        <label for="backend">Back End Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="career"
          id="career"
          value="career"
          v-model="areas"
        />
        <label for="career">Career Advisory</label>
      </div>
    </div>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  //   props: ['firstName', 'lastName', 'description', 'areas', 'hourlyRate'],
  data() {
    return {
      firstname: '',
      lastname: '',
      description: '',
      rate: null,
      areas: [],
    };
  },
  computed: {
    coaches() {
      return this.$store.getters('/coaches/coaches');
    },
  },
  methods: {
    submitData() {
      const newData = {
        first: this.firstname,
        last: this.lastname,
        desc: this.description,
        rate: this.rate,
        areas: this.areas,
      };
      this.$emit('save-data', newData);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
