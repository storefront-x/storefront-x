import { hydrate } from 'solid-js/web'
import App from '~/.sfx/App'

hydrate(() => <App />, document.getElementById('app')!)
