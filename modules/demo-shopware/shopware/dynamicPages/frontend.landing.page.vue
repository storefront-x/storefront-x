<template>
  <div class="mx-auto mb-8">
    <SfxShopwareCmsPage :data="data" />
    <div class="container mx-auto">
      <ReviewShowreel :reviews="reviews" />
    </div>
  </div>
</template>

<script setup lang="ts">
import useGetCmsPageById from '#ioc/services/useGetCmsPageById'
import SfxShopwareCmsPage from '#ioc/components/SfxShopwareCmsPage'
import useResource from '#ioc/composables/useResource'
import useI18n from '#ioc/composables/useI18n'
import hydrateWhenVisible from '#ioc/utils/hydration/hydrateWhenVisible'

const ReviewShowreel = hydrateWhenVisible(() => import('#ioc/molecules/ReviewShowreel'))
const { t } = useI18n()

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const reviews = [
  {
    logo: '/logos/logo_demo.png',
    description: t('review_desc_1'),
    authorName: 'Libor Test',
    authorRole: 'CEO Demo.cz',
    authorImage: '/images/portrait_2.jpg',
  },
  {
    logo: '/logos/logo_demo2.png',
    description: t('review_desc_2'),
    authorName: 'Roman Test',
    authorRole: 'E-Commerce at Another Demo Enterprises',
    authorImage: '/images/portrait_3.jpg',
  },
]

const getCmsPageById = useGetCmsPageById()

const [data] = await useResource(
  () => props.id,
  (id) => getCmsPageById(id),
)
</script>

<i18n lang="yaml">
en-US:
  'review_desc_1': 'We needed to speed up the site and support further growth of our online store, especially from a revenue perspective. It was key for us that the chosen solution was easily customizable and scalable. When we did a comparison of the options available on the market, StoreFront X came out best and it turned out to be a good choice. '
  'review_desc_2': 'Originally we wanted to create our own native application, but when we roughly calculated the costs of development and operation, we started looking for an alternative. For all intents and purposes, PWA came up the best. We chose StoreFront X and I must say that the result exceeded our expectations.'
cs-CZ:
  'review_desc_1': 'Potřebovali jsme zrychlit web a podpořit další růst našeho e-shopu, hlavně z pohledu revenue. Klíčové pro nás bylo, aby vybrané řešení bylo snadno customizovatelné a škálovatelné. Když jsme si udělali srovnání dostupných variant na trhu, StoreFront X vyšel nejlépe a ukázalo se, že to byla dobrá volba.'
  'review_desc_2': 'Původně jsme chtěli vytvořit vlastní nativní aplikaci, ale když jsme si orientačně spočítali náklady na vývoj a provoz, začali jsme hledat alternativu. Po všech stránkách nám přišla nejlepší technologie PWA, kterou už využívají i velcí hráči na trhu, a tak jsme do toho šli. Vybrali jsme si StoreFront X a musím říct, že výsledek předčil naše očekávání.'
</i18n>
