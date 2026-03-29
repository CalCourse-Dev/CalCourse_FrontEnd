import { Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserLogInStatus } from '../../utils/hooks/useUserLogInStatus'
import { useUserContext } from '../../utils/hooks/useUserContext'
import { getSchoolIdFromEmail } from '../../utils/hooks/useSchool'

const SCHOOL_LOGIN_PATHS: Record<string, string> = {
    stanford: '/stanford',
}

const LogOut = () => {
    const log_in_status = useUserLogInStatus()
    const [user, set_user] = useUserContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (log_in_status && user?.email) {
            const schoolId = getSchoolIdFromEmail(user.email)
            localStorage.clear()
            set_user(null)
            const redirectPath = SCHOOL_LOGIN_PATHS[schoolId] || '/login'
            navigate(redirectPath)
        }
    }, [log_in_status, set_user, user, navigate])

    return <Fragment />
}

export default LogOut
