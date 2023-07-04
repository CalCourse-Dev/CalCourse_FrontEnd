import { Dispatch, SetStateAction, useContext } from 'react'
import { ICourseData } from '../interfaces/interfaces'
import { CourseDataContext } from '../../contexts/CourseData.context'

export const useCourseDataContext = (): [
    courses: ICourseData[],
    set_courses: Dispatch<SetStateAction<ICourseData[]>>
] => {
    const { courses, set_courses } = useContext(CourseDataContext)

    return [courses, set_courses]
}
