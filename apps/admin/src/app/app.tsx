import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from './routes/app-router-admin';
const queryClient = new QueryClient();
import { Toaster } from 'sonner';
import '../styles/index.scss';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
