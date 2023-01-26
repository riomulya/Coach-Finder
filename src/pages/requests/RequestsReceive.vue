<template>
  <section>
    <base-dialog
      :show="!!error"
      title="Failed to Fetch Request"
      @close="handleError"
      >{{ error }}</base-dialog
    >
    <base-card>
      <base-spinner v-if="isLoading"></base-spinner>
      <div v-else-if="hasRequests">
        <header>
          <h2>Requests Received</h2>
        </header>
        <ul>
          <requests-item
            v-for="req in requests"
            :key="req.id"
            :id="req.id"
            :message="req.message"
            :userEmail="req.userEmail"
          >
          </requests-item>
        </ul>
      </div>
      <h3 v-else-if="!hasRequests">You Haven't Received Any Requests</h3>
    </base-card>
  </section>
</template>

<script>
import RequestsItem from '../../components/requests/RequestsItem.vue';

export default {
  data() {
    return {
      error: null,
      isLoading: false,
    };
  },
  components: {
    RequestsItem,
  },
  computed: {
    coaches() {
      return this.$store.getters['coaches/coaches'];
    },
    requests() {
      return this.$store.getters['requests/requests'];
    },
    hasRequests() {
      return !this.isLoading && this.$store.getters['requests/hasRequests'];
    },
    message() {
      return this.requests.message;
    },
  },
  created() {
    this.loadRequests();
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/fetchRequests');
      } catch (error) {
        this.error = error.message;
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
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
