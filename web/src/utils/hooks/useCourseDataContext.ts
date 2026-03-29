import { Dispatch, SetStateAction, useContext } from 'react'
import type { ICourseData } from '../interfaces/interfaces'
import { CourseDataContext } from '../../contexts/CourseData.context'
import { TERMS, updateTerms } from '../data/terms.data'
import { getSchoolIdFromEmail, getSchoolConfig } from './useSchool'

export const useCourseDataContext = (): [
    courses: ICourseData[],
    set_courses: Dispatch<SetStateAction<ICourseData[]>>
] => {
    const { courses, set_courses } = useContext(CourseDataContext)

    return [courses, set_courses]
}


export function processCourseData(res: ICourseData[], email: string): ICourseData[] {
    const schoolConfig = getSchoolConfig(getSchoolIdFromEmail(email))
    const school = schoolConfig.courseTerm

    // Remove the prefix from the school_name_and_term field
    const prefix = new RegExp("^" + school + " ");
    res = res.map((course) => {
        course.school_name_and_term = course.school_name_and_term.replace(prefix, '');
        return course;
    });

    // Use a set to keep track of unique terms
    const allTerms = new Set<string>();
    res.forEach((course) => {
        allTerms.add(course.school_name_and_term);
    });

    updateTerms(TERMS, allTerms);
     
    return res;
}