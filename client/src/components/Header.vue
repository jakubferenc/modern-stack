<script setup lang="ts">
  import { computed } from 'vue';
  import { useAuthStore } from '@/stores/auth';

  const authStore = useAuthStore();
  const isLoggedIn = computed(() => authStore.isAuthenticated);
</script>

<template>
  <nav class="main-menu">
    <ul class="main-menu__main">
      <li class="main-menu__link">
        <router-link to="/">Home</router-link>
      </li>
      <li class="main-menu__link">
        <router-link to="/jobs">Jobs</router-link>
      </li>
      <li v-if="isLoggedIn" class="main-menu__link">
        <router-link to="/jobs/add">Add job</router-link>
      </li>
      <li class="main-menu__link">
        <router-link to="/users">Users</router-link>
      </li>
    </ul>
    <ul class="main-menu__user">
      <template v-if="isLoggedIn">
        <li class="main-menu__link">
          <router-link to="/user">User</router-link>
        </li>
        <li class="main-menu__link">
          <router-link to="/logout">Logout</router-link>
        </li>
      </template>
      <template v-if="!isLoggedIn">
        <li class="main-menu__link">
          <router-link to="/register">Register</router-link>
        </li>
        <li class="main-menu__link">
          <router-link to="/login">Login</router-link>
        </li>
      </template>
    </ul>
  </nav>
</template>

<style lang="sass" scoped>
  .main-menu
    display: flex
    justify-content: space-between
    align-items: center
    ul
        margin: 0
        padding: 0
    &__link
      display: inline-block
      margin-right: 1em
      a
        &.router-link-active
          color: gray
          text-decoration: underline
        text-decoration: none
        color: white
        &:hover
          color: gray
</style>
