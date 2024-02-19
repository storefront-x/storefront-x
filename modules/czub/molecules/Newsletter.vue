<template>
  <div class="mt-8 md:mt-0 bg-primary-650 p-7">
    <h4>Newsletter</h4>
    <p class="text-gray-500 mt-0 text-center sm:text-left font-normal mb-2">Novinky do vašeho e-mailu</p>
    <SfxForm class="mt-2 w-full" @submit="onSubmitNewsletter">
      <label for="newsletter" class="sr-only">{{ t('email') }}</label>
      <div class="flex justify-between">
        <FormInputNewsletter
          v-if="!subscribed"
          placeholder="Váš email"
          class="mr-4 text-gray-400 w-full"
          name="newsletter"
          autocomplete="email"
          validators="required|email"
        />
        <div class="flex-shrink-0">
          <Button
            class="px-2 pt-2.5 pb-1.5 border-primary-600 border rounded-md border-transparent !bg-secondary-500 hover:bg-primary-600 text-white"
            type="submit"
            :disabled="subscribed"
            :loading="loading"
            title="newsletter"
          >
            <OutlineNewsletter />
          </Button>
        </div>
      </div>
    </SfxForm>
  </div>
  <div class="p-7">
    <h4>Připoj se k nám</h4>
    <div class="flex items-center space-x-4">
      <a href="" class="group">
        <SolidFacebook class="h-9 w-auto" :viewBox="'0 0 30 30'" />
      </a>
      <a href="">
        <SolidInstagram class="h-9 w-auto" :viewBox="'0 0 30 30'" />
      </a>
      <a href="">
        <SolidLinkedin class="h-9 w-auto" :viewBox="'0 0 30 30'" />
      </a>
      <a href="">
        <SolidTwitter class="h-9 w-auto" :viewBox="'0 0 30 30'" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import SfxForm from '#ioc/components/SfxForm'
import FormInputNewsletter from '#ioc/molecules/FormInputNewsletter'
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

<style scoped>
:deep(h4) {
  @apply text-white uppercase tracking-[1px] font-bold text-2xl mb-5;
}

a {
  @apply transition ease-in-out delay-[10ms] text-xs text-white p-1;
}

a:hover {
  @apply bg-secondary-500;
}
</style>
