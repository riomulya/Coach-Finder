<template>
  <li>
    From :<a :href="emailRequestLink"> {{ userEmail }}</a>
    <p>To : {{ coachName }}</p>
    <h4>Message :</h4>
    <p>{{ message }}</p>
  </li>
</template>

<script>
export default {
  props: ['id', 'userEmail', 'message', 'coachName'],
  computed: {
    emailRequestLink() {
      return 'mailto:' + this.userEmail;
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
