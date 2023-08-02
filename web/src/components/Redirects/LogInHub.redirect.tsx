import { Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserLogInStatus } from '../../utils/hooks/useUserLogInStatus'

const Redirects = () => {
    const user_logged_in = useUserLogInStatus()
    const navigate = useNavigate()
    
    useEffect(() => {
        if (user_logged_in) {
            navigate('/dashboard')
        } else {
            navigate('/login')
        }
    }, [navigate, user_logged_in])

    return <Fragment />
}

export default Redirects
