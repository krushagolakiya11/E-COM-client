import { useNavigate } from "react-router-dom"

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }
  return (
    <header className="flex h-16 items-center justify-between bg-slate-800 px-6 text-white">
        <h1 className="text-xl font-semibold">E-comm</h1>
        <button 
            onClick={handleLogout}
            className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium hover:bg-red-600">
            Logout
        </button>
    </header>
  )
}

export default Header