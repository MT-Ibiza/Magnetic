import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

export const AppRouter = () => {
  const PendingPage = () => (
    <div className="text-center p-5">
      <h1>This Page is still pending</h1>
    </div>
  );
  const LayoutBlank = () => <Outlet />;

  return (
    <Routes>
      <Route path="login" element={<PendingPage />} />
      <Route element={<PendingPage />}>
        <Route path="/" element={<LayoutBlank />}>
          <Route path="dashboard" element={<PendingPage />} />
          <Route path="services" element={<PendingPage />} />
          <Route path="users" element={<PendingPage />} />
          <Route path="bookings" element={<PendingPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
