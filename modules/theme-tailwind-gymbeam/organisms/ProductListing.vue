<template>
  <div class="relative lg:static">
    <div class="pt-8 md:pt-4 flex">
      <div class="basis-1/4">
        <nav class="sidebar-navigation bg-grey-890 p-2">
          <ul>
            <li
              v-for="c1 in nav"
              :key="c1.link"
              class="category-item level-top"
              :class="{ parent: c1.children.length > 0 }"
            >
              <RouterLink :to="c1.link" class="level-top">
                <span :class="{ 'text-secondary-500': open[c1.link] }">{{ c1.title }}</span>
              </RouterLink>
              <em @click="open[c1.link] = !open[c1.link]" />

              <ul class="submenu pl-[10px] inline-block" :class="{ hidden: !open[c1.link] }">
                <li
                  v-for="c2 in c1.children"
                  :key="c2.link"
                  class="category-item"
                  :class="{ parent: c2.children.length > 0 }"
                >
                  <RouterLink :to="c2.link">
                    <span :class="{ 'text-secondary-500': open[c2.link] }">{{ c2.title }}</span>
                  </RouterLink>
                  <em @click="open[c2.link] = !open[c2.link]" />

                  <ul class="submenu" :class="{ hidden: !open[c2.link] }">
                    <li
                      v-for="c3 in c2.children"
                      :key="c3.link"
                      class="category-item"
                      :class="{ parent: c3.children.length > 0 }"
                    >
                      <RouterLink :to="c3.link">
                        <span :class="{ 'text-secondary-500': open[c3.link] }">{{ c3.title }}</span>
                      </RouterLink>
                      <em @click="open[c3.link] = !open[c3.link]" />

                      <ul class="submenu" :class="{ hidden: !open[c3.link] }">
                        <li
                          v-for="c4 in c3.children"
                          :key="c4.link"
                          class="category-item"
                          :class="{ parent: c4.children.length > 0 }"
                        >
                          <RouterLink :to="c4.link">
                            <span :class="{ 'text-secondary-500': open[c4.link] }">{{ c4.title }}</span>
                          </RouterLink>
                          <em @click="open[c4.link] = !open[c4.link]" />
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>

      <div class="basis-3/4 pl-5">
        <CategoryInfo :category="category" />

        <div aria-labelledby="product-heading" class="mt-6 lg:mt-0 lg:col-span-2 xl:col-span-5">
          <h2 id="product-heading" class="sr-only">Products</h2>

          <div
            class="absolute right-0 top-8 lg:top-[unset] lg:right-[unset] lg:static lg:flex lg:justify-end lg:items-end"
          >
            <ProductSort class="mb-4" :title="t(sortedBy)" />
            <button
              class="hidden lg:flex px-2 py-1 lg:rounded-none bg-grey-895 font-semibold text-white mb-4 ml-2 items-center"
              @click="isDesktopFiltersOpen = !isDesktopFiltersOpen"
            >
              <span>Zobraziť filtre</span>
              <SolidArrowLeft class="-rotate-90 fill-white w-5 h-4" />
            </button>
          </div>

          <ProductFilters :aggregations="aggregations" :is-desktop-filters-open="isDesktopFiltersOpen" />

          <div class="grid grid-cols-1 gap-2 sm:gap-0 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
            <ProductProvider v-for="(product, i) in products" :key="product.id" :product="product">
              <ProductTile :preload-image="i === 0" :index="i" />
            </ProductProvider>
          </div>

          <div class="flex justify-between items-center mt-8">
            <Pagination :total="totalCount" class="my-8" />
          </div>
          <slot name="bellow-products" />
          <LoadNext :total="totalCount" class="my-8" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useI18n from '#ioc/composables/useI18n'
import useRoute from '#ioc/composables/useRoute'
import ToProduct from '#ioc/mappers/ToProduct'
import ProductSort from '#ioc/molecules/ProductSort'
import ProductTile from '#ioc/molecules/ProductTile'
import ProductProvider from '#ioc/providers/ProductProvider'
import { computed, PropType, reactive, ref, provide, watchEffect } from 'vue'
import hydrateWhenVisible from '#ioc/utils/hydration/hydrateWhenVisible'
import hydrateWhenIdle from '#ioc/utils/hydration/hydrateWhenIdle'
import LoadNext from '#ioc/molecules/LoadNext'
import CategoryInfo from '#ioc/molecules/CategoryInfo'
import ToCategory from '#ioc/mappers/ToCategory'
import SolidArrowLeft from '#ioc/icons/SolidArrowLeft'

