<template>
  <div>
    <Heading :level="3" class="mt-2">{{ t('Add a new review') }}</Heading>

    <SfxForm name="signIn" @submit="onSubmit">
      <FormInput name="nickname" type="text" :label="t('Nickname')" validators="required|min:3" class="pt-2" />
      <FormInput name="summary" type="text" :label="t('Summary')" validators="required|min:3" class="pt-2" />
      <FormTextArea name="text" type="text" :label="t('Text')" validators="required|min:3" />
      <div v-if="data.productReviewMeta.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 my-4">
        <div v-for="meta in data.productReviewMeta" :key="meta.name" :data-cy="meta.name">
          <FormReviewStars :name="meta.id" :label="meta.name" :meta-values="meta.values" validators="required" />
        </div>
      </div>
      <div class="flex flex-row justify-end">
        <div class="mb-2">
          <Button type="submit" color="primary" :loading="isLoading" data-cy="submit-review">
            <span v-if="isLoading" class="" role="status" :aria-hidden="!isLoading" />
            {{ t('Save review') }}
          </Button>
        </div>

        <div class="mb-2 ml-2">
          <Button type="submit" @click="$emit('close')">
            {{ t('Cancel') }}
          </Button>
        </div>
      </div>
    </SfxForm>
  </div>
</template>

<script setup lang="ts">
import SfxForm from '#ioc/components/SfxForm'
import Button from '#ioc/atoms/Button'
import Heading from '#ioc/atoms/Heading'
import FormInput from '#ioc/molecules/FormInput'
import FormTextArea from '#ioc/molecules/FormTextArea'
import FormReviewStars from '#ioc/molecules/FormReviewStars'
import { ref } from 'vue'
import useGetProductReviewMeta from '#ioc/services/useGetProductReviewMeta'
import useAsyncData from '#ioc/composables/useAsyncData'
import useI18n from '#ioc/composables/useI18n'
import injectProduct from '#ioc/composables/injectProduct'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useShowSuccessNotification from '#ioc/composables/useShowSuccessNotification'
import useCreateProductReview from '#ioc/services/useCreateProductReview'

const emit = defineEmits(['close'])

const { t } = useI18n()

const getProductReviewMeta = useGetProductReviewMeta()
const showErrorNotification = useShowErrorNotification()
const showSuccessNotification = useShowSuccessNotification()
const createProductReview = useCreateProductReview()

const product = injectProduct()

const { data } = await useAsyncData('reviewMeta', () => getProductReviewMeta())
const isLoading = ref(false)

const onSubmit = async (data: any) => {
  try {
    isLoading.value = true
    await createProductReview(product, data)
    isLoading.value = false
    showSuccessNotification('', t('Product review submitted to review'))
    emit('close')
  } catch (e) {
    showErrorNotification(e)
    emit('close')
  }
}
</script>

<i18n lang="yaml">
cs-CZ:
  Add a new review: Napsat nové hodnocení
  Save review: Uložit hodnocení
  Cancel: Zrušit
  Nickname: Přezdívka
  Summary: Nadpis
  Product review submitted to review: Hodnocení odesláno ke schválení
</i18n>
