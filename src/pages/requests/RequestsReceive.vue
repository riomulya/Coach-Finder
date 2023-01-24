<template>
  <section>
    <base-card>
      <div v-if="!requestsIsEmpty">
        <header>
          <h2>Requests Received</h2>
        </header>
        <ul>
          <requests-item
            v-for="req in requests"
            :key="req.id"
            :id="req.id"
            :coachName="setCoachName(req.coachId)"
            :message="req.message"
            :userEmail="req.userEmail"
          >
          </requests-item>
        </ul>
      </div>
      <h3 v-if="requestsIsEmpty">You Haven't Received Any Requests</h3>
    </base-card>
  </section>
</template>

<script>
import RequestsItem from '../../components/requests/RequestsItem.vue';

export default {
  components: {
    RequestsItem,
  },
  data() {
    return {};
  },
  computed: {
    coaches() {
      return this.$store.getters['coaches/coaches'];
    },
    requests() {
      return this.$store.getters['requests/requests'];
    },
    requestsIsEmpty() {
      if (this.requests.length === 0) {
        return true;
      }
      return false;
    },
    message() {
      return this.coaches.message;
    },
  },
  methods: {
    setCoachName(coachId) {
      const filteredCoach = this.coaches.find((coach) => coach.id === coachId);
      return filteredCoach.firstName + ' ' + filteredCoach.lastName;
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
