import React from 'react';
import { Counter } from 'stores';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';

import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
          {Counter.count}
        </p>
        <Button type="primary" onClick={() => Counter.inc()}>
          Up
        </Button>
      </header>
    </div>
  );
}

export default observer(App);
