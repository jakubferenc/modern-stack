<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import UsersTable from '@/components/UsersTable.vue';
  import ApiService from '../services/api.service';

  const fetchUsers = async () => {
    const response = await ApiService.post(`/graphql`, {
      query: `query { users { id, username, password, date } }`,
    });
    const { data } = response;
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
