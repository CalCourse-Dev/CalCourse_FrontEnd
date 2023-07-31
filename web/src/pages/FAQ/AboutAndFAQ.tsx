import type { IconType } from 'react-icons'
import {
    AiOutlineDesktop,
    AiOutlineSecurityScan,
    AiOutlineTeam,
    AiOutlineTool,
    AiOutlineUserAdd
} from 'react-icons/ai'

import { BiCookie, BiMailSend } from 'react-icons/bi'

const AboutAndFAQ = () => {
    return (
        <div className="m-20 flex flex-col gap-10 card-transluscent p-12 pt-16">
            <div className="flex flex-col gap-6">
                <h1 className="font-semibold text-2xl">About Us</h1>
                <div className="flex flex-row gap-10">
                    <h2 id="team" className="font-semibold text-lg basis-1/5">
                        <AiOutlineTeam />
                        The Team
                    </h2>
                    <p className="basis-4/5">
                        We are a quite small team at the moment, especially
                        during the summer when everyone's busy with their own
                        staff. We will have everyone's information updated here
                        when school starts and we finalize our roster.
                    </p>
                </div>

                <div className="flex flex-row gap-10">
                    <h2
                        id="recruitment"
                        className="font-semibold text-lg basis-1/5"
                    >
                        <AiOutlineUserAdd />
                        Recruiting
                    </h2>
                    <p className="basis-4/5">
                        Although we don't have a lot of development tasks at the
                        moment, feel free to reach out if you are interested in
                        joining the team.{' '}
                        <BiMailSend
                            className="inline text-accent dark:text-highlight cursor-pointer h-5 w-5"
                            onClick={() => {
                                window.location.href =
                                    'mailto:huanzhimao@berkeley.edu'
                            }}
                        />
                    </p>
                </div>
                <div className="flex flex-row gap-10">
                    <h2
                        id="technology"
                        className="font-semibold text-lg basis-1/5"
                    >
                        <AiOutlineDesktop />
                        Technology
                    </h2>
                    <p className="basis-4/5">
                        For some reference, here are the stack, tools, and
                        gadgets we current use:
                        <ul className="list-disc list-outside ml-6 mt-2 flex flex-col gap-2">
                            <li>
                                Our Frontend is based on the React.js +
                                Typescript framework, with styling done by
                                Tailwind. If you are intersted in joining, it
                                would be nice if you have completed CS 61A/C88C
                                AND either completed CS 61B or are familiar with
                                React and basic Javascript.
                            </li>
                            <li>
                                Our Backend is a somewhat traditional Python
                                endpoint hosted on AWS. CS 61B and a Database
                                course would be ncie if you are interested.
                            </li>
                            <li>
                                As for Design, we do pretty much everything on
                                Figma. Since our Frontend is styled primarily
                                with flex for responsiveness, some knowledge
                                about how flex works and css in general would be
                                nice.
                            </li>
                        </ul>
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h1 className="font-semibold text-2xl">
                    Frequently Asked Questions
                </h1>
                {questions.map(faq => FAQ(faq))}
            </div>
        </div>
    )
}

interface PFAQ {
    Icon: IconType
    question: string
    Answer: (props: { className: string }) => JSX.Element
}

const questions: PFAQ[] = [
    {
        Icon: BiCookie,
        question: "What's your cookies policy?",
        Answer: ({ className }) => (
            <p className={className}>
                As of Jul. 31, 2023, the rendition currently published is not
                using Cookies. We have migrated all of our Cookies-based
                functionalities to either sessionStorage, localStorage, or our
                secure AWS server.
            </p>
        )
    },
    {
        Icon: AiOutlineSecurityScan,
        question: 'What about data security?',
        Answer: ({ className }) => (
            <p className={className}>
                All of our data is currently housed on AWS (that's Amazon Web
                Services if you are wondering, it's the largest commercial cloud
                computing and storage service on our Earth), so everything
                should be rather secure. In the case someone did hack into AWS,
                we doubt they will come for us.
            </p>
        )
    },
    {
        Icon: AiOutlineTool,
        question: 'Who should I contact for bugs & issues?',
        Answer: () => (
            <p>
                Shoot us an email at calcourse.service@gmail.com{' '}
                <BiMailSend
                    className="inline h-5 w-5 text-accent dark:text-highlight cursor-pointer"
                    onClick={() => {
                        window.location.href =
                            'mailto:calcourse.service@gmail.com'
                    }}
                />{' '}
                or email Hans directly at huanzhimao@berkeley.edu{' '}
                <BiMailSend
                    className="inline h-5 w-5 text-accent dark:text-highlight cursor-pointer"
                    onClick={() => {
                        window.location.href = 'mailto:huanzhimao@berkeley.edu'
                    }}
                />
            </p>
        )
    }
]

const FAQ = ({ Icon, question, Answer }: PFAQ) => {
    return (
        <div className="flex flex-row">
            <Icon className="w-16 mt-2 flex-none" />
            <div>
                <h2 className="font-semibold text-lg">{question}</h2>
                <Answer className="" />
            </div>
        </div>
    )
}

export default AboutAndFAQ
