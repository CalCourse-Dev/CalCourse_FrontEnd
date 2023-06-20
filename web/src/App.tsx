import { useContext, useEffect } from 'react'

import AppRoutes from './AppRoutes'

import { CourseDataContext } from './contexts/CourseData.context'

import CourseAPI from './requests/CourseAPI'

import './styles/defaults.css'
import './styles/theme.css'

import type { ICourseData } from './utils/interfaces/interfaces'

const App = () => {
    const { set_courses } = useContext(CourseDataContext)
    useEffect(() => {
        const getCourses = async () => {
            // ! hard coded for testing, fix before deploying
            CourseAPI.getAllCourses(
                'CalCourseDevAdmin@berkeley.edu',
                '123456',
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
