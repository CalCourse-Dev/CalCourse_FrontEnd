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

    /** Processes search string
     * abbr => full course name
     * @example 'cs189' => 'compsci 189'
     * @returns full course name + number
     */
    const process_search_string = (search_string: string): string => {
        const replacement_dict: { [key: string]: string } = {
            cs: 'compsci',
            nst: 'nusctx',
            eng: 'english',
            ds: 'data',
            bio: 'biology',
            mcb: 'mcellbi',
            ib: 'integbi',
            ieor: 'indeng',
            ph: 'pbhlth'
        }

        var returned_string = search_string.toLowerCase()

        for (const key in replacement_dict) {
            returned_string = returned_string.replace(
                new RegExp(`^${key}`),
                replacement_dict[key]
            )
        }

        return returned_string
    }

    const process_course_name = (course_name: string): string => {
        const remove_leading_c = (course_name: string): string => {
            return course_name.replace(' c', ' ')
        }
        return remove_leading_c(course_name).toLowerCase()
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
                return school_name_and_term
                    .toLowerCase()
                    .includes(selected_term.school_name_and_term.toLowerCase())
            })
        )
    }, [courses, selected_term])

    // filter term when search_string is updated (i.e. user typing in input)
    useEffect(() => {
        set_displayed_courses(
            courses_this_term
                .filter(({course_id, course_name}: CourseData) => {
                    return (
                        process_course_name(course_name)
                        .includes(process_search_string(search_string)) ||
                        course_id.includes(search_string)
                    )
                })
                .sort((course1, course2) => {
                    return (
                        parseInt(
                            (course1.course_name.match(/\d+/) ?? [course1.course_id])[0]
                        ) -
                        parseInt((course2.course_name.match(/\d+/) ?? [course2.course_id])[0])
                    )
                })
            // .splice(0, 11)
        )
    }, [courses_this_term, search_string])

    return (
        <Fragment>
            {/* Search Bar */}

            <div id="search-bar-container" className="w-full flex">
                <input
                    id="search-bar"
                    className="mt-32 mb-[20px] mx-auto outline-0 inline-block w-[90%] text-xl pl-2 relative text-graphite bg-transparent bg-[#00000000] border-solid border-b-2 border-b-[#555] hover:border-b-[var(--accent)] focus:border-solid focus:border-b-2 focus:border-b-[var(--accent)]"
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
                className="group grid relative w-fit text-center grid-cols-4 my-[20px] mx-auto"
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
