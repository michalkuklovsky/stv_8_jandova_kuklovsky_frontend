import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("unknown");

    const storeUser = async (email, is_admin) => {
        try {
            // console.log(JSON.stringify(email));
            // console.log(JSON.stringify(is_admin));
            // TO-DO zistit ci funguju JSONY !!
            // await AsyncStorage.setItem("user", JSON.stringify({email: email, is_admin: is_admin}));
            if (is_admin) {
                await AsyncStorage.setItem("role", "admin");
                setRole("admin");
            } else {
                await AsyncStorage.setItem("role", "user");
                setRole("user");
            }
            await AsyncStorage.setItem("email", JSON.stringify(email));
            setEmail(email);

        } catch (error) {
            console.log(error.message);
        }
    };

    const getUser = async () => {
        try {
            let savedRole = await AsyncStorage.getItem("role")
            if (savedRole)
                setRole(savedRole);
        } catch (error) {
            console.log("Error caught at getUser: " + error);
        }
    };

    const removeUser = async () => {
        try {
            await AsyncStorage.removeItem("role");
            await AsyncStorage.removeItem("email");
            setEmail("");
            setRole("unknown");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                email,
                role,
                storeUser,
                removeUser,
                getUser,
            }}>
            {children}
        </AuthContext.Provider>
    );
};
