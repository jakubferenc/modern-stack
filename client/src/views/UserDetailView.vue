<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import UserDetail from '@/components/UserDetail.vue';
  import config from '@@/config/index.ts';
  const props = defineProps({
    id: {
      type: String,
      required: true,
    },
  });
  const fetchData = async () => {
    const response = await fetch(`${config.API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `query { user(id: "${props.id}") { id, username, password, date } }`,
      }),
    });
    const { data } = await response.json();
    return data.user;
  };
  const user = ref(null);
  onMounted(async () => {
    user.value = await fetchData();
  });
</script>

<template>
  <h1>User detail id #{{ id }}</h1>
  <UserDetail v-if="user" :user="user" />
  <p v-else>Job does not exist...</p>
</template>

<style scoped></style>
