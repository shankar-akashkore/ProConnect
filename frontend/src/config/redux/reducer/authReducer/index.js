import { createSlice } from "@reduxjs/toolkit";
import { getAboutUser, loginUser, registerUser } from "../../action/authAction";


const initialState = {
    user: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    loggedIn: false,
    message: "",
    isTokenThere: false,
    profileFetched: false,
    connections: [],
    connectionRequest: [],
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: () => initialState,
        handleLoginUser: (state) => {
            state.message = "hello"
        },
        emptyMessage: (state) => {
            state.message = ""
        },
        setTokenThere: (state, action) => {
            state.isTokenThere = true
        },
        setTokenIsNotThere: (state, action) => {
            state.isTokenThere = false
        }
    },

    extraReducers: (builder) => {

        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.message = "knocking the door......"
            })

            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.loggedIn = true;
                state.message = "Login Successful"
            })

            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message || "Something went wrong";
            })

            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.message = "Registering you.........."
            })

            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.loggedIn = true;
                state.message = "Registration is Successful, Please Login to continue";
            })

            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message || "Something went wrong";
            })
            .addCase(getAboutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.profileFetched = true;
                state.user = action.payload?.profile
            })
    }

})



export const { reset, emptyMessage, setTokenThere, setTokenIsNotThere } = authSlice.actions;

export default authSlice.reducer;