import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const login = createAsyncThunk("user/login", async (payload) => {
    try {
        const response = await axiosInstance.post("/auth/login", payload);
        if(!response.data.token) {
            throw new Error("No token");
        }
        console.log('siema z login', response.data.token);
        axiosInstance.defaults.headers.common["Authorization"] = response.data.token;
        const userInfo = await axiosInstance.get("/user");
        if(!userInfo.data){
            throw new Error("No user info");
        }
        console.log('siema z login ale pozniej', userInfo.data);
        return userInfo.data;
    } catch (error) {
        throw new Error(error);
    }

});

const userSlice = createSlice({
    name: "user",
    initialState: {
        email: "",
        name: "",
        lastName: "",
        role: "",
        id: ""

    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            console.log('siema z action meta arg',action.meta.arg);
            console.log(action.payload);
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.lastName = action.payload.lastName;
            state.role = action.payload.role;
            state.id = action.payload.id;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.email = "";
            state.name = "";
            state.lastName = "";
            state.role = "";
            state.id = "";
        });
        builder.addCase(login.pending, (state, action) => {
            state.email = "";
            state.name = "";
            state.lastName = "";
            state.role = "";
            state.id = "";
        });
    }
});

export default userSlice.reducer;


