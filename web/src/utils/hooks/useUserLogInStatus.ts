import { useContext } from 'react'
import { UserContext } from '../../contexts/User.context'

export const useUserLogInStatus = (): boolean => {
    const { user } = useContext(UserContext)

    return user !== null
}
