import { Fragment, useEffect } from 'react'
import { useUserLogInStatus } from '../../utils/hooks/useUserLogInStatus'
import { useUserContext } from '../../utils/hooks/useUserContext'

const LogOut = () => {
    const log_in_status = useUserLogInStatus()
    const [, set_user] = useUserContext()

    useEffect(() => {
        if (log_in_status) {
            sessionStorage.clear()
            set_user(null)
        }
    }, [log_in_status, set_user])

    return <Fragment />
}

export default LogOut
