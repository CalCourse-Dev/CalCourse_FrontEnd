import { useContext, useEffect } from 'react'

import AppRoutes from './AppRoutes'

import { CourseDataContext } from './contexts/CourseData.context'

import CourseAPI from './requests/CourseAPI'

import './styles/defaults.css'
import './styles/theme.css'

import type { ICourseData } from './utils/interfaces/interfaces'
import { UserContext } from './contexts/User.context'

const App = () => {
    const { set_courses } = useContext(CourseDataContext)
    const { user } = useContext(UserContext)
    useEffect(() => {
        console.log(user)
        const getCourses = async () => {
            CourseAPI.getAllCourses(
                (user && user.email) ?? '',
                (user && user.access_token) ?? '',
                (res: ICourseData[]) => {
                    set_courses(res)
                },
                (error: any) => {
                    console.log(error)
                }
            )
        }
        getCourses()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return <AppRoutes />
}

export default App
