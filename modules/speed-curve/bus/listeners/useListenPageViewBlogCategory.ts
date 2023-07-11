import useAddSpeedCurveLabel from '#ioc/composables/useAddSpeedCurveLabel'

export default () => {
  const addSpeedCurveLabel = useAddSpeedCurveLabel()

  return () => {
    addSpeedCurveLabel('blog-category-detail-page')
  }
}
