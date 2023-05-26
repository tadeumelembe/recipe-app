import React, { ChildContextProvider, Children, createContext, useContext, useEffect, useMemo, useState } from "react";

import { IUserContext } from '../components/types'
import { auth, onAuthStateChanged } from "../../firebaseConfig";
import { signOut as firebaseSignOut } from "firebase/auth"

interface IAuthContext {
    isSigned: boolean;
    signIn(user: object): void;
    signOut(): void;
    user: IUserContext | null;
    loading: boolean
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider: React.FC<Element> = ({ children }) => {
    const [user, setUser] = useState<IUserContext | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        restoreState()
    }, [])

    function signIn(user: object) {
        setUser({
            id: user.uuid,
            name: user.displayName,
            email: user.email
        })
    }

    async function signOut() {
        firebaseSignOut(auth).then(() => {
            setUser(null)
        }).catch((error) => {
            alert('Somethingwent wrong. Please, try again')
        });
    }

    function restoreState() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                signIn(user)
            }
            setLoading(false)

        });
    }

    const memorizedValues = useMemo(
        () => ({
            user,
            isSigned: !!user,
            signOut,
            signIn,
            loading
        }), [user, loading]
    )


    //return {user};
    return (
        <AuthContext.Provider value={memorizedValues}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);;
};