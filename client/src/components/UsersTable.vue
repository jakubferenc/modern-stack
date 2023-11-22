<script setup lang="ts">
  import { ref } from 'vue';
  defineProps<{
    users: {
      id: string;
      username: string;
      password: string;
      date: string;
    }[];
  }>();
  const title = ref('Users Table');
</script>

<template>
  <h2>{{ title }}</h2>
  <table v-if="users">
    <thead>
      <tr>
        <th>id</th>
        <th>username</th>
        <th>password</th>
        <th>date</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users">
        <td>{{ user.id }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.password }}</td>
        <td>{{ user.date }}</td>
        <td><router-link :to="`users/${user.id}`">Detail</router-link></td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="sass" scoped>
  table
    width: 100%
  thead th
    background-color: gray
    color: white
  tbody tr
    background-color: white
    color: black
</style>