const ProductFilters = hydrateWhenIdle(() => import('#ioc/molecules/ProductFilters'))
const Pagination = hydrateWhenVisible(() => import('#ioc/molecules/Pagination'))

const { t } = useI18n()
const route = useRoute()

defineProps({
  category: {
    type: Object as PropType<ReturnType<typeof ToCategory>>,
    required: true,
  },
  products: {
    type: Array as PropType<ReturnType<typeof ToProduct>[]>,
    required: true,
  },
  aggregations: {
    type: Array,
    default: () => [],
  },
  totalCount: {
    type: Number,
    required: true,
  },
})

const nav = [
  {
    title: 'Novoročný výpredaj',
    link: '/novorocny-vypredaj',
    children: [],
  },
  {
    title: 'Športová výživa',
    link: '/sportova-vyziva',
    children: [
      {
        title: 'Proteíny',
        link: '/3-proteiny',
        children: [
          {
            title: 'Srvátkový whey proteín',
            link: '/srvatkovy-whey-protein',
            children: [
              {
                title: 'Proteínové koncentráty',
                link: '/proteinove-koncentraty',
                children: [],
              },
              {
                title: 'Proteínové izoláty',
                link: '/proteinove-izolaty',
                children: [],
              },
              {
                title: 'Hydrolyzované proteíny',
                link: '/hydrolyzovane-proteiny',
                children: [],
              },
              {
                title: 'Viaczložkové srvátkové proteíny',
                link: '/viaczlozkove-srvatkove-proteiny',
                children: [],
              },
            ],
          },
          {
            title: 'Viaczložkový proteín',
            link: '/viaczlozkovy-protein',
            children: [],
          },
          {
            title: 'Nočné proteíny',
            link: '/28-nocne-proteiny',
            children: [],
          },
          {
            title: 'Proteíny na rastlinnej báze',
            link: '/proteiny-na-rastlinnej-baze',
            children: [],
          },
          {
            title: 'Kolagén',
            link: '/kolagen',
            children: [],
          },
          {
            title: 'Proteíny pre ženy',
            link: '/34-ladies-protein',
            children: [],
          },
          {
            title: 'Hovädzie proteíny',
            link: '/hovadzi-beef-protein',
            children: [],
          },
          {
            title: 'Sójový proteín',
            link: '/sojovy-protein',
            children: [],
          },
          {
            title: 'Proteíny na rast svalov',
            link: '/narast-svalovej-hmoty',
            children: [],
          },
          {
            title: 'Proteíny ostatné',
            link: '/proteiny-ostatne',
            children: [],
          },
        ],
      },
      {
        title: 'Spaľovače tuku',
        link: '/33-spalovace-tukov',
        children: [
          {
            title: 'Komplexné spaľovače',
            link: '/komplexne-spalovace',
            children: [],
          },
          {
            title: 'L-Karnitíny',
            link: '/l-karnitin',
            children: [],
          },
          {
            title: 'Termo spaľovače',
            link: '/termo-spalovace',
            children: [],
          },
          {
            title: 'Ostatné spaľovače tukov',
            link: '/ostatne-spalovace-tukov',
            children: [],
          },
        ],
      },
      {
        title: 'Gainery a sacharidy',
        link: '/5-gainery',
        children: [
          {
            title: 'Gainery',
            link: '/gainery',
            children: [],
          },
          {
            title: 'Pomalé sacharidy',
            link: '/sacharidy',
            children: [],
          },
          {
            title: 'Rýchle sacharidy',
            link: '/rychle-sacharidy',
            children: [],
          },
          {
            title: 'Energetické gély',
            link: '/energeticke-gely',
            children: [],
          },
          {
            title: 'All-in-one',
            link: '/69-all-in-one',
            children: [],
          },
        ],
      },
      {
        title: 'Kĺbová výživa',
        link: '/23-klbova-vyziva',
        children: [
          {
            title: 'Komplexné kĺbové výživy',
            link: '/komplexne-klbove-vyzivy',
            children: [],
          },
          {
            title: 'Kolagénové kĺbové výživy',
            link: '/kolagenove-klbove-vyzivy',
            children: [],
          },
          {
            title: 'Glukozamín',
            link: '/glukozamin',
            children: [],
          },
          {
            title: 'Ostatné kĺbové výživy',
            link: '/ostatne-klbove-vyzivy',
            children: [],
          },
        ],
      },
      {
        title: 'Aminokyseliny',
        link: '/aminokyseliny',
        children: [
          {
            title: 'Komplexné aminokyseliny',
            link: '/komplexne-aminokyseliny',
            children: [],
          },
          {
            title: 'BCAA',
            link: '/42-bcaa',
            children: [],
          },
          {
            title: 'EAA',
            link: '/eaa',
            children: [],
          },
          {
            title: 'Arginín',
            link: '/107-arginin',
            children: [],
          },
          {
            title: 'Glutamín',
            link: '/43-glutamin',
            children: [],
          },
          {
            title: 'Ostatné aminokyseliny',
            link: '/ostatne-aminokyseliny',
            children: [],
          },
        ],
      },
      {
        title: 'Vitamíny',
        link: '/vitaminy',
        children: [
          {
            title: 'Multivitamín',
            link: '/komplexne-vitaminy',
            children: [],
          },
          {
            title: 'Vitamín A',
            link: '/vitamin-a',
            children: [],
          },
          {
            title: 'Vitamíny B',
            link: '/vitamin-b',
            children: [],
          },
          {
            title: 'Vitamín C',
            link: '/vitamin-c',
            children: [],
          },
          {
            title: 'Vitamín D',
            link: '/vitamin-d',
            children: [],
          },
          {
            title: 'Vitamín E',
            link: '/vitamin-e',
            children: [],
          },
          {
            title: 'Ostatné vitamíny',
            link: '/ostatne-vitaminy',
            children: [],
          },
        ],
      },
      {
        title: 'Minerály',
        link: '/mineraly-1',
        children: [
          {
            title: 'Multiminerály',
            link: '/komplexne-mineraly',
            children: [],
          },
          {
            title: 'Magnézium',
            link: '/magnezium',
            children: [],
          },
          {
            title: 'Vápnik',
            link: '/vapnik',
            children: [],
          },
          {
            title: 'Železo',
            link: '/zelezo',
            children: [],
          },
          {
            title: 'Zinok',
            link: '/zinok',
            children: [],
          },
          {
            title: 'ZMA a ZMB',
            link: '/zma-zmb',
            children: [],
          },
          {
            title: 'Ostatné minerály',
            link: '/ostatne-mineraly',
            children: [],
          },
        ],
      },
      {
        title: 'Zdravé tuky',
        link: '/zdrave-tuky',
        children: [
          {
            title: 'Omega-3',
            link: '/omega-3-mastne-kyseliny',
            children: [],
          },
          {
            title: 'Omega 3-6-9',
            link: '/omega-3-6-9',
            children: [],
          },
          {
            title: 'Krilový olej',
            link: '/krilovy-olej',
            children: [],
          },
          {
            title: 'Tekutý rybí olej',
            link: '/tekuty-rybi-olej',
            children: [],
          },
          {
            title: 'CLA a HCA',
            link: '/cla-a-hca',
            children: [],
          },
          {
            title: 'Lecitín',
            link: '/lecitin',
            children: [],
          },
          {
            title: 'MCT olej',
            link: '/mct-olej',
            children: [],
          },
          {
            title: 'Ostatné zdravé tuky',
            link: '/ostatne-zdrave-tuky',
            children: [],
          },
        ],
      },
      {
        title: 'Kreatín',
        link: '/14-kreatin',
        children: [
          {
            title: 'Kreatín Monohydrát',
            link: '/82-kreatin-monohydrat',
            children: [],
          },
          {
            title: 'Kreatín iné formy',
            link: '/84-kreatin-ethyl-ester',
            children: [],
          },
          {
            title: 'Viaczložkový kreatín',
            link: '/viaczlozkovy-kreatin',
            children: [],
          },
        ],
      },
      {
        title: 'Ostatné doplnky výživy',
        link: '/ostatne-doplnky-vyzivy',
        children: [
          {
            title: 'Probiotiká a tráviace enzýmy',
            link: '/probiotika',
            children: [],
          },
          {
            title: 'Rastlinné doplnky',
            link: '/rastlinne-doplnky',
            children: [],
          },
          {
            title: 'Pre lepší spánok',
            link: '/pre-lepsi-spanok',
            children: [],
          },
          {
            title: 'Proti kŕčom',
            link: '/proti-krcom',
            children: [],
          },
          {
            title: 'Vlasy, nechty a pokožka',
            link: '/vlasy-nechty-a-pokozka',
            children: [],
          },
          {
            title: 'Nootropiká a mozog',
            link: '/nootropika-a-mozog',
            children: [],
          },
          {
            title: 'Gaming',
            link: '/gaming',
            children: [],
          },
          {
            title: 'Podpora pečene',
            link: '/podpora-pecene',
            children: [],
          },
          {
            title: 'Proti starnutiu',
            link: '/proti-starnutiu',
            children: [],
          },
          {
            title: 'Huby',
            link: '/huby',
            children: [],
          },
          {
            title: 'Ostatné špeciálne doplnky výživy',
            link: '/ostatne-specialne-doplnky-vyzivy',
            children: [],
          },
        ],
      },
      {
        title: 'Doplnky výživy podľa cieľa',
        link: '/doplnky-vyzivy-podla-ciela',
        children: [
          {
            title: 'Budovanie svalovej hmoty',
            link: '/budovanie-svalovej-hmoty',
            children: [],
          },
          {
            title: 'Na chudnutie',
            link: '/na-chudnutie',
            children: [],
          },
          {
            title: 'Podpora regenerácie',
            link: '/podpora-regeneracie',
            children: [],
          },
          {
            title: 'Zlepšenie výkonu',
            link: '/zlepsenie-vykonu',
            children: [],
          },
          {
            title: 'Na podporu imunity',
            link: '/na-podporu-imunity',
            children: [],
          },
        ],
      },
      {
        title: 'Anabolizéry a stimulanty',
        link: '/86-anabolizerystimulanty',
        children: [
          {
            title: 'Predtréningové stimulanty',
            link: '/21-predtreningove-stimulanty',
            children: [],
          },
          {
            title: 'NO doplnky',
            link: '/no-doplnky',
            children: [],
          },
          {
            title: 'HMB',
            link: '/66-hmb',
            children: [],
          },
          {
            title: 'Náhrada steroidov',
            link: '/37-nahrada-steroidov',
            children: [],
          },
          {
            title: 'Kofeín',
            link: '/kofein',
            children: [],
          },
          {
            title: 'Beta-Alanín',
            link: '/beta-alanin',
            children: [],
          },
          {
            title: 'DAA',
            link: '/daa',
            children: [],
          },
        ],
      },
    ],
  },
  {
    title: 'Zdravé potraviny',
    link: '/zdrave-potraviny',
    children: [],
  },
  {
    title: 'Fitness oblečenie',
    link: '/fitness-oblecenie',
    children: [],
  },
  {
    title: 'Príslušenstvo',
    link: '/prislusenstvo',
    children: [],
  },
]

