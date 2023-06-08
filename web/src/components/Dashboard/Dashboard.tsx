import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import CourseAPI from '../../requests/CourseAPI'
import type { CourseData, ITerm } from '../../utils/interfaces'
import CourseCard from './CourseCard/CourseCard.component'
import { subject_abbr } from '../../utils/subject_abbr.data'

const Dashboard = () => {
    const [courses, set_courses] = useState<Array<CourseData>>([])
    const [search_string, set_search_string] = useState('')
    const [courses_this_term, set_courses_this_term] = useState<
        Array<CourseData>
    >([])
    const [displayed_courses, set_displayed_courses] = useState<
        Array<CourseData>
    >([])

    /** Processes search string for searching
     * abbr => full course name
     * @example 'cs189' => 'compsci 189'
     * @returns full course name + number
     */
    const process_search_string = (search_string: string): string => {
        var returned_string = search_string.toLowerCase()

        const add_space_after_subject = (s: string): string => {
            return s.replace(/([a-z])(\d)/, '$1 $2')
        }

        for (const key in subject_abbr) {
            returned_string = returned_string.replace(
                new RegExp(`^${key}`),
                subject_abbr[key]
            )
        }

        return add_space_after_subject(remove_leading_char(returned_string))
    }

    /** Processes course_name for searching
     *
     * @example 'DATA C100' => 'data 100'
     * @returns lowercase course name with leading c in course number removed
     */
    const process_course_name = (course_name: string): string => {
        return remove_leading_char(course_name.toLowerCase())
    }

    const remove_leading_char = (course_name: string): string => {
        return course_name
            .replace(/^[A-Za-z](?=\d)/, ' ')
            .replace(/\s[A-Za-z]/, ' ')
    }

    const terms: ITerm[] = [
        { school_name_and_term: 'UCB Su23', label: 'Summer 2023 课群' },
        { school_name_and_term: 'UCB Fa23', label: 'Fall 2023 课群' },
        { school_name_and_term: 'UCB Mj01', label: '专业群' },
        { school_name_and_term: 'UCB Lf01', label: 'Cal Life' }
    ]

    const [selected_term, set_selected_term] = useState<ITerm>(terms[0])

    // TODO: integrate this into the buttons on the side
    // const util_cards = [
    //     { icon: "📃", label: "申请建群" },
    //     { icon: "⬆️", label: "故障报告" },
    //     { icon: "🔒", label: "退出登陆" },
    // ]

    // fetch courses when intitially loaded
    useEffect(() => {
        const getCourses = async () => {
            // ! hard coded for testing, fix before deploying
            CourseAPI.getAllCourses(
                'CalCourseDevAdmin@berkeley.edu',
                '123456',
                (res: CourseData[]) => {
                    set_courses(res)
                },
                (error: any) => {
                    console.log(error)
                }
            )
        }
        getCourses()
    }, [])

    // filter courses when selecting new term / category
    useEffect(() => {
        set_courses_this_term(
            courses.filter(({ school_name_and_term }) => {
                return (
                    school_name_and_term.toLowerCase() ===
                    selected_term.school_name_and_term.toLowerCase()
                )
            })
        )
    }, [courses, selected_term])

    // filter term when search_string is updated (i.e. user typing in input)
    useEffect(() => {
        set_displayed_courses(
            courses_this_term
                .filter(({ course_id, course_name }: CourseData) => {
                    return (
                        process_course_name(course_name).includes(
                            process_search_string(search_string)
                        ) || course_id.includes(search_string)
                    )
                })
                .sort((course1, course2) => {
                    return (
                        parseInt(
                            (course1.course_name.match(/\d+/) ?? [
                                course1.course_id
                            ])[0]
                        ) -
                        parseInt(
                            (course2.course_name.match(/\d+/) ?? [
                                course2.course_id
                            ])[0]
                        )
                    )
                })
            // .splice(0, 11)
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courses_this_term, search_string])

    return (
        <Fragment>
            {/* Search Bar */}

            <div id="search-bar-container" className="w-full flex">
                <input
                    id="search-bar"
                    className="mt-32 mx-auto outline-0 inline-block w-[90%] text-xl pl-2 relative text-graphite bg-transparent border-solid border-b-2 border-b-[#555] hover:border-b-accent focus:border-solid focus:border-b-2 focus:border-b-accent"
                    placeholder="搜索课号"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        set_search_string(event.target.value.toLowerCase())
                    }}
                    value={search_string}
                />
            </div>

            {/* Terms / Categories Bar */}
            <div
                id="filterBar"
                className="group grid relative w-fit text-center grid-cols-4 my-8 mx-auto"
            >
                {terms.map(term => {
                    let selected =
                        term.school_name_and_term ===
                        selected_term.school_name_and_term

                    return (
                        <button
                            className={`font-medium transition-background duration-150 w-[160px] min-w-[140px] p-[4px] rounded-[16px] mx-[8px] border-2 border-solid border-accent text-center ${
                                selected
                                    ? 'bg-accent text-white'
                                    : 'bg-transparent text-accent hover:opacity-75 hover:bg-accent hover:text-white'
                            }`}
                            key={term.school_name_and_term}
                            onClick={() => set_selected_term(term)}
                        >
                            {term.label}
                        </button>
                    )
                })}
            </div>

            {/* Actual Courses */}
            <div
                id="main-container"
                className="grid relative max-w-[800px] w-[90%] my-[20px] mx-auto min-h-screen grid-cols-4 gap-[32px] auto-rows-min"
            >
                {displayed_courses.map(course => {
                    return (
                        <CourseCard
                            key={course.course_qr_code_url}
                            course={course}
                        />
                    )
                })}

                {/* utility cards TODO: implement */}
                {/* {util_cards.map(card => UtilCard(card))} */}
            </div>
        </Fragment>
    )
}

export default Dashboard
