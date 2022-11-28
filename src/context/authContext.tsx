import React, { Children, createContext, useContext, useState } from "react";

import { IUserContext } from '../components/types'

interface IAuthContext {
    isSigned: boolean,
    user: IUserContext
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<IUserContext | null>(true)

    //return {user};
    return (
        <AuthContext.Provider value={{ user, isSigned: !!user, }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);;
};