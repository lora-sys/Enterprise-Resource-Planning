import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'staff';
    permissions: string[];
}

interface AuthContextType {
    user: User | null;
    login: (credentials: { email: string, password: string }) => Promise<void>;
    logout: () => void;
    loading: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        // 从localStorage获取状态信息
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
        // component dismount status ,when use is logged in ,get message from localstorge browser
    }, []);

    // 使用 async function 登录，模拟从服务器获取用户信息
    const login = async ({ email, password }: { email: string, password: string }) => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 500)); //模拟延迟等待5秒后执行后续代码，
            // 模拟浏览器从开始到结束的工程，使用resolved作为参数
            const mockUser: User = {
                id: "1",
                name: email.includes('admin') ? "管理员" : "员工",
                email,
                role: email.includes('admin') ? 'admin' : 'staff',
                permissions: email.includes('admin') ? ['dashboard view', 'users.manage'] : ['dashboard view']
            };
            setUser(mockUser);
            setAuthenticated(true);
            localStorage.setItem('user', JSON.stringify(mockUser));
        } catch {
            throw new Error('login failed');
        } finally {
            setLoading(false);
        }
    };

    // 清除用户信息
    const logout = () => {
        setUser(null);
        setAuthenticated(false);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an Authprovider');
    }
    return context;
};