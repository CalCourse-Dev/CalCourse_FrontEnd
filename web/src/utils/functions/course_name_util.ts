import { SUBJECT_ABBR } from '../data/subject_abbr.data'

/** Processes search string for searching
 * abbr => full course name
 * @example 'cs189' => 'compsci 189'
 * @returns full course name + number
 */
export const process_search_string = (search_string: string): string => {
    let returned_string = search_string
        .toLowerCase()
        .replace(/[^a-z0-9\s,]/g, '')

    for (const key in SUBJECT_ABBR) {
        returned_string = returned_string.replace(
            new RegExp(`^${key}`),
            SUBJECT_ABBR[key]
        )
    }

    return standardize_course_name(returned_string)
}

/** Processes course_name for searching
 *
 * @example 'DATA C100' => 'data 100'
 * @returns lowercase course name with leading c in course number removed
 */
export const process_course_name = (course_name: string): string => {
    return standardize_course_name(course_name)
}

/** Standardize course name / search string
 * removes special number tags like ['c', 'w', 'n']
 * @returns
 */
const standardize_course_name = (course_name: string): string => {
    const resplit = course_name
        .toLowerCase()
        .replace(' ', '')
        .replace(/([a-z]*)(.*)/, '$1 $2')
        .split(' ')

    let dept = resplit[0]

    // NOTE: This is a shortcut for removing trailing c's in department names
    // If there are more than one c's, they will all be removed to keep consistency
    // eg. 'DataCCC100' => 'Data100'
    // It might cause problems in the future if the university change the department names, but it's good for now
    for (const char of ['c', 'w', 'n']) {
        const key = new RegExp(`${char}+$`)
        if (dept.match(key)) {
            dept = dept.replace(key, '')
            break
        }
    }
    const num = resplit[1]

    if (dept === '') {
        return num
    } else if (num === '') {
        return dept
    } else {
        return dept + ' ' + num
    }
}
