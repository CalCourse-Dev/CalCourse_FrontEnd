import { ChangeEvent, useEffect, useState } from "react"
import CourseAPI from "../../requests/CourseAPI"
import type { CourseData } from "../../utils/interfaces"
import styled from "styled-components"

import "./Dashboard.scss"
import { Input } from "antd"
import QRCard from "./QRCard/QRCard"

import { CONSTANTS } from "../../utils/constants"

const BASE_URL = CONSTANTS.AWS_API_BASE_URL

const TestingDashboard = () => {
    const [courses, set_courses] = useState<Array<CourseData>>([])
    const [search_string, set_search_string] = useState("")
    const [courses_this_term, set_courses_this_term] = useState<
        Array<CourseData>
    >([])
    const [displayed_courses, set_displayed_courses] = useState<
        Array<CourseData>
    >([])

    // @audit HC
    const [term, set_term] = useState("UCB Sp23")

    useEffect(() => {
        const getCourses = async () => {
            // @audit HC
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
                    .includes(term.toLowerCase())
            })
        )
    }, [courses, term])

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
        )
    }, [courses_this_term, search_string])

    useEffect(() => {})

    return (
        <div id="main">
            <h1 id="title">Cal Course</h1>
            <Input
                id="searchBar"
                placeholder="搜索课号"
                bordered={false}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    set_search_string(event.target.value.toLowerCase())
                }}
            />
            <div id="filterBar"></div>

            <div id="main-container">
                {displayed_courses.map(course => {
                    return QRCard(course)
                })}

                {/* @audit add functional cards */}
            </div>
        </div>
    )
}

export default TestingDashboard
