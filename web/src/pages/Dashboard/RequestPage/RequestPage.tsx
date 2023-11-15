import { Fragment, useEffect, useState } from 'react'
import CourseAPI from '../../../requests/CourseAPI'
import { Combobox, Transition } from '@headlessui/react'
import { MdOutlineCheckCircleOutline } from 'react-icons/md'
import { FiChevronsDown } from 'react-icons/fi'
import { process_search_string } from '../../../utils/functions/course_name_util'
import { useUserContext } from '../../../utils/hooks/useUserContext'
import { getAllDepts } from '../../../utils/constants/environment_variables'

// to-do: add additional parameter allTerms;
const RequestPage = () => {
    /** Successful request: push data to api */
    const [user] = useUserContext()
    const allDepts = getAllDepts(user?.email ?? '')

    const on_submit_handler = () => {
        // Get current term
        let current_term = 'CalCourse';
        if (user?.email.endsWith('@berkeley.edu')) {
            current_term = 'UCB';
        } else if (user?.email.endsWith('@ucla.edu') || user?.email.endsWith('@g.ucla.edu')) {
            current_term = 'UCLA';
        } else if (user?.email.endsWith('@usc.edu')) {
            current_term = 'USC';
        }
        const newMissingClassData = {
            department_code: dept.value,
            course_code: course_number,
            lecture_id: '001',
            course_term: current_term
        }
        set_dept({value:'', label:''})
        set_query('')
        set_course_number('')

        CourseAPI.reportMissingClass(
            newMissingClassData,
            data => {
                console.log(data.message)
            },
            e => {
                console.log(e)
            }
        )
    }

    const [dept, set_dept] = useState(allDepts[0])
    const [query, set_query] = useState('')
    const [course_number, set_course_number] = useState('')

    useEffect(() => {
        set_query(process_search_string(query))
    }, [query])

    const filteredDept =
        query === ''
            ? allDepts
            : allDepts.filter(dept => {
                  return dept.label.toLowerCase().includes(query.toLowerCase())
              })

    /** Renders the page. */
    return (
        <div className="card-transluscent w-full my-auto p-12 pb-6 flex flex-col justify-center max-w-md gap-6">
            <h1 id="title" className="text-3xl font-bold">
                申请建群
            </h1>
            <div className="flex flex-ro gap-4">
                <Combobox value={dept} onChange={set_dept}>
                    <div className="relative basis-3/5">
                        <div
                            id="input-container"
                            className="relative w-full cursor-default overflow-hidden rounded-full border-2 border-graphite/10 dark:border-graphite-dark/10 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
                        >
                            <Combobox.Input
                                onChange={e => {
                                    set_query(e.target.value)
                                }}
                                placeholder="Department Code"
                                displayValue={({
                                    label
                                }: {
                                    value: string
                                    label: string
                                }) => label}
                                className="bg-transparent w-full px-4 py-1 outline-none autofill:rounded-full"
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <FiChevronsDown
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </Combobox.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => set_query('')}
                        >
                            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-2xl bg-transluscent border-[0.5px] border-[#ffffff]/30 border-solid text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {filteredDept.length === 0 && query !== '' ? (
                                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                        Nothing found.
                                    </div>
                                ) : (
                                    filteredDept.map(dept => (
                                        <Combobox.Option
                                            key={dept.label}
                                            value={dept}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-1 pl-10 pr-4 rounded-full border-[0.5px] border-[#ffffff]/30 border-none ${
                                                    active &&
                                                    'bg-transluscent border-solid'
                                                }`
                                            }
                                        >
                                            {({ active, selected }) => (
                                                <Fragment>
                                                    <span
                                                        className={`block truncate ${
                                                            selected
                                                                ? 'font-medium'
                                                                : 'font-normal'
                                                        }`}
                                                    >
                                                        {dept.value}
                                                    </span>
                                                    {selected ? (
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-graphite dark:text-graphite-dark">
                                                            <MdOutlineCheckCircleOutline
                                                                className="h-5 w-5"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    ) : null}
                                                </Fragment>
                                            )}
                                        </Combobox.Option>
                                    ))
                                )}
                            </Combobox.Options>
                        </Transition>
                    </div>
                </Combobox>
                <div className="basis-2/5 rounded-full border-2 border-graphite/10 dark:border-graphite-dark/10">
                    <input
                        id="course-number-field"
                        name="course-number"
                        className="bg-transparent w-full px-4 py-1 outline-none autofill:rounded-full"
                        placeholder="Course No."
                        value={course_number}
                        onChange={event => {
                            set_course_number(event.target.value)
                        }}
                    />
                </div>
            </div>
            <button
                className="btn-rounded-full flex-none transition-opacity duration-150 ease-in"
                onMouseUp={on_submit_handler}
            >
                Submit
            </button>
        </div>
    )
}


export default RequestPage
