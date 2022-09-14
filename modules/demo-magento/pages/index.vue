<template>
  <div class="pb-8">
    <div class="main-slider mb-12">
      <SfxMagentoCmsBlock identifier="slider_hp" :class="containersSpacingClass" />
    </div>

    <Container :class="containersSpacingClass">
      <Usps :usps="usps" />
    </Container>

    <Container :class="containersSpacingClass">
      <CategoryPreviews />
    </Container>

    <Container :class="containersSpacingClass">
      <SfxMagentoCmsBlock identifier="top_sell_hp" class="pb-8" />
    </Container>

    <div class="bg-gray-50">
      <Container :class="containersSpacingClass">
        <ReviewShowreel :reviews="reviews" />
      </Container>
    </div>

    <Container :class="containersSpacingClass">
      <BlogGrid :blog-posts="data.blogPosts" />
    </Container>
  </div>
</template>

<script setup lang="ts">
import useGetBlogPosts from '#ioc/services/useGetBlogPosts'
import Container from '#ioc/atoms/Container'
import useAsyncData from '#ioc/composables/useAsyncData'
import useRoute from '#ioc/composables/useRoute'
import useI18n from '#ioc/composables/useI18n'
import Rocket from '#ioc/icons/custom/Rocket'
import Gears from '#ioc/icons/custom/Gears'
import Glass from '#ioc/icons/custom/Glass'
import hydrateWhenVisible from '#ioc/utils/hydration/hydrateWhenVisible'
import hydrateWhenIdle from '#ioc/utils/hydration/hydrateWhenIdle'

const SfxMagentoCmsBlock = hydrateWhenIdle(() => import('#ioc/components/SfxMagentoCmsBlock'))
const Usps = hydrateWhenVisible(() => import('#ioc/molecules/Usps'))
const CategoryPreviews = hydrateWhenVisible(() => import('#ioc/molecules/CategoryPreviews'))
const ReviewShowreel = hydrateWhenVisible(() => import('#ioc/molecules/ReviewShowreel'))
const BlogGrid = hydrateWhenVisible(() => import('#ioc/molecules/BlogGrid'))

const getBlogPosts = useGetBlogPosts()
const route = useRoute()
const { t } = useI18n()

const { data } = await useAsyncData('blogPosts', () => getBlogPosts('ALL', undefined, Number(route.query.page || 1)))

const containersSpacingClass = { 'mb-12': true }
const usps = [
  {
    title: t('customizable'),
    description: t('cust_desc'),
    component: Gears,
  },
  {
    title: t('scalable'),
    description: t('scalable_desc'),
    component: Rocket,
  },
  {
    title: t('improves_seo'),
    description: t('seo_desc'),
    component: Glass,
  },
]
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
</script>

<style scoped>
.main-slider :deep(h2) {
  text-shadow: 0 0 35px rgba(0, 0, 0, 0.5);
  @apply text-5xl md:text-9xl leading-none text-white mb-5;
}

.main-slider :deep(strong) {
  @apply text-primary-600;
}

.main-slider :deep(p) {
  text-shadow: 0 0 35px rgba(0, 0, 0, 0.9);
  @apply mb-1.5 text-white text-xl md:text-2xl leading-normal;
}

.main-slider :deep(.btn) {
  @apply mx-auto border rounded-md shadow-sm py-2 px-4 flex items-center justify-center text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 max-w-xs flex-1 relative w-full focus:ring-primary-500 border-transparent bg-primary-600 text-white hover:bg-primary-700;
}
</style>

<i18n lang="yaml">
en-US:
  'cust_desc': 'In StoreFront X, everything is easily customizable. From design, functionality, business logic to integrations, and much more. StoreFront X will always adapt to your needs.'
  'scalable_desc': 'Thanks to its modular architecture, StoreFront X is the ideal solution for projects of any size. It consists of a minimal core and additional modules for particular features so it is easily scalable.'
  'seo_desc': "StoreFront X will help you with SEO thanks to the excellent performance (improves Google's Web Vitals), server-side rendering and modules for meta-tags like Schema.org or Open Graph."
  'review_desc_1': 'We needed to speed up the site and support further growth of our online store, especially from a revenue perspective. It was key for us that the chosen solution was easily customizable and scalable. When we did a comparison of the options available on the market, StoreFront X came out best and it turned out to be a good choice. '
  'review_desc_2': 'Originally we wanted to create our own native application, but when we roughly calculated the costs of development and operation, we started looking for an alternative. For all intents and purposes, PWA came up the best. We chose StoreFront X and I must say that the result exceeded our expectations.'
  'customizable': 'Highly customizable'
  'scalable': 'Scalable'
  'improves_seo': 'Improves SEO'
cs-CZ:
  'cust_desc': 'Ve StoreFront X lze vše snadno přizpůsobit. Od designu, funkcí, obchodní logiky až po integrace a mnoho dalšího. StoreFront X se vždy jednoduše přizpůsobí jakýmkoliv Vašim potřebám.'
  'scalable_desc': 'Díky modulární architektuře je StoreFront X ideální řešením pro projekty jakékoliv velikosti. Skládá se z malého jádra a přídavných modulů pro jednotlivé funkcionality, takže je snadno škálovatelný.'
  'seo_desc': 'StoreFront X vám pomůže se SEO díky vynikajícímu výkonu (zlepšuje Coogle Core Web Vitals), server-side renderingu a modulům pro meta-tagy, jako je Schema.org nebo Open Graph.'
  'review_desc_1': 'Potřebovali jsme zrychlit web a podpořit další růst našeho e-shopu, hlavně z pohledu revenue. Klíčové pro nás bylo, aby vybrané řešení bylo snadno customizovatelné a škálovatelné. Když jsme si udělali srovnání dostupných variant na trhu, StoreFront X vyšel nejlépe a ukázalo se, že to byla dobrá volba.'
  'review_desc_2': 'Původně jsme chtěli vytvořit vlastní nativní aplikaci, ale když jsme si orientačně spočítali náklady na vývoj a provoz, začali jsme hledat alternativu. Po všech stránkách nám přišla nejlepší technologie PWA, kterou už využívají i velcí hráči na trhu, a tak jsme do toho šli. Vybrali jsme si StoreFront X a musím říct, že výsledek předčil naše očekávání.'
  'customizable': 'Customizovatelný'
  'scalable': 'Škálovatelný'
  'improves_seo': 'Zlepšuje SEO'
</i18n>
