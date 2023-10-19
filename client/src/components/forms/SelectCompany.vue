<script setup lang="ts">
  import { Field } from 'vee-validate';
  import { ref } from 'vue';

  const companies: Array<Company> = [
    {
      id: '1',
      name: CompanyNames.MICROSOFT,
      description:
        'Microsoft Corporation is an American multinational technology company with headquarters in Redmond, Washington. It develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1024px-Microsoft_logo.svg.png',
      website: 'https://www.microsoft.com/',
    },
    {
      id: '2',
      name: CompanyNames.APPLE,
      description:
        'Apple Inc. is an American multinational technology company headquartered in Cupertino, California, that designs, develops, and sells consumer electronics, computer software, and online services.',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png',
      website: 'https://www.apple.com/',
    },
    {
      id: '3',
      name: CompanyNames.GOOGLE,
      description:
        'Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, a search engine, cloud computing, software, and hardware.',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1024px-Google_%22G%22_Logo.svg.png',
      website: 'https://www.google.com/',
    },
    {
      id: '4',
      name: CompanyNames.FACEBOOK,
      description: '',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1024px-Facebook_f_logo_%282019%29.svg.png',
      website: 'https://www.facebook.com/',
    },
  ];

  const selectedCompany = ref<Company | null>(null);
</script>
<script lang="ts">
  export interface Company {
    id: string;
    name: CompanyNames;
    description: string;
    logo?: string;
    website?: string;
    createdAt?: string;
    updatedAt?: string;
  }

  export enum CompanyNames {
    MICROSOFT = 'Microsoft',
    APPLE = 'Apple',
    GOOGLE = 'Google',
    FACEBOOK = 'Facebook',
    AMAZON = 'Amazon',
    NETFLIX = 'Netflix',
    TWITTER = 'Twitter',
    UBER = 'Uber',
    LYFT = 'Lyft',
    AIRBNB = 'Airbnb',
    DROPBOX = 'Dropbox',
    SPOTIFY = 'Spotify',
    SLACK = 'Slack',
    SQUARE = 'Square',
    TESLA = 'Tesla',
    YOUTUBE = 'Youtube',
    INSTAGRAM = 'Instagram',
  }
</script>
<template>
  <label for="title">Companies</label>
  <div class="form-input__input">
    <Field
      v-slot="{ field, errors }"
      v-model="selectedCompany"
      name="jobCompany"
    >
      <select id="job" v-bind="field">
        <option
          v-for="company in companies"
          :key="company.id"
          :value="company.name"
        >
          {{ company.name }}
        </option>
      </select>
      <span class="error">{{ errors }}</span>
    </Field>
  </div>
</template>

<style lang="sass" scoped></style>
