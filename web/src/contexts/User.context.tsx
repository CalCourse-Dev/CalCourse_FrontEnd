import { createContext, useState } from 'react'
import type { IUser } from '../utils/interfaces'

export const UserContext = createContext<{
    user: IUser | null
    set_user: (u: IUser) => void
}>({
    user: null,
    set_user: () => undefined,
})

export const UserContextProvider = ({ children }: { children: any }) => {
    const [user, set_user] = useState<IUser | null>(null)
    return (
        <UserContext.Provider value={{ user, set_user }}>
            {children}
        </UserContext.Provider>
    )
}