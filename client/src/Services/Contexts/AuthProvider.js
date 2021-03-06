import { createContext, useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login, logout } from "../Actions/AuthAction";
import AuthReducer from "../Reducers/AuthReducer";
import { TOKENS, getTokens, removeTokens } from "../";
import { isRouteWithOutAuth } from "../../Routes";
import HttpClient from "../Api/HttpClient";

export const AuthContext = createContext(null);

function AuthProvider(props) {
    const [stateAuth, dispatchAuth] = useReducer(AuthReducer, { isAuth: false, id: -1 });
    const [isLoad, setIsLoad] = useState(() => !getTokens(TOKENS));
    console.log("provider render", stateAuth.isAuth);

    const location = useLocation();
    const navigate = useNavigate();

    const { pathname } = location;

    const Login = useCallback((id, callback) => {
        dispatchAuth(login(id));
        callback();
    }, []);

    const Logout = useCallback((callback) => {
        dispatchAuth(logout());
        callback();
    }, []);

    useEffect(() => {
        (async () => {
            const tokens = JSON.parse(getTokens(TOKENS));
            const accessToken = tokens?.accessToken;
            const refreshToken = tokens?.refreshToken;
            if (accessToken && refreshToken) {
                try {
                    const response = await HttpClient.get('/auth');
                    const { status, message, data: { id } } = response.data;
                    if (status && message === 'Token valid') {
                        Login(id, () => {
                            navigate(isRouteWithOutAuth(pathname) ? '/home' : pathname, { replace: true });
                        });
                    }
                } catch (error) {
                    if (error.response) {
                        const { status, message } = error.response.data;
                        if (!status && message === "Unauthorized") {
                            removeTokens(TOKENS);
                            Logout(() => {
                                navigate('/', { replace: true });
                            });
                        }
                    }
                    console.log("error", error.name);
                }
                setIsLoad(true);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const value = useMemo(() => ({ stateAuth, Login, Logout }), [stateAuth, Login, Logout]);

    return (
        <AuthContext.Provider value={value} >
            {isLoad && props.children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;