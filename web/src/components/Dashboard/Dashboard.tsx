import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import CourseAPI from '../../requests/CourseAPI'
import type { CourseData, ITerm } from '../../utils/interfaces'
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

    const [search_subject, set_search_subject] = useState('')

    // * Processes search string
    // * abbr => full course name
    //   e.g. 'cs' => 'compsci'

    const parse_search_string = (search_string: string): string => {
        const replacement_dict: { [key: string]: string } = {
            cs: 'compsci',
            nst: 'nusctx',
            eng: 'english',
            ds: 'data',
            bio: 'biology',
            mcb: 'mcellbi',
            ib: 'integbi',
            ieor: 'indeng',
            ph: 'pbhlth',
        }

        var returned_string = search_string.toLowerCase()

        for (const key in replacement_dict) {
            returned_string.replace(key, replacement_dict[key])
        }

        return returned_string
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
            courses_this_term
                .filter(course => {
                    const match_string =
                        (search_subject ? search_subject + ' ' : '') +
                        search_string
                    return (
                        course.course_name
                            .toLowerCase()
                            .includes(parse_search_string(match_string)) ||
                        course.course_id.toString().includes(match_string)
                    )
                })
                .sort((course1, course2) => {
                    return (
                        parseInt(
                            (course1.course_name.match(/\d+/) ?? ['0'])[0]
                        ) -
                        parseInt((course2.course_name.match(/\d+/) ?? ['0'])[0])
                    )
                })
            // .splice(0, 11)
        )
    }, [courses_this_term, search_string])

    return (
        <Fragment>
            {/* Search Bar */}
            <div id="search-bar-container" className="mt-32 mb-[20px] mx-auto">
                <input
                    id="search-bar-subject"
                    className={`outline-0 ${
                        search_subject === '' ? 'hidden' : 'inline-block'
                    } w-auto text-xl pl-2 relative text-graphite bg-transparent bg-[#00000000] border-solid border-b-2 border-b-[#555] hover:border-b-[var(--accent)] focus:border-solid focus:border-b-2 focus:border-b-[var(--accent)]`}
                    placeholder={search_subject}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        set_search_subject(event.target.value.toUpperCase())
                    }}
                    value={search_subject}
                    onKeyUp={event => {}}
                />
                <input
                    id="searchBar"
                    className="outline-0 inline-block w-auto text-xl pl-2 relative text-graphite bg-transparent bg-[#00000000] border-solid border-b-2 border-b-[#555] hover:border-b-[var(--accent)] focus:border-solid focus:border-b-2 focus:border-b-[var(--accent)]"
                    placeholder="搜索课号"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        set_search_string(event.target.value.toLowerCase())
                    }}
                    value={search_string}
                    onKeyUp={event => {
                        if (event.key === 'Enter') {
                            if (
                                search_string ===
                                (search_string.match(/[a-zA-Z]+/) ?? [''])[0]
                            ) {
                                set_search_subject(search_string.toUpperCase())
                                set_search_string('')
                            }
                        }
                    }}
                />
            </div>
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
