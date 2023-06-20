import PageViewLabel from '#ioc/bus/events/PageViewLabel'
import useAddSpeedCurveLabel from '#ioc/composables/useAddSpeedCurveLabel'

export default () => {
  const addSpeedCurveLabel = useAddSpeedCurveLabel()

  return (label: PageViewLabel) => {
    addSpeedCurveLabel(label)
  }
}
