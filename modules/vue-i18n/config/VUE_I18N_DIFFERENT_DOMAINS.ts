import envBool from '#ioc/utils/envBool'

export default envBool(import.meta.env.I18N_DIFFERENT_DOMAINS, false)
