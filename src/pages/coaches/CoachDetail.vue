<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out Now!!!</h2>
          <base-button
            link
            :to="contactLink"
            v-if="contactDisplay"
            @click="setDisplay"
            >Contact</base-button
          >
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script lang="js">
export default {
  data() {
    return {
      contactDisplay:true,
      selectedCoach: null,
    };
  },
  props: ['id'],
  computed: {
    contactLink() {
      return this.$route.path + '/contact';
    },
    fullName() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    areas() {
      return this.selectedCoach.areas;
    },
    description() {
      return this.selectedCoach.description;
    },
  },
  created() {
    this.selectedCoach = this.$store.getters['coaches/coaches'].find(
      (coach) => coach.id === this.id
    );
  },
  methods:{
    setDisplay(){
      this.contactDisplay = !this.contactDisplay
    }
  }
};
</script>
