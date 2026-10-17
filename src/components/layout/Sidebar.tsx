import { NavLink } from "react-router-dom"

const menu = [
    {label: "Dashboard", path: "/"},
    {label: "Products", path: "/products"},
    {label: "Users", path: "/users"},
    {label: "Orders", path: "/orders"},
]

function Sidebar() {
  return (
    <aside className="w-56 overflow-y-auto bg-slate-100 py-4">
        <nav className="flex flex-col">
            {menu.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/"}
                    className={({ isActive}) => `px-5 py-3 text-slate-700 hover:bg-slate-200 ${isActive ? "bg-blue-500 text-white hover:bg-blue-500" : ""}`}
                >
                    {item.label}
                </NavLink>
            ))}

        </nav>
    </aside>
  )
}

export default Sidebar