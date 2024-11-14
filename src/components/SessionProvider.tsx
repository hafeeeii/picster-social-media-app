'use client'
import { Session, User } from "lucia"
import { createContext, useContext } from "react";



type SessioncontextT = {
    user: User;
    session: Session
}

const SessionContext = createContext<SessioncontextT | null>(null)

type Props = {
    children: React.ReactNode;
    value: SessioncontextT
}

export default function SessionProvider(props: Props) {
    const { children, value } = props

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    )
}

export function useSession() {
    const context = useContext(SessionContext)
    if (!context) {
        throw new Error("useSession must be used within a SessionProvider");
    }
    return context
}