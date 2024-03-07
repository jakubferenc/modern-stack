<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router';
  import LoginForm from '@/components/forms/LoginForm.vue';
  import { AuthRequest } from '@/models/auth';
  import { useAuthStore } from '@/stores/auth';
  import { useToast } from 'primevue/usetoast';
  const toast = useToast();

  const route = useRoute();
  const router = useRouter();

  const store = useAuthStore();

  const handleLogin = async (formData: AuthRequest) => {
    await store.authenticate(formData);
    if (store.isAuthenticated) {
      toast.add({
        severity: 'success',
        summary: 'Login successful',
        detail: 'You have been logged in',
        life: 3000,
      });
      router.push('/');
    } else {
      toast.add({
        severity: 'error',
        summary: 'Login failed',
        detail: 'Invalid username or password',
        life: 3000,
      });
    }
  };
</script>
<template>
  <h1>{{ route.meta.title }}</h1>
  <LoginForm @login="handleLogin" />
</template>

<style scoped></style>
