import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { connect } from "react-redux";





export const loginUser = createAsyncThunk(
    "user/login",
    async (user, thunkAPI) => {
        try {

            const response = await clientServer.post(`/login`, {
                email: user.email,
                password: user.password
            });

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
            } else {
                return thunkAPI.rejectWithValue({
                    message: "token not provided"
                })
            }

            return thunkAPI.fulfillWithValue(response.data.token);

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || { message: error.message })
        }
    }
)

export const registerUser = createAsyncThunk(
    "user/register",
    async (user, thunkAPI) => {
        try {

            const request = await clientServer.post(`/register`, {
                username: user.username,
                name: user.name,
                email: user.email,
                password: user.password
            });

            return thunkAPI.fulfillWithValue(request.data);

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || { message: error.message })
        }
    }
)



export const getAboutUser = createAsyncThunk(
    "user/getAboutUser",
    async (user, thunkAPI) => {
        try {

            const response = await clientServer.get("/get_user_and_profile", {
                params: {
                    token: user.token
                }
            })

            return thunkAPI.fulfillWithValue(response.data);

        } catch(error) {
                return thunkAPI.rejectWithValue(error.response?.data)
        }
    }
)


export const getAllUsers = createAsyncThunk(
    "user/getAllUsers",
    async (_, thunkAPI) => {
        try {

            const response = await clientServer.get("/user/get_all_users")

            return thunkAPI.fulfillWithValue(response.data);
            
        } catch(error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)



// export const getConnectionsRequest = createAsyncThunk(
//   "connection/getConnectionsRequest",
//   async (data, thunkAPI) => {
//     try {

//       const response = await clientServer.get("/connections", {
//         params: {
//           token: data.token,
//           userId: data.userId
//         }
//       });

//       return thunkAPI.fulfillWithValue(response.data);

//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data);
//     }
//   }
// );



export const sendConnectionRequest = createAsyncThunk(
    "user/sendConnectionRequest",
    async (user, thunkAPI) => {
        try {

            const response = await clientServer.post("/user/send_connection_request" , {
                token: user.token,
                connectionId: user.user_id
            })

            thunkAPI.dispatch(getConnectionsRequest({ token: user.token }));

            return thunkAPI.fulfillWithValue(response.data);

        } catch(error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
)


export const getConnectionsRequest = createAsyncThunk(
    "user/getConnectionRequest",
    async (user, thunkAPI) => {
        try {

            const response = await clientServer.get("/user/getMyConnectionRequests", {
                params: {
                    token: user.token
                }
            })

            return thunkAPI.fulfillWithValue(response.data.connection);

        } catch(error) {
            return thunkAPI.rejectWithValue(error.response?.data.message);
        }
    }
)


export const getMyConnectionRequests = createAsyncThunk(
    "user/getMyConnectionRequests",
    async (user, thunkAPI) => {
        try {

            const response = await clientServer.get("/user/user_connection_request", {
                params: {
                    token: user.token
                }
            })

            return thunkAPI.fulfillWithValue(response.data);

        } catch(error) {
            return thunkAPI.rejectWithValue(error.response?.data.message);
        }
    }
)


export const AcceptConnection = createAsyncThunk(
    "user/acceptConnection",
    async (user, thunkAPI) => {
        try {

            const response = await clientServer.post("/user/accept_connection_request" , {
                token: user.token,
                connection_id: user.connectionId,
                action_type: user.action
            });

            return thunkAPI.fulfillWithValue(response.data);

        } catch(error) {
            return thunkAPI.rejectWithValue(error.response?.data.message);
        }
    }
)