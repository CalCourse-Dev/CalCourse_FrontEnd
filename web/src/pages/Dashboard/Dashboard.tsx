import { ChangeEvent, useEffect, useState } from 'react'

import { AiOutlineSearch } from 'react-icons/ai'
import { TERMS } from '../../utils/data/terms.data'

import {
    process_course_name,
    process_search_string
} from '../../utils/functions/course_name_util'

import { useCourseDataContext } from '../../utils/hooks/useCourseDataContext'
import type { ICourseData, ITerm } from '../../utils/interfaces/interfaces'
import CourseCard from './CourseCard/CourseCard.component'
import { AddRequestCard } from './UtilCard/UtilCard.component'

const Dashboard = () => {
    // context & state hooks
    const [courses] = useCourseDataContext()
    const [search_string, set_search_string] = useState('')
    const [courses_this_term, set_courses_this_term] = useState<
        Array<ICourseData>
    >([])
    const [displayed_courses, set_displayed_courses] = useState<
        Array<ICourseData>
    >([])

    const [selected_term, set_selected_term] = useState<ITerm>(TERMS[0])

    // effect hooks

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
                .filter(({ course_id, course_name }: ICourseData) => {
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
    }, [courses_this_term, search_string])

    return (
        <div id="dashboard" className="w-full mx-auto max-w-3xl">
            {/* Search Bar */}

            <div
                id="search-bar-container"
                className="mt-32 w-full px-2 gap-2 flex items-center border-solid border-b-2 text-xl border-b-gray-5 hover:border-b-accent focus:border-solid focus:border-b-2 focus:border-b-accent"
            >
                <input
                    id="search-bar"
                    className="outline-0 inline-block relative  bg-transparent flex-grow"
                    placeholder="查找课程/课号"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        set_search_string(event.target.value.toLowerCase())
                    }}
                    value={search_string}
                />
                <AiOutlineSearch className="flex-grow-0 font-bold" />
            </div>

            {/* Terms / Categories Bar */}
            <div
                id="filter-bar"
                className="flex relative w-full text-center my-8 mx-auto flex-wrap gap-4 justify-around"
            >
                {TERMS.map(term => {
                    const selected =
                        term.school_name_and_term ===
                        selected_term.school_name_and_term

                    return (
                        <button
                            className={`font-medium transition-background duration-150 w-40 p-1 rounded-2xl border-2 border-solid border-accent text-center ${
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

            <div className="flex my-5 mx-auto gap-8 mb-10 flex-row flex-wrap justify-around content-start">
                {displayed_courses.length > 0
                    ? displayed_courses.map(course => {
                          return (
                              <CourseCard
                                  key={course.course_qr_code_url}
                                  course={course}
                              />
                          )
                      })
                    : courses_this_term.length > 0 && <AddRequestCard />}
            </div>
        </div>
    )
}

export default Dashboard
