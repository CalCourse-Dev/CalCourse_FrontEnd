import { QRCodeSVG } from 'qrcode.react'
import { Component } from 'react'

import type { CourseData } from '../../../utils/interfaces'
import { Transition } from '@headlessui/react'
import { ActiveCardsContext } from '../../../contexts/ActiveCards.context'

interface PCourseCard {
    course: CourseData
}

interface SCourseCard {
    showing_details: boolean
}

class CourseCard extends Component<PCourseCard, SCourseCard> {
    state: SCourseCard = {
        showing_details: false
    }

    render() {
        const { course_name, course_id, course_qr_code_url } = this.props.course

        return (
            <div
                className={`${
                    this.state.showing_details
                        ? 'card-transluscent-active'
                        : 'card-transluscent'
                } h-64 w-full duration-300 overflow-hidden flex justify-center items-center flex-col`}
                onClick={() => {
                    this.setState(state => ({
                        showing_details: !state.showing_details
                    }))
                }}
            >
                <Transition
                    show={this.state.showing_details}
                    enter="transition-transform duration-250"
                    enterFrom="-translate-y-full"
                    enterTo="translate-0"
                    leave="transition-transform duration-250"
                    leaveFrom="translate-0"
                    leaveTo="-translate-y-full"
                    className="top-0 relative mx-auto"
                >
                    <QRCodeSVG
                        className="mx-auto text-logo mt-4"
                        value={course_qr_code_url}
                        size={160}
                        bgColor="transparent"
                        fgColor="#212121"
                    />
                </Transition>

                <h1 className="block text-center text-lg h-min mx-auto">
                    {course_name}
                </h1>

                {/* <Transition
                    show={!this.state.showing_details}
                    enter="transition-transform duration-150"
                    enterFrom="translate-y-full"
                    enterTo="translate-y-0"
                    leave="transition-transform duration-150"
                    leaveFrom="translate-y-0"
                    leaveTo="translate-y-full"
                    className="bg-accent w-full h-6 absolute bottom-0 text-center opacity-stroke text-white font-bold align-middle"
                >
                    {course_id}
                </Transition> */}
                <span
                    className={`bg-accent w-full h-6 absolute bottom-0 text-center ${
                        this.state.showing_details
                            ? 'opacity-1'
                            : 'opacity-stroke'
                    } transition-opacity duration-150 text-white font-bold align-middle`}
                >
                    {course_id}
                </span>
            </div>
        )
    }
}

export default CourseCard
