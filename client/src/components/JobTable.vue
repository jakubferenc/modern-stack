<script setup lang="ts">
  import { ref } from 'vue';
  defineProps<{
    jobs: { title: string; id: string; company: string; description: string }[];
  }>();
  const title = ref('Jobs Table');
</script>

<template>
  <h2>{{ title }}</h2>
  <table v-if="jobs">
    <thead>
      <tr>
        <th>id</th>
        <th>title</th>
        <th>company</th>
        <th>description</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="job in jobs">
        <td>{{ job.id }}</td>
        <td>{{ job.title }}</td>
        <td>{{ job.company }}</td>
        <td>{{ job.description }}</td>
        <td><router-link :to="`jobs/${job.id}`">Detail</router-link></td>
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
