<script setup lang="ts">
  import Header from '@/components/Header.vue';
  import Toast from 'primevue/toast';
</script>

<template>
  <Toast />
  <Header />
  <router-view></router-view>
</template>

<style scoped></style>
