// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import styles from './app.module.scss';
import '../styles/index.scss';

import { Route, Routes, Link } from 'react-router-dom';
import { AppRouter } from './routes/app-router';
const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  );
}

export default App;
