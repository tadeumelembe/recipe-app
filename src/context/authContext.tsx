import React, { ChildContextProvider, Children, createContext, useContext, useState } from "react";

import { IUserContext } from '../components/types'

interface IAuthContext {
    isSigned: boolean;
    signIn(): void;
    signOut(): void;
    user: IUserContext | null;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider: React.FC<Element> = ({ children }) => {
    const [user, setUser] = useState<IUserContext | null>(null)

    async function signIn() {
        setUser({
            id: '1',
            name: 'Tadeu Melembe',
            email: 'tadeumelembe@gmail.com'
        })
    }

    async function signOut() {
        setUser(null)
    }


    //return {user};
    return (
        <AuthContext.Provider value={{ user, isSigned: !!user, signOut, signIn, }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);;
};