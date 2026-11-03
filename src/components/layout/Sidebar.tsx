import { NavLink } from "react-router-dom"
import GKLogo from "../../assets/G-KLogo.png"

const menu = [
    {label: "Dashboard", path: "/"},
    {label: "Users", path: "/users"},
    {label: "Products", path: "/products"},
    {label: "Orders", path: "/orders"},
]

function Sidebar() {
  return (
    <aside className="w-50 h-full overflow-y-auto bg-slate-100 py-4 shrink-0">
        <nav className="flex flex-col">
            <div className="h-[1cm] w-full flex items-center justify-center mb-4 px-4">
                <img className="h-full w-full object-contain" src={GKLogo} alt="G-K Logo" />
            </div>
            {menu.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/"}
                    className={({ isActive}) => `px-5 py-3 text-indigo-900 ${isActive ? "bg-orange-500 text-white hover:bg-orange-600" : ""}`}
                >
                    {item.label}
                </NavLink>
            ))}

        </nav>
    </aside>
  )
}

export default Sidebar