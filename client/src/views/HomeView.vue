<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import JobTable from '@/components/JobTable.vue';
  import apiService from '../services/api.service';

  const fetchGreeting = async () => {
    const response = await apiService.post(`/graphql`, {
      query: `query { greeting }`,
    });
    const { data } = response;
    return data.greeting;
  };
  const fetchJobs = async () => {
    const { data } = await apiService.post(`/graphql`, {
      query: `query { jobs { id, title, company, description, date } }`,
    });
    return data.jobs;
  };
  const currentGreeting = ref('');
  const jobs = ref([]);
  onMounted(async () => {
    console.log('App is mounted!');
    currentGreeting.value = await fetchGreeting();
    jobs.value = await fetchJobs();
    console.log(`this is graphql response: ${currentGreeting.value}`);
  });
</script>

<template>
  <h1>Greetings is: {{ currentGreeting }}</h1>

  <JobTable v-if="jobs" :jobs="jobs" />
</template>

<style scoped>
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
</style>
