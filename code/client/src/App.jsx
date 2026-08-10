import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import PathEditorPage from './pages/PathEditorPage';

export default function App() {
  // Create a state variable named "status".
  // Initial value: "Reaching into the Labyrinth..."
  const [status, setStatus] = useState('Reaching into the Labyrinth...');

  // Runs once after the component is first rendered
  useEffect(() => {
    // Send a GET request to the backend
    fetch("http://localhost:5000/api/health")
      // Convert the response from JSON text into a JavaScript object
      .then((response) => response.json())
      // Update the state with the message
      .then((data) => {
        setStatus(data.message);
      })
      // If something goes wrong, catch the error
      .catch((error) => {
        console.error(error);
        setStatus('❌ Unable to connect to the server.');
      });
  }, []);

  return (
    <>
      {/* <h1 className="text-4xl font-bold">
        Labyrinth
      </h1> */}
      {/* Top Banner for Server Status */}
      <div className="bg-black text-white p-2 text-center border-b border-zinc-800">
        <p className="text-sm font-mono">{status}</p>
      </div>

      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />            
            <Route path="/register" element={<RegisterPage />} />   

            {/* Protected Routes component wrapper approach */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />

            <Route
              path='/path/:id'
              element={
                <ProtectedRoute>
                  <PathEditorPage/>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </>
  );
}
