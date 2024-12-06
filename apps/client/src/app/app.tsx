import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from './routes/app-router-client';
const queryClient = new QueryClient();
import '../styles/index.scss';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  );
}

export default App;
