// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import '../styles/index.scss';

import { Route, Routes, Link } from 'react-router-dom';
import { AppRouter } from './routes/app-router';

export function App() {
  return (
    <AppRouter />
  );
}

export default App;
