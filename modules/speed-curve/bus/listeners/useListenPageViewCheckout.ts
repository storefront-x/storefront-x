import useAddSpeedCurveLabel from '#ioc/composables/useAddSpeedCurveLabel'

export default () => {
  const addSpeedCurveLabel = useAddSpeedCurveLabel()

  return () => {
    addSpeedCurveLabel('checkout-page')
  }
}
