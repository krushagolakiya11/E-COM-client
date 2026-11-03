import { Route, Routes } from "react-router-dom"
import Login from "./components/login/Login"
import ProtectedRoutes from "./components/layout/ProtectedRoutes"
import Layout from "./components/layout/Layout"
import Users from "./components/user/Users"


function App() {

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />}></Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route element={<Layout />}>
          <Route path="/" element={<h2 className="text-2xl font-bold">E-commerce App</h2>} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<h2 className="text-2xl font-bold p-6">Products</h2>} />
          <Route path="/orders" element={<h2 className="text-2xl font-bold p-6">Orders</h2>} />
        </Route>
      </Route>

      {/* Catch all 404 */}
      <Route path="*" element={<h2 className="flex h-screen items-center justify-center text-2xl font-bold">404 - Page not found</h2>} />
    </Routes>
  )
}

export default App
