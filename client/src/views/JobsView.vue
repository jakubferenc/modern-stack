<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import JobTable from '@/components/JobTable.vue';
  import config from '@@/config/index.ts';

  const fetchJobs = async () => {
    const response = await fetch(`${config.API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `query { jobs { id, title, company, description, date } }`,
      }),
    });
    const { data } = await response.json();
    return data.jobs;
  };
  const jobs = ref([]);
  onMounted(async () => {
    jobs.value = await fetchJobs();
  });
</script>

<template>
  <h1>Jobs</h1>
  <JobTable v-if="jobs" :jobs="jobs" />
</template>

<style scoped></style>
