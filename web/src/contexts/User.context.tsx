import { Dispatch, SetStateAction, createContext, useState } from 'react'
import type { IUser } from '../utils/interfaces/interfaces'

export const UserContext = createContext<{
    user: IUser | null
    set_user: Dispatch<SetStateAction<IUser | null>>
}>({
    user: null,
    set_user: () => undefined
})

export const UserContextProvider = ({ children }: { children: any }) => {
    const [user, set_user] = useState<IUser | null>(() => {
        // Restore user from localStorage on initial load
        try {
            const storedUser = JSON.parse(localStorage.getItem('user') ?? '{}');
            if ('email' in storedUser && 'access_token' in storedUser) {
                const TOKEN_EXPIRE_TIME = 6 * 60 * 60 * 1000; // 6 hours
                if (new Date().getTime() - storedUser.record_time < TOKEN_EXPIRE_TIME) {
                    return storedUser;
                }
                localStorage.removeItem('user');
            }
        } catch {
            // Ignore JSON parse errors
        }
        return null;
    })
    return (
        <UserContext.Provider value={{ user, set_user }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserContextConsumer = ({ children }: { children: any }) => {
    return <UserContext.Consumer>{children}</UserContext.Consumer>
}
