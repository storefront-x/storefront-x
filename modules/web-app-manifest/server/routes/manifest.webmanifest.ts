import { eventHandler } from 'h3'
import manifest from '~/.sfx/webAppManifest'

export default eventHandler(() => manifest)
