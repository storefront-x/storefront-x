import { Component, Suspense } from 'solid-js'
import { Router, useRoutes } from '@solidjs/router'
import IS_SERVER from '#ioc/config/IS_SERVER'
import { routes } from '~/.sfx/pages'

interface Props {
  ctx: any
}

const App: Component<Props> = (props) => {
  const Routes = useRoutes(routes)

  return (
    <Suspense>
      <Router
        url={IS_SERVER ? props.ctx.req.url : window.location.pathname + window.location.search + window.location.hash}
      >
        <Routes />
      </Router>
    </Suspense>
  )
}

export default App
