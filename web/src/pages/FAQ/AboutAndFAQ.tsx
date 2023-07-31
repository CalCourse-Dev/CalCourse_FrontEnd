import { Fragment } from 'react'
import type { IconType } from 'react-icons'
import {
    AiOutlineDesktop,
    AiOutlineSecurityScan,
    AiOutlineTeam,
    AiOutlineTool,
    AiOutlineUserAdd
} from 'react-icons/ai'

import { BiCookie, BiMailSend } from 'react-icons/bi'
import { HiOutlineGlobe } from 'react-icons/hi'

interface IMember {
    name: string
    title: string
    url: string
}

interface PCard {
    Icon: IconType
    title: string
    Answer: (props: { className?: string }) => JSX.Element
}

const NameTag = ({ name, title, url }: IMember) => {
    return (
        <li className="flex flex-col">
            <div className="flex justify-between">
                <span className="font-medium">{name}</span>
                <HiOutlineGlobe
                    className="inline right-0 self-center cursor-pointer"
                    onClick={() => {
                        window.location.href = url
                    }}
                />
            </div>
            <span className="text-[15px]">{title}</span>
        </li>
    )
}

const TEAM: IMember[] = [
    {
        name: 'Hans Mao',
        title: 'PM / Backend',
        url: 'https://www.linkedin.com/in/hans-mao-82975a22a/'
    },
    {
        name: 'AZ Zhang',
        title: 'Frontend',
        url: 'https://www.linkedin.com/in/az-zhang/'
    },
    {
        name: 'Tia Lu',
        title: 'Design Lead',
        url: 'https://www.linkedin.com/in/nianqin-tia-lu-3b3395213/'
    }
]

const AboutCard = ({ Icon, title, Answer }: PCard) => {
    return (
        <div className="flex flex-row gap-10">
            <h2 id="team" className="font-semibold text-lg basis-1/5">
                <Icon />
                {title}
            </h2>
            <div className="basis-4/5">
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
                <ul className="grid grid-cols-3 gap-16 mt-2">
                    {TEAM.map(NameTag)}
                </ul>
            </Fragment>
        )
    },
    {
        Icon: AiOutlineUserAdd,
        title: 'Recruiting',
        Answer: () => (
            <p>
                Although we don't have a lot of development tasks at the moment,
                feel free to reach out if you are interested in joining the
                team.{' '}
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
        title: 'Technology',
        Answer: () => (
            <p>
                For some reference, here are the stack, tools, and gadgets we
                current use:
                <ul className="list-disc list-outside ml-6 mt-2 flex flex-col gap-2">
                    <li>
                        Our Frontend is based on the React.js + Typescript
                        framework, with styling done by Tailwind. If you are
                        intersted in joining, it would be nice if you have
                        completed CS 61A/C88C AND either completed CS 61B or are
                        familiar with React and basic Javascript.
                    </li>
                    <li>
                        Our Backend is a somewhat traditional Python endpoint
                        hosted on AWS. CS 61B and a Database course would be
                        ncie if you are interested.
                    </li>
                    <li>
                        As for Design, we do pretty much everything on Figma.
                        Since our Frontend is styled primarily with flex for
                        responsiveness, some knowledge about how flex works and
                        css in general would be nice.
                    </li>
                </ul>
            </p>
        )
    }
]

const AboutAndFAQ = () => {
    return (
        <div className="m-20 flex flex-col gap-10 card-transluscent p-12 pt-16">
            <div id="about-us" className="flex flex-col gap-6">
                <h1 className="font-semibold text-2xl">About Us</h1>
                {ABOUT.map(AboutCard)}
            </div>
            <div id="faq" className="flex flex-col gap-4">
                <h1 className="font-semibold text-2xl">
                    Frequently Asked Questions
                </h1>
                {QUESTIONS.map(FAQCard)}
            </div>
        </div>
    )
}

const QUESTIONS: PCard[] = [
    {
        Icon: BiCookie,
        title: "What's your cookies policy?",
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
        title: 'What about data security?',
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
        title: 'Who should I contact for bugs & issues?',
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

const FAQCard = ({ Icon, title, Answer }: PCard) => {
    return (
        <div className="flex flex-row">
            <Icon className="w-16 mt-2 flex-none" />
            <div>
                <h2 className="font-semibold text-lg">{title}</h2>
                <Answer className="" />
            </div>
        </div>
    )
}

export default AboutAndFAQ
