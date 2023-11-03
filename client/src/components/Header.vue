<script setup lang="ts">
  import { ref } from 'vue';
  const count = ref(0);
</script>

<template>
  <nav class="main-menu">
    <ul>
      <li class="main-menu__link">
        <router-link to="/">Home</router-link>
      </li>
      <li class="main-menu__link">
        <router-link to="/jobs">Jobs</router-link>
      </li>
      <li class="main-menu__link">
        <router-link to="/jobs/add">Add job</router-link>
      </li>
      <li class="main-menu__link">
        <router-link to="/login">Login</router-link>
      </li>
      <li class="main-menu__link">
        <router-link to="/logout">Logout</router-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="sass" scoped>
  .main-menu
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
