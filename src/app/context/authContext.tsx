'use client'

import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import SessionTimeoutAlert from "./components/sessionTimeoutAlert";
import { setupInterceptors } from "../utils/apis/axiosInstance";

const AuthContext = createContext<{
    logout : (showAlert? : boolean)=>void
}>({ 
    logout: () => {}
 });
const cookies = new Cookies();

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [showSessionAlert, setShowSessionAlert] = useState<boolean>(false);
    const logoutTimer = useRef<number | null>(null);

    // 🔹 Logout function: Clears session & optionally shows alert
    const logout = useCallback((showAlert = true) => {
        setIsAuthenticated(false);
        cookies.remove("accessToken");

        if (pathname.startsWith("/auth")){
            return setShowSessionAlert(false);
        }

        if (showAlert) {
            setShowSessionAlert(true);
        } else {
            router.push("/auth/login"); // Redirect immediately if no token
        }
    }, [router, pathname]);

    // 🔹 Reset inactivity timer (triggers logout after inactivity)
    const resetTimer = useCallback(() => {
        if (logoutTimer.current) clearTimeout(logoutTimer.current);
        logoutTimer.current = window.setTimeout(() => {
            console.log("timeout")
            logout(true)
        }, 60 * 60 * 1000);
    }, [logout]);

    // 🔹 Check token on app load
    useEffect(() => {
        const token = cookies.get("accessToken");

        if (!token) {
            logout(false); // No token? Redirect immediately
        } else {
            setIsAuthenticated(true);
        }
        setupInterceptors(logout); // Setup API interceptors
    }, [logout]);

    // 🔹 Track user activity & reset inactivity timer
    useEffect(() => {
        if (isAuthenticated && pathname.startsWith("/auth")) {
            router.push("/"); // Redirect to home page
        }

        if (!isAuthenticated || pathname.startsWith("/auth")) return;


        const events = ["mousemove", "keydown", "click"];
        events.forEach(event => window.addEventListener(event, resetTimer));

        resetTimer(); // Start initial timer

        return () => {
            events.forEach(event => window.removeEventListener(event, resetTimer));
            if (logoutTimer.current) clearTimeout(logoutTimer.current);
        };
    }, [isAuthenticated, pathname, resetTimer]);

    return (
        <AuthContext.Provider value={{ logout }}>
            {children}
            {showSessionAlert && pathname.startsWith("/auth") &&(
                <SessionTimeoutAlert show={showSessionAlert} />
            )}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
