import * as React from 'react'
import "./index.scss";
import Logo from "../client/components/common/Logo/Logo";
import HomePage from "../client/components/HomePage";
import Footer from "../client/components/common/Footer/Footer";

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <>
          <Logo />
          <HomePage />
          <Footer />
      </>
    )
  }
}
