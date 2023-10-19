<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import JobTable from '@/components/JobTable.vue';
  import config from '@@/config/index.ts';
  const fetchGreeting = async () => {
    const response = await fetch(`${config.API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: `query { greeting }` }),
    });
    const { data } = await response.json();
    return data.greeting;
  };
  const fetchJobs = async () => {
    const response = await fetch(`${config.API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `query { jobs { id, title, company, description } }`,
      }),
    });
    const { data } = await response.json();
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
