<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import JobTable from '@/components/JobTable.vue';
  import ApiService from '../services/api.service';

  const fetchJobs = async () => {
    const response = await ApiService.post(`/graphql`, {
      query: `query { jobs { id, title, company, description, date } }`,
    });
    const { data } = response;
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
