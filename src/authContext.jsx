import React, { useReducer } from "react";
import MkdSDK from "./utils/MkdSDK";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const token = action.payload;
      localStorage.setItem("token", token);
      sdk.setAuthToken(token);
      const user =  sdk.getMe();
      localStorage.setItem("user", JSON.stringify(user));
      const role = user.role;
      localStorage.setItem("role", role);
      return {
      ...state,
      isAuthenticated: true,
      user,
      token,
      role,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "Logout",
    });
    window.location.href = "/" + role + "/login";
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
    sdk.setAuthToken(token);
    sdk.checkTokenValidity()
    .then(res => {
    if (res.status === 200) {
    dispatch({ type: "LOGIN", payload: token });
    }
    })
    .catch(err => {
    if (err.response.status === 401) {
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
    }
    });
    }
    }, []);
    
    
    

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
