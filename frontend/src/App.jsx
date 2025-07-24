import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Home, Login, Signup, Dashboard } from './index.js';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { fetchUser } from './features/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { user, token } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={user && token ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/signup"
        element={user && token ? <Navigate to="/" /> : <Signup />}
      />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Root route - conditional redirect */}
      <Route
        path="/"
        element={
          user && token ? <Home /> : <Navigate to="/login" state={{ from: location }} replace />
        }
      />
    </Routes>
  );
};

export default App;