const open = reactive<Record<string, boolean>>({})

watchEffect(() => {
  open[route.path] = true

  for (const c1 of nav) {
    for (const c2 of c1.children) {
      if (c2.link === route.path) {
        open[c1.link] = true
        return
      }

      for (const c3 of c2.children) {
        if (c3.link === route.path) {
          open[c1.link] = true
          open[c2.link] = true
          return
        }

        for (const c4 of c3.children) {
          if (c4.link === route.path) {
            open[c1.link] = true
            open[c2.link] = true
            open[c3.link] = true
            return
          }
        }
      }
    }
  }
})

const isDesktopFiltersOpen = ref(false)
provide('$isDesktopFiltersOpen', isDesktopFiltersOpen)

const sortedBy = computed(() => String(route.query.sort ?? 'Best match'))
</script>

<i18n lang="yaml">
cs-CZ:
  Best match: nejlepší shoda
  'price,ASC': 'nejlevnějších'
  'price,DESC': 'nejdražších'
  'products_found': 'Nalezeno produktů: {0}'
en-US:
  'price,ASC': 'lowest price'
  'price,DESC': 'highest price'
  'products_found': 'Products found: {0}'
sk-SK:
  Best match: nejlepší shoda
  'price,ASC': 'nejlevnějších'
  'price,DESC': 'nejdražších'
  'products_found': 'Nalezeno produktů: {0}'
  Show filters: Zobraziť filtre
</i18n>

<style scoped>
.sidebar-navigation {
  @apply bg-grey-890 p-3;
}
.sidebar-navigation ul {
  @apply list-none p-0 m-0;
}

.sidebar-navigation ul.submenu {
  @apply pl-2 w-full;
}

.sidebar-navigation a {
  @apply text-sm transition-colors ease-in-out hover:text-secondary-500;
}

.sidebar-navigation li {
  @apply flex justify-between flex-wrap my-[15px];
}

.sidebar-navigation li:last-child {
  @apply mb-0;
}

.sidebar-navigation .parent > em {
  content: url('data:image/svg+xml; utf8, <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="rgba(0,0,0)" viewBox="0 0 28 28"><path d="M8.641 17.992l-1.641-1.641 7-7 7 7-1.641 1.641-5.359-5.359z"></path></svg>');
  @apply cursor-pointer w-[20px] rotate-180;
}

.sidebar-navigation a.level-top {
  @apply font-bold;
}
</style>
