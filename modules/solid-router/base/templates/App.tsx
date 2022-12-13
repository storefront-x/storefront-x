import { Component } from 'solid-js'
import { Router, useRoutes } from '@solidjs/router'
import { routes } from '~/.sfx/pages'

const App: Component = () => {
  const Routes = useRoutes(routes)

  return (
    <Router>
      <Routes />
    </Router>
  )
}

export default App
