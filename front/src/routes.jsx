import { Route, Router, Routes } from "react-router-dom";
import AdminLogin from "./views/admin/login";
import { AdminDashboard } from "./views/admin/dashboard";
import { CreateStudent } from "./views/admin/dashboard/student/create";
import { ListStudent } from "./views/admin/dashboard/student/list";
import { ListBooks } from "./views/admin/dashboard/books/list";
import { ListLoans } from "./views/admin/dashboard/loans/list";
import { CreateBook } from "./views/admin/dashboard/books/create";

export default function AppRoutes()
{
    return (        
        <Routes>
            <Route path="/admin/auth" element={<AdminLogin />}></Route>
            <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>

            <Route path="/admin/student" element={<ListStudent />}></Route>
            <Route path="/admin/student/create" element={<CreateStudent />}></Route>

            <Route path="/admin/books" element={<ListBooks />}></Route>
            <Route path="/admin/books/create" element={<CreateBook />}></Route>

            <Route path="/admin/loans" element={<ListLoans />}></Route>

            <Route path="*" element={"Não encontrado!"}></Route>     
        </Routes>                
    )
}