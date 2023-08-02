import { Dispatch, SetStateAction, useContext } from 'react'
import { UserContext } from '../../contexts/User.context'
import type { IUser } from '../interfaces/interfaces'

export const useUserContext = (): [
    user: IUser | null,
    set_user: Dispatch<SetStateAction<IUser | null>>
] => {
    const { user, set_user } = useContext(UserContext)

    return [user, set_user]
}
