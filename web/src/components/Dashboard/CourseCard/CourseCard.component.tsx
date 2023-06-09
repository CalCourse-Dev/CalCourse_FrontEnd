import { QRCodeSVG } from 'qrcode.react'
import { Component } from 'react'

import type { ICourseData } from '../../../utils/interfaces'
import { Transition } from '@headlessui/react'

interface PCourseCard {
    course: ICourseData
}

interface SCourseCard {
    showing_details: boolean
    banner: string
}

class CourseCard extends Component<PCourseCard, SCourseCard> {
    state: SCourseCard = {
        showing_details: false,
        banner: !this.props.course.school_name_and_term.includes('01') ? this.props.course.course_id : ''
    }

    render() {
        const {
            course_name,
            course_qr_code_url,
            course_id,
            school_name_and_term
        } = this.props.course
        const show_id = !school_name_and_term.includes('01')

        const speed = 50

        const banner_text_removal = (new_text: string) => {
            var current_text = this.state.banner
            var length = current_text.length
            if (length > 0) {
                this.setState({
                    ...this.state,
                    banner: current_text.slice(0, length - 1)
                })
                setTimeout(() => banner_text_removal(new_text), speed)
            } else {
                banner_text_animation(0, new_text)
            }
        }

        const banner_text_animation = (index: number, new_text: string) => {
            var current_text = this.state.banner

            if (index < new_text.length) {
                var charToAdd = new_text.charAt(index)

                this.setState({
                    ...this.state,
                    banner: current_text + charToAdd
                })

                setTimeout(() => {
                    banner_text_animation(++index, new_text)
                }, speed)
            }
        }

        return (
            <div
                className={`${
                    this.state.showing_details
                        ? 'card-transluscent-active'
                        : 'card-transluscent'
                } h-64 w-full duration-300 overflow-hidden flex justify-center items-center flex-col`}
                onClick={() => {
                    if (!this.state.showing_details) {
                        this.setState({ ...this.state, showing_details: true })
                        
                            setTimeout(
                                () => banner_text_removal(course_name.replace('/', ' / ')),
                                300
                            )
                        
                    } else {
                        this.setState({ ...this.state, showing_details: false })
                        
                            setTimeout(
                                () => banner_text_removal(show_id ? course_id : ''),
                                300
                            )
                        
                    }
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
                    className="top-0 relative mx-auto pb-5"
                >
                    <QRCodeSVG
                        className="mx-auto text-logo mt-4"
                        value={course_qr_code_url}
                        size={160}
                        bgColor="transparent"
                        fgColor="#212121"
                    />
                </Transition>

                <Transition
                    as="h1"
                    show={!this.state.showing_details}
                    enter="transition-opacity duration-150"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className={`absolute text-center text-lg h-min mx-auto font-bold text-graphite`}
                >
                    {show_id ? course_name : course_name.replace('/', ' / ')}
                </Transition>

                <span
                    className={`bg-accent w-full h-6 absolute bottom-0 text-center ${
                        this.state.showing_details
                            ? 'opacity-1'
                            : 'opacity-stroke'
                    } transition-opacity duration-150 text-white font-bold align-middle`}
                >
                    {this.state.banner}
                </span>
            </div>
        )
    }
}

export default CourseCard
