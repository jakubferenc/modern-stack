<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import RegisterForm from '@/components/forms/RegisterForm.vue';
  const route = useRoute();
</script>
<template>
  <h1>{{ route.meta.title }}</h1>
  <RegisterForm />
</template>

<style scoped></style>
