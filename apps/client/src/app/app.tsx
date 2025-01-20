import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from './routes/app-router-client';
const queryClient = new QueryClient();
import '../styles/index.scss';
import { useAuth } from './hooks/useAuth';
import { Button } from '@magnetic/ui';

export function App() {
  const { logoutClient, sessionExpired, showSessionExpiredError } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <dialog className={`modal ${sessionExpired && 'modal-open'}`}>
        <div className="modal-box">
          <h3 className="text-lg font-bold">Session Expired</h3>
          <p className="py-4">
            Your session has expired. Please log in again to continue.
          </p>
          <div className="modal-action">
            <form method="dialog">
              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={() => {
                    showSessionExpiredError(false);
                    logoutClient();
                  }}
                >
                  Login Again
                </Button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </QueryClientProvider>
  );
}

export default App;
