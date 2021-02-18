import React from 'react';
import Greeting from './Greeting';
import Button from "./Button";
import Link from "./Link";

function App() {

  const infoText = React.createElement('div', null, "Some info text");

  return (
    <div className="App">
      <Greeting />
      <Button />
      <Link />
      {infoText}
    </div>
  );
}

export default App;
