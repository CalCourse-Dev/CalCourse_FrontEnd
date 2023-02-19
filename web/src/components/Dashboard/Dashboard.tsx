import { ChangeEvent, useEffect, useState } from "react"
import CourseAPI from "../../requests/CourseAPI"
import type { CourseData } from "../../utils/interfaces"

import QRCard from "./QRCard/QRCard"

const Dashboard = () => {
    const [courses, set_courses] = useState<Array<CourseData>>([])
    const [search_string, set_search_string] = useState("")
    const [courses_this_term, set_courses_this_term] = useState<
        Array<CourseData>
    >([])
    const [displayed_courses, set_displayed_courses] = useState<
        Array<CourseData>
    >([])

    // * hardcoded right now
    const [selected_term, set_selected_term] = useState("UCB Sp23")

    const terms = [
        { school_name_and_term: "UCB Sp23", label: "Spring 2023 课群" },
        // { school_name_and_term: "UCB Fa22", label: "Fall 2022 课群" },
        { school_name_and_term: "UCB Mj01", label: "专业群" },
        { school_name_and_term: "UCB Lf01", label: "Cal Life" },
    ]

    // TODO: integrate this into the buttons on the side
    // const util_cards = [
    //     { icon: "📃", label: "申请建群" },
    //     { icon: "⬆️", label: "故障报告" },
    //     { icon: "🔒", label: "退出登陆" },
    // ]

    useEffect(() => {
        const getCourses = async () => {
            // ! hard coded for testing, fix before deploying
            CourseAPI.getAllCourses(
                "CalCourseDevAdmin@berkeley.edu",
                "123456",
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

    useEffect(() => {
        console.log(courses)
        set_courses_this_term(
            courses.filter(course => {
                return course["school_name_and_term"]
                    .toLowerCase()
                    .includes(selected_term.toLowerCase())
            })
        )
    }, [courses, selected_term])

    useEffect(() => {
        console.log(courses_this_term)
        set_displayed_courses(
            courses_this_term.filter(course => {
                return (
                    course["course_name"]
                        .toLowerCase()
                        .includes(search_string) ||
                    course["course_id"].toString().includes(search_string)
                )
            })
            // .splice(0, 11)
        )
    }, [courses_this_term, search_string])

    useEffect(() => {})

    return (
        <div id="main" className="bg-[#333]">
            <h1
                id="title"
                className="no-underline font-extrabold text-white my-0 mx-auto w-fit cursor-pointer pt-10 select-none text-[400%]"
            >
                Cal Course
            </h1>
            <input
                id="searchBar"
                className="outline-0 grid my-[20px] mx-auto w-[800px] text-xl pl-2 relative text-[#f0f8ff} bg-transparent border-solid border-b-2 border-b-[#555] hover:border-b-[#da8388] focus:border-solid focus:border-b-2 focus:border-b-[#da8388]"
                placeholder="搜索课号"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    set_search_string(event.target.value.toLowerCase())
                }}
            />
            <div
                id="filterBar"
                className="grid relative w-fit text-center grid-cols-4 my-[20px] mx-auto"
            >
                {terms.map(term => {
                    let selected = term["school_name_and_term"] === selected_term
                    
                    return (
                    <button
                        className={`w-[160px] min-w-[140px] p-[4px] rounded-[16px] mx-[8px] border-2 border-solid border-[var(--accent)] text-center ${selected ? "bg-[var(--accent)] text-[var(--p-fg)]" : "bg-transparent text-[var(--accent)]"}`}
                        key={term["school_name_and_term"]}
                        onClick={() =>
                            set_selected_term(term["school_name_and_term"])
                        }
                    >
                        {term["label"]}
                    </button>
                )})}
            </div>

            <div
                id="main-container"
                className="grid relative max-w-[800px] w-[90vw] my-[20px] mx-auto min-h-screen grid-cols-3 auto-rows-mi gap-[32px]"
            >
                {displayed_courses.map(course => QRCard(course))}

                {/* {util_cards.map(card => UtilCard(card))} */}
            </div>
        </div>
    )
}

export default Dashboard