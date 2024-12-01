import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("loading");
    const [accessToken, setAccessToken] = useState("loading");
    const [refreshToken, setRefreshToken] = useState("loading");
    const [notification, setNotification] = useState(false)

    const login = (user, accessToken, refreshToken) => {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setUser({ 'user': user });
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

    };

    const logout = () => {
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    };

    const values = {
        user,
        setUser,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        login,
        logout,
        notification,
        setNotification
    };

    useEffect(() => {
        ; (async () => {
            const storedUser = await JSON.parse(localStorage.getItem("user"));
            const storedAccessToken = localStorage.getItem("accessToken");
            const storedRefreshToken = localStorage.getItem("refreshToken");

            setUser(storedUser);
            setAccessToken(storedAccessToken);
            setRefreshToken(storedRefreshToken);
        })()

    }, []);


    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );

};

