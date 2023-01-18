import { defineStore } from 'pinia'
import ToCompareItem from '#ioc/mappers/ToCompareItem'
import ToCompareAttribute from '#ioc/mappers/ToCompareAttribute'

export default defineStore('compareProducts', {
  state: () => ({
    items: [] as ReturnType<typeof ToCompareItem>[],
    attributes: [] as ReturnType<typeof ToCompareAttribute>[],
    comparisonListId: '',
  }),
})
