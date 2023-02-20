import { inject } from 'vue'
import { useRoute } from 'vue-router'

export default () => inject('_route', () => useRoute())
