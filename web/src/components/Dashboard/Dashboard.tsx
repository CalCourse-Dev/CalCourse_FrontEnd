import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import CourseAPI from '../../requests/CourseAPI'
import type { CourseData, ITerm } from '../../utils/interfaces'

import QRCard from './QRCard/QRCard'
import CourseCard from './CourseCard/CourseCard.component'

const Dashboard = () => {
    const [courses, set_courses] = useState<Array<CourseData>>([])
    const [search_string, set_search_string] = useState('')
    const [courses_this_term, set_courses_this_term] = useState<
        Array<CourseData>
    >([])
    const [displayed_courses, set_displayed_courses] = useState<
        Array<CourseData>
    >([])

    // * Processes search string
    // * abbr => full course name
    //   e.g. 'cs' => 'compsci'

    const parse_search_string = (search_string: string): string => {
        switch (search_string.toLowerCase()) {
            case 'cs':
                return 'compsci'
            case 'nst':
                return 'nusctx'
            case 'eng':
                return 'english'
            case 'ds':
                return 'data'
            case 'bio':
                return 'biology'
            case 'mcb':
                return 'mcellbi'
            case 'ib':
                return 'integbi'
            case 'ieor':
                return 'indeng'
            case 'bioe':
                return 'bioeng'
            // case 'ph':
            //     return 'pbhlth'
            default:
                return search_string.toLowerCase()
        }
    }

    const terms: ITerm[] = [
        { school_name_and_term: 'UCB Su23', label: 'Summer 2023 课群' },
        { school_name_and_term: 'UCB Sp23', label: 'Spring 2023 课群' },
        // { school_name_and_term: "UCB Fa22", label: "Fall 2022 课群" },
        { school_name_and_term: 'UCB Mj01', label: '专业群' },
        { school_name_and_term: 'UCB Lf01', label: 'Cal Life' },
    ]

    // * hardcoded right now
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
                (res: any) => {
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
        console.log(courses)
        set_courses_this_term(
            courses.filter(({ school_name_and_term }) => {
                return school_name_and_term
                    .toLowerCase()
                    .includes(selected_term.school_name_and_term.toLowerCase())
            })
        )
    }, [courses, selected_term])

    // filter term when search_string is updated (i.e. user typing in input)
    useEffect(() => {
        console.log(courses_this_term)
        set_displayed_courses(
            courses_this_term.filter(course => {
                return (
                    course['course_name']
                        .toLowerCase()
                        .includes(parse_search_string(search_string)) ||
                    course['course_id'].toString().includes(search_string)
                )
            })
            // .splice(0, 11)
        )
    }, [courses_this_term, search_string])

    return (
        <Fragment>
            {/* Search Bar */}
            <input
                id="searchBar"
                className="outline-0 flex pt-32 mb-[20px] mx-auto w-[800px] text-xl pl-2 relative text-graphite bg-transparent bg-[#00000000] border-solid border-b-2 border-b-[#555] hover:border-b-[var(--accent)] focus:border-solid focus:border-b-2 focus:border-b-[var(--accent)]"
                placeholder="搜索课号"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    set_search_string(event.target.value.toLowerCase())
                }}
            />
            {/* Terms / Categories Bar */}
            <div
                id="filterBar"
                className="grid relative w-fit text-center grid-cols-4 my-[20px] mx-auto"
            >
                {terms.map(term => {
                    let selected =
                        term.school_name_and_term ===
                        selected_term.school_name_and_term

                    return (
                        <button
                            className={`w-[160px] min-w-[140px] p-[4px] rounded-[16px] mx-[8px] border-2 border-solid border-[var(--accent)] text-center ${
                                selected
                                    ? 'bg-[var(--accent)] text-[var(--p-fg)]'
                                    : 'bg-transparent text-[var(--accent)]'
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
                className="grid relative max-w-[800px] w-[90vw] my-[20px] mx-auto min-h-screen grid-cols-4 auto-rows-mi gap-[32px]"
            >
                {displayed_courses.map(course => {
                    return <CourseCard course={course} />
                })}

                {/* utility cards TODO: implement */}
                {/* {util_cards.map(card => UtilCard(card))} */}
            </div>
        </Fragment>
    )
}

export default Dashboard
