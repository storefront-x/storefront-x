export default (callback: () => void) => requestIdleCallback(callback)
