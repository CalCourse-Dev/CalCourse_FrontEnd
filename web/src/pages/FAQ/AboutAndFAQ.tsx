import { Fragment } from 'react'
import type { IconType } from 'react-icons'
import {
    AiOutlineDesktop,
    AiOutlineSecurityScan,
    AiOutlineTeam,
    AiOutlineTool,
    AiOutlineUser,
    AiOutlineUserAdd
} from 'react-icons/ai'

import {
    BiCookie,
    BiData,
    BiDesktop,
    BiMailSend,
    BiPaintRoll
} from 'react-icons/bi'
import type { IMember } from '../../utils/interfaces/interfaces'
import { TEAM } from '../../utils/data/team.data'

interface PCard {
    Icon: IconType
    title: string
    Answer: () => JSX.Element
}

const NameTag = ({ name, title, contact }: IMember) => {
    console.log(contact)
    return (
        <li key={name} className="flex flex-col">
            <div className="flex justify-between">
                <span className="font-medium whitespace-nowrap">{name}</span>
                {contact && contact.Icon && (
                    <contact.Icon
                        className="inline right-0 self-center cursor-pointer"
                        onClick={() => {
                            window.location.href = contact.url
                        }}
                    />
                )}
            </div>
            <span className="text-[15px]">{title}</span>
        </li>
    )
}

const AboutCard = ({ Icon, title, Answer }: PCard) => {
    return (
        <div key={title} className="flex flex-row gap-10">
            <h2 id="team" className="font-semibold text-lg basis-1/5">
                <Icon />
                {title}
            </h2>
            <div className="basis-4/5 flex flex-col gap-2">
                <Answer />
            </div>
        </div>
    )
}

const FAQCard = ({ Icon, title, Answer }: PCard) => {
    return (
        <div key={title} className="flex flex-row">
            <Icon className="w-16 mt-2 flex-none" />
            <div>
                <h2 className="font-semibold text-lg">{title}</h2>
                <Answer />
            </div>
        </div>
    )
}

const ABOUT: PCard[] = [
    {
        Icon: AiOutlineTeam,
        title: 'The Team',
        Answer: () => (
            <Fragment>
                <p>
                    We are a quite small team at the moment, especially during
                    the summer when everyone's busy with their own staff. We
                    will have everyone's information updated here when school
                    starts and we finalize our roster.
                </p>
                <ul className="grid grid-cols-3 gap-x-12 gap-y-4 mt-2">
                    {TEAM.current.map(NameTag)}
                </ul>
            </Fragment>
        )
    }
    // {
    //     Icon: AiOutlineUser,
    //     title: 'Past Members',
    //     Answer: () => (
    //         <ul className="grid grid-cols-3 gap-x-12 gap-y-4">
    //             {TEAM.past.map(NameTag)}
    //         </ul>
    //     )
    // }
]

const QUESTIONS: PCard[] = [
    {
        Icon: BiCookie,
        title: "What's your cookies policy?",
        Answer: () => (
            <p>
                As of July 31, 2023, our website no longer uses cookies. 
                We have transitioned all functions that previously relied on cookies to either localStorage or our secure server hosted on AWS.
            </p>
        )
    },
    {
        Icon: AiOutlineSecurityScan,
        title: 'How do you ensure data security?',
        Answer: () => (
            <p>
                All of our data is securely stored on Amazon Web Services (AWS), one of the world's leading cloud computing and storage platforms.
                While AWS is known for its robust security measures, we continuously monitor and adopt best practices to ensure the safety of our user data.
                Rest assured, even in the unlikely event of a breach on AWS, we've taken measures to protect our data.
            </p>
        )
    },
    {
        Icon: AiOutlineTool,
        title: 'Who can I reach out to?',
        Answer: () => (
            <p>
                For any inquiries, technical concerns, or feedback, please direct your emails to calcourse.service@gmail.com{' '}
                <BiMailSend
                    className="inline h-5 w-5 text-accent dark:text-highlight cursor-pointer"
                    onClick={() => {
                        window.location.href =
                            'mailto:calcourse.service@gmail.com'
                    }}
                />{' '}
                Alternatively, feel free to get in touch directly with Hans Mao, the current CalCourse Admin, at huanzhimao@berkeley.edu{' '}
                <BiMailSend
                    className="inline h-5 w-5 text-accent dark:text-highlight cursor-pointer"
                    onClick={() => {
                        window.location.href = 'mailto:huanzhimao@berkeley.edu'
                    }}
                />
            </p>
        )
    },
    {
        Icon: AiOutlineUserAdd,
        title: 'Interested in joining our team?',
        Answer: () => (
            <p>
                We might not have numerous development tasks right now, but we're always open to potential collaborations. 
                If you're interested in being a part of our journey, please reach out to us!{' '}
                <BiMailSend
                    className="inline text-accent dark:text-highlight cursor-pointer h-5 w-5"
                    onClick={() => {
                        window.location.href = 'mailto:huanzhimao@berkeley.edu'
                    }}
                />
            </p>
        )
    },
    {
        Icon: AiOutlineDesktop,
        title: 'Tech Stack',
        Answer: () => (
            <p>
                For those curious about the tools and technologies we employ, here's a rundown:
                <ul className="list-none list-outside mt-2 flex flex-col gap-4">
                    <li className="flex">
                        <BiDesktop className="w-16 mt-1.5 flex-none" />
                        <p>
                            <b>Frontend:</b> 
                            We utilize the React.js framework, enhanced with Typescript, and styled with Tailwind.
                            If you're thinking of joining our team, proficiency in programming (CS 61A or CS 88) is a must.
                            Additionally, you should have either completed CS 61B or have a strong understanding of React and basic Typescript.
                        </p>
                    </li>
                    <li className="flex">
                        <BiData className="w-16 mt-1.5 flex-none" />
                        <p>
                            <b>Backend:</b>
                            Our backend is constructed using AWS services including DynamoDB, Cognito, API Gateway, and Lambda, coupled with the Python-based FastAPI framework. 
                            For those considering joining our team, expertise in Data Structure (CS 61B) and database management (CS 186) would be a huge plus.
                        </p>
                    </li>
                    <li className="flex">
                        <BiPaintRoll className="w-16 mt-1.5 flex-none" />
                        <p>
                            <b>Design:</b>
                            We craft our designs using Figma. 
                            As our frontend styling relies significantly on flex for responsiveness, a good understanding of flex layouts and general CSS would be an advantage. 
                            Additionally, knowledge in UI/UX design (CS 160) would be preferred.
                        </p>
                    </li>
                </ul>
            </p>
        )
    }
]

const AboutAndFAQ = () => {
    return (
        <div className="m-20 flex flex-col gap-12 card-transluscent p-12 pt-16">
            <div id="about-us" className="flex flex-col gap-6">
                <h1 className="font-semibold text-2xl">About Us</h1>
                {ABOUT.map(AboutCard)}
            </div>
            <div id="faq" className="flex flex-col gap-6">
                <h1 className="font-semibold text-2xl">
                    Frequently Asked Questions
                </h1>
                {QUESTIONS.map(FAQCard)}
            </div>
        </div>
    )
}

export default AboutAndFAQ
