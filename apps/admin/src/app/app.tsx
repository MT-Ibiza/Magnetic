// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HeaderApp } from '@magnetic/ui';
import styles from './app.module.scss';
import NxWelcome from './nx-welcome';

import { Route, Routes, Link } from 'react-router-dom';

export function App() {
  return (
    <div>
      <HeaderApp />
    </div>
  );
}

export default App;
