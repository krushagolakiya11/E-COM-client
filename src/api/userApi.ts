import api from "./axios";

export interface User{
    id: number,
    first_name: string;
    last_name: string;
    email: string;
    dob?: string | null;
    gender: string;
    phone?: string | null;
    is_verified: boolean;
}

export const getUser = async (): Promise<User[]> => {
    const response = await api.get("/api/users/");
    return response.data.data;   // server returns { data: User[], meta: {...} }
}