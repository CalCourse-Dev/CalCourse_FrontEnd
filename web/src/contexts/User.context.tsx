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
    const [user, set_user] = useState<IUser | null>(null)
    return (
        <UserContext.Provider value={{ user, set_user }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserContextConsumer = ({ children }: { children: any }) => {
    return <UserContext.Consumer>{children}</UserContext.Consumer>
}
