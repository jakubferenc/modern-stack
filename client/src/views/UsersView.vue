<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import UsersTable from '@/components/UsersTable.vue';
  import config from '@@/config/index.ts';

  const fetchUsers = async () => {
    const response = await fetch(`${config.API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `query { users { id, username, password, date } }`,
      }),
    });
    const { data } = await response.json();
    return data.users;
  };
  const users = ref([]);
  onMounted(async () => {
    users.value = await fetchUsers();
  });
</script>

<template>
  <h1>Users</h1>
  <UsersTable v-if="users" :users="users" />
</template>

<style scoped></style>
