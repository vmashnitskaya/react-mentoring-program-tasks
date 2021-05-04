import * as React from 'react'
import "./index.scss";
import loadable from '@loadable/component';

const Logo = loadable(() => import('../client/components/common/Logo/Logo'));
const Router = loadable(() => import('../client/components/App'));
const Footer = loadable(() => import('../client/components/common/Footer/Footer'));

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <>
          <Logo />
          <Router />
          <Footer />
      </>
    )
  }
}
