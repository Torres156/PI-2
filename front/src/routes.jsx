import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLogin from './views/admin/login'
import { AdminDashboard } from './views/admin/dashboard'
import { CreateStudent } from './views/admin/dashboard/student/create'
import { ListStudent } from './views/admin/dashboard/student/list'
import { ListBooks } from './views/admin/dashboard/books/list'
import { ListLoans } from './views/admin/dashboard/loans/list'
import { CreateBook } from './views/admin/dashboard/books/create'
import { CreateLoans } from './views/admin/dashboard/loans/create'
import { ListUsers } from './views/admin/dashboard/users/list'
import { CreateUsers } from './views/admin/dashboard/users/create'
import { Home } from './views/site/home'
import { Galeria } from './views/site/galeria'
import { Book } from './views/site/book'
import { GetResponse } from './app/helpers/httpHelper'
import React, { useEffect, useState } from 'react'
import { User } from './app/models/User'
import { Navigate, Outlet } from 'react-router-dom';
import { EditStudent } from './views/admin/dashboard/student/edit'
import { EditBook } from './views/admin/dashboard/books/edit'

export default function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  function AdminRoutes({ isAuthenticated }) {
    if (isAuthenticated === false) {
      return <Navigate to="/admin/auth" />;
    }
  
    return <Outlet />; // Renderiza as rotas de admin se autenticado
  }

  useEffect(() => {
    const checkAuth = async () => {
      const user = User.Get();
      if (user) {
        setIsAuthenticated(true);
        try {
          await GetResponse('');
          setIsAuthenticated(true);
        } catch (err) {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    
      <Routes>
        {/* Rotas de admin */}
        <Route element={<AdminRoutes isAuthenticated={isAuthenticated} />}>
          <Route path="/admin/*" element={<Navigate to='/admin/dashboard' />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          <Route path="/admin/student" element={<ListStudent />} />
          <Route path="/admin/student/create" element={<CreateStudent />} />
          <Route path="/admin/student/:id" element={<EditStudent />} />

          <Route path="/admin/books" element={<ListBooks />} />
          <Route path="/admin/books/create" element={<CreateBook />} />
          <Route path="/admin/books/:id" element={<EditBook />} />

          <Route path="/admin/loans" element={<ListLoans />} />
          <Route path="/admin/loans/create" element={<CreateLoans />} />
          <Route path="/admin/users" element={<ListUsers />} />
          <Route path="/admin/users/create" element={<CreateUsers />} />
        </Route>

        {/* Login do admin */}
        <Route path="/admin/auth" element={<AdminLogin />} />

        {/* Rotas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/book" element={<Book />} />

        {/* Página 404 */}
        <Route path="*" element={'Não encontrado!'} />
      </Routes>
    
  );
}

