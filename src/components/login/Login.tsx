import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../api/axios';

export default function Login(){
    const navigate = useNavigate();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const res = await api.post("/api/users/login", {email, password});
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/");
        } catch (error: any) {
            setError(error.response?.data?.message || "Login failed");
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-900">
            <form className="w-full max-w-sm space-y-4 rounded-xl bg-white p-8 shadow-md" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-slate-800">Login</h2>
                {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required    
                    className="w-full rounded-md border border-slate-800 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                <input
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-md border border-slate-800 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                <button type="submit" className="w-full rounded-md bg-blue-500 py-2 font-medium text-white hover:bg-blue-600">Login</button>
            </form>
        </div>
    )
}