import { useContext, useEffect } from 'react'

import AppRoutes from './AppRoutes'

import { CourseDataContext } from './contexts/CourseData.context'

import CourseAPI from './requests/CourseAPI'

import './styles/defaults.css'
import './styles/theme.css'

import type { ICourseData } from './utils/interfaces/interfaces'
import { useUserLogInStatus } from './utils/hooks/useUserLogInStatus'
import { useUserContext } from './utils/hooks/useUserContext'

const App = () => {
    const { courses, set_courses } = useContext(CourseDataContext)
    const [user] = useUserContext()
    const log_in_status = useUserLogInStatus()
    useEffect(() => {
        const getCourses = async () => {
            console.log('App useEffect', user, log_in_status)
            CourseAPI.getAllCourses(
                user?.email ?? '',
                user?.access_token ?? '',
                (res: ICourseData[]) => {
                    if (res !== courses) {
                        set_courses(res)
                    }
                },
                (error: any) => {
                    // ! fix this: add in a customized card to tell user to contact support
                    console.log(error)
                }
            )
        }
        if (log_in_status) {
            getCourses()
        }
    }, [log_in_status])
    return <AppRoutes />
}

export default App
