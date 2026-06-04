import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "@/config/api-url";
import { useDispatch } from "react-redux";
import { setUser as setReduxUser } from "@/store/auth-slice";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [adminToken, setAdminToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function restoreAuth() {
      const uToken = localStorage.getItem("vc_user_token");
      const aToken = localStorage.getItem("vc_admin_token");

      let userPromise = Promise.resolve(null);
      let adminPromise = Promise.resolve(null);
      let validatedUser = null;

      if (uToken) {
        userPromise = axios
          .get(`${API_URL}/api/auth/verify`, {
            headers: { Authorization: `Bearer ${uToken}` },
          })
          .then((res) => {
            if (res.data?.valid && res.data?.user) {
              setUserToken(uToken);
              setUser(res.data.user);
              validatedUser = res.data.user;
              dispatch(setReduxUser(res.data.user));
            } else {
              localStorage.removeItem("vc_user_token");
            }
          })
          .catch((err) => {
            console.error("User token validation failed:", err);
            localStorage.removeItem("vc_user_token");
          });
      }

      if (aToken) {
        adminPromise = axios
          .get(`${API_URL}/api/auth/verify`, {
            headers: { Authorization: `Bearer ${aToken}` },
          })
          .then((res) => {
            if (res.data?.valid && res.data?.admin) {
              setAdminToken(aToken);
              setAdmin(res.data.admin);
              validatedUser = res.data.admin;
              dispatch(setReduxUser(res.data.admin));
            } else {
              localStorage.removeItem("vc_admin_token");
            }
          })
          .catch((err) => {
            console.error("Admin token validation failed:", err);
            localStorage.removeItem("vc_admin_token");
          });
      }

      try {
        await Promise.all([userPromise, adminPromise]);
      } catch (err) {
        console.error("Auth restoration error:", err);
      } finally {
        setLoading(false);
        if (!validatedUser) {
          dispatch(setReduxUser(null));
        }
      }
    }

    restoreAuth();
  }, [dispatch]);

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/user/login`, {
        email,
        password,
      });

      if (response.data?.success) {
        const token = response.data.token;
        const loggedInUser = response.data.user;

        localStorage.setItem("vc_user_token", token);
        setUserToken(token);
        setUser(loggedInUser);
        dispatch(setReduxUser(loggedInUser));

        return { success: true };
      } else {
        return {
          success: false,
          error: response.data?.message || "Login failed.",
        };
      }
    } catch (error) {
      console.error("User login error:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Server or network error.",
      };
    }
  };

  const registerUser = async (name, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/user/register`, {
        name,
        email,
        password,
      });

      if (response.data?.success) {
        const token = response.data.token;
        const newUser = response.data.user;

        localStorage.setItem("vc_user_token", token);
        setUserToken(token);
        setUser(newUser);
        dispatch(setReduxUser(newUser));

        return { success: true };
      } else {
        return {
          success: false,
          error: response.data?.message || "Registration failed.",
        };
      }
    } catch (error) {
      console.error("User register error:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Server or network error.",
      };
    }
  };

  const loginAdmin = async (email, password, adminCode) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/admin/login`, {
        email,
        password,
        adminCode,
      });

      if (response.data?.success) {
        const token = response.data.token;
        const loggedInAdmin = response.data.admin;

        localStorage.setItem("vc_admin_token", token);
        setAdminToken(token);
        setAdmin(loggedInAdmin);
        dispatch(setReduxUser(loggedInAdmin));

        return { success: true };
      } else {
        return {
          success: false,
          error: response.data?.message || "Login failed.",
        };
      }
    } catch (error) {
      console.error("Admin login error:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Server or network error.",
      };
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("vc_user_token");
    setUserToken(null);
    setUser(null);
    dispatch(setReduxUser(null));
    window.location.href = "/auth/login";
  };

  const logoutAdmin = () => {
    localStorage.removeItem("vc_admin_token");
    setAdminToken(null);
    setAdmin(null);
    dispatch(setReduxUser(null));
    window.location.href = "/auth/admin/login";
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        userToken,
        adminToken,
        loading,
        loginUser,
        registerUser,
        loginAdmin,
        logoutUser,
        logoutAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
