'use client'

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "universal-cookie";

const AuthContext = createContext({ logout: () => {} });
const cookies = new Cookies()

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const logoutTimer = useRef<NodeJS.Timeout | null>(null);

    // Function to log out user
    const logout = () => {
        console.log("User logged out due to inactivity");
        setIsAuthenticated(false);
        cookies.remove("accessToken"); // Clear auth token
        router.push("/auth/login"); // Redirect to login page
    };

    // Function to reset timer on user activity
    const resetTimer = () => {
        if (logoutTimer.current) clearTimeout(logoutTimer.current);
        logoutTimer.current = setTimeout(logout, 60 * 60 * 60); // 1 hour (3600000 ms)
    };

    // Set up event listeners for user activity
    useEffect(() => {
        if (!isAuthenticated || pathname.startsWith("/auth")) return;
        
        const events = ["mousemove", "keydown", "click"];
        events.forEach(event => window.addEventListener(event, resetTimer));

        // Start initial timer
        resetTimer();

        return () => {
            events.forEach(event => window.removeEventListener(event, resetTimer));
            if (logoutTimer.current) clearTimeout(logoutTimer.current);
        };
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{ logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
