import * as React from 'react';

import { CPULoadProvider } from './components/cpu-load-provider/cpu-load-provider'
import { CurrentLoad } from './components/current-load/current-load'
import { HeavyLoad } from './components/heavy-load/heavy-load'
import { LoadHistory } from './components/load-history/load-history'

import './app.css';

export const App = () => {
  return (
    <CPULoadProvider>
      <h1>CPU Load Monitor</h1>
      <div className='dash-container'>
        <CurrentLoad />
        <HeavyLoad />
      </div>
      <LoadHistory />
    </CPULoadProvider>
  );
}

export default App;
