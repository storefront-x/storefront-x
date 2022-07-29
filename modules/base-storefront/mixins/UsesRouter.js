import objectToQuery from '#ioc/utils/url/objectToQuery'

export default {
  methods: {
    pushQuery(query, params = {}) {
      this.$router.push({
        query: {
          ...this.$route.query,
          ...query,
        },
        params,
      })
    },

    getQuery(query) {
      return objectToQuery({
        ...this.$route.query,
        ...query,
      })
    },
  },
}
