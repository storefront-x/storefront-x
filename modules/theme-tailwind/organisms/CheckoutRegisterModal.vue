<template>
  <Modal @close="$emit('close')">
    <SfxForm name="register" class="space-y-6" @submit="onSubmit">
      <FormInput name="firstName" :label="$t('First name')" autocomplete="given-name" validators="required" />

      <FormInput name="lastName" :label="$t('Last name')" autocomplete="family-name" validators="required" />

      <FormInput
        name="email"
        type="email"
        :label="$t('Email address')"
        autocomplete="email"
        validators="required|email"
        :value="email"
      />

      <FormInput name="password" type="password" :label="$t('Password')" validators="required|min:8|classes:3" />

      <FormInput
        name="passwordConfirmation"
        type="password"
        :label="$t('Password confirmation')"
        validators="required|same:password"
      />

      <Button type="submit" color="primary" :loading="isLoading" class="w-full" data-cy="sign-up">
        {{ $t('Sign up') }}
      </Button>
    </SfxForm>
  </Modal>
</template>

<script setup lang="ts">
import SfxForm from '#ioc/components/SfxForm'
import Modal from '#ioc/atoms/Modal'
import Button from '#ioc/atoms/Button'
import FormInput from '#ioc/molecules/FormInput'
import useLoginCustomer from '#ioc/services/useLoginCustomer'
import useConfirmContactInformation from '#ioc/services/useConfirmContactInformation'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import { ref } from 'vue'

const showErrorNotification = useShowErrorNotification()
const loginCustomer = useLoginCustomer()
const confirmContactInformation = useConfirmContactInformation()
const isLoading = ref(false)
const emit = defineEmits(['close'])

const props = defineProps({
  email: {
    type: String,
    required: true,
  },
})

const onSubmit = async (data) => {}
export default {
  components: {
    Modal,
    FormInput,
    SfxForm,
    Button,
  },

  mixins: [UsesLogin(), UsesRegister()],

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
    async onSubmit(data) {
      try {
        this.isLoading = true

        await this.$Checkout.register(data)

        this.$Checkout.setShippingAddress({
          firstName: 'DUMMYDATA',
          lastName: 'DUMMYDATA',
          telephone: 'DUMMYDATA',
          city: 'DUMMYDATA',
          street: 'DUMMYDATA',
          postcode: 'DUMMYDATA',
          countryCode: 'CZ',
        })

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
  First name: Křestní jméno
  Last name: Příjmení
  Email address: Emailová adresa
  Password: Heslo
  Password confirmation: Potvrzení hesla
  Sign up: Registrovat
</i18n>
