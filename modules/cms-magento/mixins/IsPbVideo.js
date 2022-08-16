export default {
  computed: {
    advanced() {
      return {
        ...this.getAdvanced(this.el),
        ...this.getAdvanced(this._wrapperNode),
      }
    },

    src() {
      return this._videoNode.getAttribute('src')
    },

    autoplay() {
      return this._videoNode.getAttribute('autoplay') === 'true'
    },

    muted() {
      return this._videoNode.getAttribute('muted') === 'true'
    },

    _wrapperNode() {
      return this.el.querySelector('[data-element=wrapper]')
    },

    _videoNode() {
      return this.el.querySelector('[data-element=video]')
    },
  },
}
