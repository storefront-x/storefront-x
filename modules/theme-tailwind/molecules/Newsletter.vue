<template>
  <div
    class="mt-8 md:mt-0 flex flex-col items-center lg:items-start col-span-6 md:mt-0 md:row-start-2 md:col-start-3 md:col-span-8 lg:row-start-1 lg:col-start-9 lg:col-span-4"
  >
    <p class="text-gray-500 mt-0 text-center sm:text-left font-semibold mb-2">{{ t('Sign up for our newsletter') }}</p>
    <SfxForm class="mt-2 flex sm:max-w-md">
      <label for="newsletter" class="sr-only">{{ t('Email address') }}</label>
      <FormInput
        :placeholder="t('Your e-mail')"
        class="mr-4 text-gray-100"
        name="newsletter"
        autocomplete="email"
        validators="required|email"
      />
      <div class="flex-shrink-0">
        <button
          class="px-2 pt-2.5 pb-1.5 border-primary-600 border rounded-md bg-white border-transparent bg-primary-600 hover:bg-primary-600 text-white"
          type="submit"
        >
          <OutlineNewsletter />
        </button>
      </div>
    </SfxForm>
    <div class="col-start-9 mt-6 row-start-1.5 col-span-4 flex h-20 w-100">
      <SolidFacebook class="h-9 mr-4 w-auto" :viewBox="'0 0 30 30'" />
      <SolidInstagram class="h-9 mr-4 w-auto" :viewBox="'0 0 30 30'" />
      <SolidLinkedin class="h-9 mr-4 w-auto" :viewBox="'0 0 30 30'" />
      <SolidTwitter class="h-9 mr-4 w-auto" :viewBox="'0 0 30 30'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SfxForm from '#ioc/components/SfxForm'
import FormInput from '#ioc/molecules/FormInput'
import OutlineNewsletter from '#ioc/icons/OutlineNewsletter'
import SolidFacebook from '#ioc/icons/SolidFacebook'
import SolidInstagram from '#ioc/icons/SolidInstagram'
import SolidLinkedin from '#ioc/icons/SolidLinkedin'
import SolidTwitter from '#ioc/icons/SolidTwitter'
import useI18n from '#ioc/composables/useI18n'

const { t } = useI18n()

// TODO: Implement
</script>

<i18n lang="yaml">
cs-CZ:
  Sign up for our newsletter: Přihlašte se k našemu zpravodaji
  Email address: Emailová adresa
  Sign up: Přihlásit se
  Signed in: Přihlášen
  Your e-mail: Váš e-mail
</i18n>
