<script setup lang="ts">
  import { useForm } from 'vee-validate';
  import { object, string } from 'yup';

  const { values, errors, meta, handleSubmit, defineInputBinds } = useForm({
    validationSchema: object({
      username: string().email().required(),
      password: string().required(),
    }),
  });

  const username = defineInputBinds('username');
  const password = defineInputBinds('password');

  function onSuccess(values: object) {
    alert('login success');
  }

  function onInvalidSubmit(
    { values, errors, results } = { values: {}, errors: {}, results: {} },
  ) {
    console.log(values); // current form values
    console.log(errors); // a map of field names and their first error message
    console.log(results); // a detailed map of field names and their validation results
  }

  const onSubmit = handleSubmit(onSuccess, onInvalidSubmit);
</script>

<template>
  <h1>{{ values }}</h1>
  <h2>{{ meta }}</h2>
  <form class="add-job-form" @submit="onSubmit">
    <div class="form-input__wrapper">
      <label for="title">Username</label>
      <div class="form-input__input">
        <input type="email" name="username" id="title" v-bind="username" />
        <span class="error">{{ errors.username }}</span>
      </div>
    </div>
    <div class="form-input__wrapper">
      <label for="title">Password</label>
      <div class="form-input__input">
        <input type="password" name="password" id="title" v-bind="password" />
        <span class="error">{{ errors.password }}</span>
      </div>
    </div>
    <div class="form__footer">
      <button
        class="button--submit"
        :disabled="!meta.dirty || Object.keys(errors).length > 0"
      >
        Login
      </button>
    </div>
  </form>
</template>

<style lang="sass" scoped>
  .button--submit:disabled
    opacity: 0.5
  .form__header
    margin-bottom: 2em
    background: gray
  .form__footer
    display: flex
    justify-content: flex-end
    flex-direction: row
    width: 50%
  .add-job-form
      background: white
      border-radius: 5px
      min-height: 500px
      display: flex
      align-items: center
      justify-content: flex-start
      flex-direction: column
      padding-top: 20%
      .form-input__wrapper
        margin-bottom: 2rem
        width: 50%
        display: flex
        justify-content: flex-start
        flex-direction: column
        align-items: flex-start

        label
          display: block
          margin-bottom: 0.5rem
          color: black
          flex: 1
          width: 100%
          text-align: left
      .form-input__input
          background: white
          height: 50px
          border-radius: 5px
          border: 1px solid rgba(0,0,0,.5)
          flex: 1
          width: 100%
          position: relative
          input
            background: none
            border: none
            border-radius: 5px
            color: black
            font-size: 100%
            height: 50px
            width: 100%
            box-sizing: border-box
          .error
            position: absolute
            top: 50px
            left: 0
            margin-top: 0.25rem
            color: red
            font-size: .85rem
</style>
