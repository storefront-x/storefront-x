import { computed, reactive } from 'vue'

export default (props: any) => {
  const hasBackgroundImage = computed(() => {
    return !!props.data.backgroundMedia?.url
  })

  const image = computed(() => {
    return props.data.backgroundMedia?.url
  })

  const styles = computed(() => {
    return {
      'background-color': props.data.backgroundColor,
      'background-image': `url(${image.value})`,
      'background-size': props.data.backgroundMediaMode,
      'padding-top': props.data.marginTop,
      'padding-bottom': props.data.marginBottom,
      'padding-left': props.data.marginLeft,
      'padding-right': props.data.marginRight,
    }
  })

  const classes = computed(() => props.data.cssClass)

  const verticalAlign = (item: any) => {
    if (!item.config?.verticalAlign?.value) {
      return ''
    }

    return `align-items: ${item.config.verticalAlign.value}`
  }

  const hasChildren = computed(() => {
    return props.data.slots?.length > 0
  })

  return reactive({
    hasBackgroundImage,
    image,
    styles,
    verticalAlign,
    hasChildren,
    classes,
  })
}
