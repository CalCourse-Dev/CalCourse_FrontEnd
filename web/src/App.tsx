import 'antd/dist/antd.css'
import './styles/theme.css'
import AppRoutes from './AppRoutes'
import { useContext, useEffect } from 'react'
import CourseAPI from './requests/CourseAPI'
import { ICourseData } from './utils/interfaces/interfaces'
import { CourseDataContext } from './contexts/CourseData.context'

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
    }, [])
    return <AppRoutes />
}

export default App
