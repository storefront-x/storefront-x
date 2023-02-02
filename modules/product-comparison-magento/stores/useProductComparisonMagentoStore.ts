import { defineStore } from 'pinia'
import ToCompareList from '#ioc/mappers/ToCompareList'

export default defineStore('compareProducts', {
  state: () => ({
    compareList: undefined as ReturnType<typeof ToCompareList> | undefined | null,
  }),
})
