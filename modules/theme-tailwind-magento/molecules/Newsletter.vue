<template>
  <div
    class="mt-8 md:mt-0 flex flex-col items-center lg:items-start col-span-6 md:mt-0 md:row-start-2 md:col-start-3 md:col-span-8 lg:row-start-1 lg:col-start-9 lg:col-span-4"
  >
    <p class="text-gray-500 mt-0 text-center sm:text-left font-semibold mb-2">{{ t('newsletterSignup') }}</p>
    <SfxForm class="mt-2 flex sm:max-w-md" @submit="onSubmitNewsletter">
      <label for="newsletter" class="sr-only">{{ t('email') }}</label>
      <FormInput
        v-if="!subscribed"
        :placeholder="t('yourEmail')"
        class="mr-4 text-gray-400"
        name="newsletter"
        autocomplete="email"
        validators="required|email"
      />
      <div class="flex-shrink-0">
        <Button
          class="px-2 pt-2.5 pb-1.5 border-primary-600 border rounded-md bg-white border-transparent bg-primary-600 hover:bg-primary-600 text-white"
          type="submit"
          :disabled="subscribed"
          :loading="loading"
          title="newsletter"
        >
          <OutlineNewsletter />
        </Button>
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
import Button from '#ioc/atoms/Button'
import useI18n from '#ioc/composables/useI18n'
import useSubscribeEmailToNewsletter from '#ioc/services/useSubscribeToNewsletter'
import useShowSuccessNotification from '#ioc/composables/useShowSuccessNotification'
import { ref } from 'vue'

const { t } = useI18n()
const loading = ref(false)
const subscribed = ref(false)
const showSuccessNotification = useShowSuccessNotification()
const subscribeToNewsletter = useSubscribeEmailToNewsletter()

const onSubmitNewsletter = async ({ newsletter }: { newsletter: string }) => {
  loading.value = true

  try {
    const { status } = await subscribeToNewsletter(newsletter)

    if (status === 'SUBSCRIBED') {
      showSuccessNotification(t('subscribedTitle'), t('thankYou'))
      subscribed.value = true
    } else if (status === 'NOT_ACTIVE') {
      showSuccessNotification(t('confirmationRequired'), t('confirmationDesc'))
    }
  } finally {
    loading.value = false
  }
}
</script>

<i18n lang="yaml">
en-US:
  newsletterSignup: Sign up for our newsletter
  confirmationRequired: Requires a confirmation
  confirmationDesc: Please, confirm your sign-up by link from e-mail we sent to your e-mail address.
  subscribedTitle: Subscribed
  thankYou: Thank you.
  email: Email address
  yourEmail: Your e-mail
cs-CZ:
  newsletterSignup: Přihlašte se k našemu zpravodaji
  confirmationRequired: Vyžaduje se potvrzení
  confirmationDesc: Potvrďte prosím svou registraci odkazem z e-mailu, který jsme vám zaslali na vaši e-mailovou adresu.
  subscribedTitle: Přihlášen k odběru
  thankYou: Děkujeme.
  email: Emailová adresa
  yourEmail: Váš e-mail
</i18n>
