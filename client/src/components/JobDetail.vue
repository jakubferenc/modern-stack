<script setup lang="ts">
  import { ref } from 'vue';
  defineProps<{
    job: { title: string; id: string; company: string; description: string };
  }>();
</script>

<template>
  <table>
    <tr>
      <th>id</th>
      <td>{{ job.id }}</td>
    </tr>
    <tr>
      <th>title</th>
      <td>{{ job.title }}</td>
    </tr>
    <tr>
      <th>company</th>
      <td>{{ job.company }}</td>
    </tr>
    <tr>
      <th>description</th>
      <td>{{ job.description }}</td>
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
