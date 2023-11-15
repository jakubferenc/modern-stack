<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import LoginForm from '@/components/forms/LoginForm.vue';
  const route = useRoute();
</script>
<template>
  <h1>{{ route.meta.title }}</h1>
  <LoginForm />
</template>

<style scoped></style>
