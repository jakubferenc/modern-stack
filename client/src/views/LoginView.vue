<script setup lang="ts">
  import config from '@@/config/index';
  import { useRoute } from 'vue-router';
  import LoginForm from '@/components/forms/LoginForm.vue';
  import { useToast } from 'primevue/usetoast';

  const toast = useToast();

  const route = useRoute();

  const handleLogin = async (formData: any) => {
    const response = await fetch(`${config.API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: formData,
      }),
    });

    const { token } = await response.json();
    localStorage.setItem(config.ACCESS_TOKEN_KEY, token);

    toast.add({
      severity: 'info',
      summary: 'User login',
      detail: 'User logged in successfully with token:<br> ' + token,
      life: 5000,
    });
  };
</script>
<template>
  <h1>{{ route.meta.title }}</h1>
  <LoginForm @login="handleLogin" />
</template>

<style scoped></style>
