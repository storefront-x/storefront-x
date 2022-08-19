<template>
  <Container class="py-16">
    <div class="text-center">
      <h2 class="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
        {{ t('title') }}
      </h2>
      <p class="mt-3 mx-auto text-xl text-gray-500 sm:mt-4">
        {{ t('subtitle') }}
      </p>
    </div>

    <div class="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <BlogPostTile v-for="post in data.posts" :key="post.id" :post="post" />
    </div>
  </Container>
</template>

<script setup lang="ts">
import Container from '#ioc/atoms/Container'
import useI18n from '#ioc/composables/useI18n'
import useGetPosts from '#ioc/services/useGetPosts'
import BlogPostTile from '#ioc/molecules/BlogPostTile'
import useAsyncData from '#ioc/composables/useAsyncData'


const { t } = useI18n()

const getPosts = useGetPosts()
const { data } = await useAsyncData('posts', () => getPosts())
</script>

<i18n lang="yaml">
en-US:
  title: MageXo blog
  subtitle: News from the Magento family.
cs-CZ:
  title: MageXo blog
  subtitle: Novinky a články ze světa Magento, stejně tak jako poslední novinky ze světa MageXo rodiny.
</i18n>
