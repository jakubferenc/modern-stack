<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import LoginForm from '@/components/forms/LoginForm.vue';
  import { AuthRequest } from '@/models/auth';
  import { useAuthStore } from '@/stores/auth';

  const route = useRoute();

  const store = useAuthStore();

  const handleLogin = async (formData: AuthRequest) => {
    await store.authenticate(formData);
  };
</script>
<template>
  <h1>{{ route.meta.title }}</h1>
  <LoginForm @login="handleLogin" />
</template>

<style scoped></style>
