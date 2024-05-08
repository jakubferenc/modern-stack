<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import JobDetail from '@/components/JobDetail.vue';
  import ApiService from '../services/api.service';

  const props = defineProps({
    id: {
      type: String,
      required: true,
    },
  });
  const fetchJob = async () => {
    const response = await ApiService.post(`/graphql`, {
      query: `query { job(id: "${props.id}") { id, title, company, description, date } }`,
    });
    const { data } = await response.json();
    return data.job;
  };
  const job = ref(null);
  onMounted(async () => {
    job.value = await fetchJob();
  });
</script>

<template>
  <h1>Job detail id #{{ id }}</h1>
  <JobDetail v-if="job" :job="job" />
  <p v-else>Job does not exist...</p>
</template>

<style scoped></style>
