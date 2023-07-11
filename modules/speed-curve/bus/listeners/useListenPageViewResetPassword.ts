import useAddSpeedCurveLabel from '#ioc/composables/useAddSpeedCurveLabel'

export default () => {
  const addSpeedCurveLabel = useAddSpeedCurveLabel()

  return () => {
    addSpeedCurveLabel('reset-password-page')
  }
}
