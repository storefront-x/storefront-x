import htmlDecode from '#ioc/utils/string/htmlDecode'

export default {
  computed: {
    innerHtml() {
      return htmlDecode(this.getInnerHtml(this.el))
    },
  },
}
