import { ChangeEvent, useEffect, useState } from "react"
import CourseAPI from "../../requests/CourseAPI"
import type { CourseData } from "../../utils/interfaces"
import styled from "styled-components"
import { Input } from "antd"

import "./Dashboard.scss"

import QRCard from "./QRCard/QRCard"
// import UtilCard from "./Card/UtilCard"

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
    const [selected_term, set_selected_term] = useState("UCB Sp23")

    const terms = [
        { school_name_and_term: "UCB Sp23", label: "Spring 2023 课群" },
        // { school_name_and_term: "UCB Fa22", label: "Fall 2022 课群" },
        { school_name_and_term: "UCB Mj01", label: "专业群" },
        { school_name_and_term: "UCB Lf01", label: "Cal Life" },
    ]

    // const util_cards = [
    //     { icon: "📃", label: "申请建群" },
    //     { icon: "⬆️", label: "故障报告" },
    //     { icon: "🔒", label: "退出登陆" },
    // ]

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
                    .includes(selected_term.toLowerCase())
            })
        )
    }, [courses, selected_term])

    useEffect(() => {
        console.log(courses_this_term)
        set_displayed_courses(
            courses_this_term
                .filter(course => {
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
        <div id="main">
            <Title>Cal Course</Title>
            <Input
                id="searchBar"
                placeholder="搜索课号"
                bordered={false}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    set_search_string(event.target.value.toLowerCase())
                }}
            />
            <div id="filterBar">
                {terms.map(term => (
                    <TermButton
                        key={term["school_name_and_term"]}
                        selected={
                            term["school_name_and_term"] === selected_term
                        }
                        onClick={() =>
                            set_selected_term(term["school_name_and_term"])
                        }
                    >
                        {term["label"]}
                    </TermButton>
                ))}
            </div>

            <div id="main-container">
                {displayed_courses.map(course => QRCard(course))}

                {/* @audit add functional cards */}

                {/* {util_cards.map(card => UtilCard(card))} */}
            </div>
        </div>
    )
}

export default TestingDashboard

const TermButton = styled.button<{ selected: boolean }>`
    width: 160px;
    min-width: 140px;
    background-color: ${props =>
        props.selected ? "var(--accent) " : "var(--p-bg)"};
    transition: background-color 0.2s;
    border: 2px solid var(--accent);
    color: ${props => (props.selected ? "var(--p-fg) " : "var(--accent)")};
    padding: 4px;
    border-radius: 16px;
    margin-right: 16px;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
`

const Title = styled.h1`
    font-weight: 800;
    width: fit-content;
    cursor: pointer;
    color: white;
    text-decoration: none;
    font-size: 400%;
    margin: 0 auto 0;
    padding-top: 40px;
    user-select: none;
    -webkit-user-select: none;
    text-align: left;
`
