import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
