<script setup lang="ts">
  import { useForm } from 'vee-validate';
  import { object, string } from 'yup';
  import config from '@@/config/index.ts';

  const { values, errors, meta, handleSubmit, defineInputBinds } = useForm({
    validationSchema: object({
      jobTitle: string().required(),
      jobCompany: string().required(),
      jobDescription: string().required(),
    }),
  });

  const jobTitle = defineInputBinds('jobTitle');
  const jobDescription = defineInputBinds('jobDescription');
  const jobCompany = defineInputBinds('jobCompany');

  const addJobHandler = async (newJobValues) => {
    const query = JSON.stringify({
      query: `
        mutation AddJob($newValues: JobInput!) {
          addJob(newValues: $newValues) {
            job {
              id
              title,
              company,
              description
            }
          }
        }
    `,
    });

    const response = await fetch(`${config.API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          input: {
            id: '00',
            ...newJobValues,
          },
        },
      }),
    });
    const { data } = await response.json();
    return data;
  };

  function onSuccess(values: object) {
    addJobHandler(JSON.stringify(values));
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
  <form class="add-job-form" @submit="onSubmit">
    <div class="form-input__wrapper">
      <label for="title">Title</label>
      <div class="form-input__input">
        <input name="jobTitle" id="title" v-bind="jobTitle" />
        <span class="error">{{ errors.jobTitle }}</span>
      </div>
    </div>
    <div class="form-input__wrapper">
      <label for="title">Description</label>
      <div class="form-input__input">
        <input name="jobDescription" id="title" v-bind="jobDescription" />
        <span class="error">{{ errors.jobDescription }}</span>
      </div>
    </div>
    <div class="form-input__wrapper">
      <label for="title">Company</label>
      <div class="form-input__input">
        <input name="jobCompany" id="title" v-bind="jobCompany" />
        <span class="error">{{ errors.jobCompany }}</span>
      </div>
    </div>
    <div class="form__footer">
      <button
        class="button--submit"
        :disabled="!meta.touched || Object.keys(errors).length > 0"
      >
        Add Job
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
      min-height: 800px
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