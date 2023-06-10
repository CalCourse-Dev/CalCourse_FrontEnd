import { Fragment, useContext, useEffect } from 'react'
import { UserContext } from './contexts/User.context'
import { useNavigate } from 'react-router-dom'

const Redirects = () => {
    const user_logged_in = useContext(UserContext).user !== null
    const navigate = useNavigate()
    
    useEffect(() => {
        console.log(user_logged_in)
        if (user_logged_in) {
            navigate('/hub')
        } else {
            navigate('/login')
        }
    }, [navigate, user_logged_in])

    return <Fragment />
}

export default Redirects
