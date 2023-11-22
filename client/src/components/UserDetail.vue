<script setup lang="ts">
  defineProps<{
    user: { username: string; id: string; password: string; date: string };
  }>();
</script>

<template>
  <table>
    <tr>
      <th>id</th>
      <td>{{ user.id }}</td>
    </tr>
    <tr>
      <th>username</th>
      <td>{{ user.username }}</td>
    </tr>
    <tr>
      <th>password</th>
      <td>{{ user.password }}</td>
    </tr>
    <tr>
      <th>date</th>
      <td>{{ user.date }}</td>
    </tr>
  </table>
</template>

<style lang="sass" scoped>
  table
    width: 100%
  th
    background-color: gray
    color: white
  tr
    background-color: white
    color: black
</style>
