import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Home, Login, Signup, Dashboard } from './index.js';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { fetchUser } from './features/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token, loading } = useSelector((state) => state.user);


  useEffect(() => {
    if (!user && token && !loading) {
      dispatch(fetchUser());
    }
  }, [user, token, loading, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    )
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /> </ProtectedRoute>} />
      <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
    </Routes>
  );
};

export default App;