import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./context/UserContext.jsx";

import Navigation from './components/Navigation.jsx'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Cart from './pages/Cart.jsx'
import Pizza from './pages/Pizza.jsx'
import Profile from './pages/Profile.jsx'
import NotFound from './pages/NotFound.jsx'

import './App.css'

export default function App() {
  const { token } = useContext(UserContext);
  return (
    <>
      <Navigation />

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={
              token ? <Navigate to="/" replace />
                : <Register />
            } />
          <Route path="/login" element={
            token ? <Navigate to="/" replace />
                : <Login />
            } />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza/:id" element={<Pizza />} />
          <Route path="/profile" element={
              token ? <Profile />
                : <Navigate to="/login" replace />
            }
          />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}