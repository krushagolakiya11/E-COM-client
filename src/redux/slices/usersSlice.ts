import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser, type User } from "../../api/userApi";

interface UsersState{
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UsersState ={
    users: [],
    loading: false,
    error: null,
};

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async () => { return await getUser();

    }
)

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? "Failed to fetch users";
        });
    }
})

export default usersSlice.reducer;