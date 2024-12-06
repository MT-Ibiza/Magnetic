import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from './routes/app-router';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import '../styles/index.scss';
const queryClient = new QueryClient();
import { Toaster, toast } from 'sonner';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
