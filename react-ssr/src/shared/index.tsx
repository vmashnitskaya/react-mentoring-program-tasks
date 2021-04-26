import * as React from 'react'
import "./index.scss";
import Logo from "../client/components/common/Logo/Logo";
import Router from "../client/components/App";
import Footer from "../client/components/common/Footer/Footer";

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
