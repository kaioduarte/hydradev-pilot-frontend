import React from 'react';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route render={() => <p>Hello world!</p>} />
    </Switch>
  );
}

export default App;
