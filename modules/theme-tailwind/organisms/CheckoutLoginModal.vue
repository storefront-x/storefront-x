<template>
  <Modal @close="$emit('close')">
    <SfxForm class="space-y-6" @submit="onSubmit">
      <FormInput name="password" type="password" :label="$t('Password')" validators="required" />

      <Button type="submit" color="primary" :loading="isLoading" class="w-full" data-cy="sign-in">
        {{ $t('Sign in') }}
      </Button>
    </SfxForm>
  </Modal>
</template>

<script>
import SfxForm from '@sfx/base/components/form/SfxForm.vue'
import Modal from '@components/atoms/Modal'
import Button from '@components/atoms/Button'
import FormInput from '@components/molecules/FormInput'

export default {
  components: {
    Modal,
    FormInput,
    SfxForm,
    Button,
  },

  inject: ['$Checkout', '$Notifications'],

  props: {
    email: {
      type: String,
      default: '',
    },
  },

  data: () => ({
    isLoading: false,
  }),

  methods: {
    async onSubmit({ password }) {
      try {
        this.isLoading = true

        await this.$Checkout.login(this.email, password)

        this.$emit('close')
      } catch (e) {
        this.isLoading = false

        this.$Notifications.showError(e)
      }
    },
  },
}
</script>

<i18n lang="yaml">
cs-CZ:
  Email address: Emailová adresa
  Password: Heslo
  Sign in: Přihlásit se
</i18n>
