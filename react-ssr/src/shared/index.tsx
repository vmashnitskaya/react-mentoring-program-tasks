import * as React from 'react'
import "./index.scss";

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <h1>Hello World from TypeScript! 📦 🚀</h1>
        <img src={"/images/404.png"}/>
      </div>
    )
  }
}
