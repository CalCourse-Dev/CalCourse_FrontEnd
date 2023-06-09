import { Dispatch, SetStateAction, createContext, useState } from 'react'
import type { ICourseData } from '../utils/interfaces'

export const CourseDataContext = createContext<{
    courses: ICourseData[]
    set_courses: Dispatch<SetStateAction<ICourseData[]>>
}>({ courses: [], set_courses: () => {} })

export const CourseDataContextProvider = ({ children }: { children: any }) => {
    const [courses, set_courses] = useState<ICourseData[]>([])
    return (
        <CourseDataContext.Provider value={{ courses, set_courses }}>
            {children}
        </CourseDataContext.Provider>
    )
}

export const CourseDataContextConsumer = ({ children }: { children: any }) => {
    return <CourseDataContext.Consumer>{children}</CourseDataContext.Consumer>
}
