import { FC } from 'react'

const AboutAndFAQ = () => {
    return (
        <div>
            <div>
                <h1>About Us</h1>
                <h2 id='team'>The Team</h2>
            </div>
            <h1>Frequently Asked Questions</h1>
            <FAQs />
        </div>
    )
}

interface IFAQ {
    question: string
    Answer: FC<{ className: string }>
}

const questions: IFAQ[] = [
    {
        question: "What's your cookies policy?",
        Answer: ({ className }) => (
            <p className={className}>
                As of Jun. 20, the rendition currently published is not using
                Cookies. We have migrated all of our Cookies-based
                functionalities to either sessionStorage, localStorage, or our
                secure AWS server.
            </p>
        )
    },
    {
        question: 'What about data security?',
        Answer: ({ className }) => (
            <p className={className}>
                All of our data is currently housed on AWS (that's Amazon Web
                Services if you are wondering, it's also the largest cloud
                computing and storage service on our Earth), so everything
                should be rather secure. In the case someone did hack into AWS,
                we doubt they will come for us.
            </p>
        )
    }
]

const FAQs = () => {
    return <div>{questions.map(faq => FAQ(faq))}</div>
}

const FAQ = ({ question, Answer }: IFAQ) => {
    return (
        <div className="">
            <h2 className="">{question}</h2>
            <Answer className="" />
        </div>
    )
}

export default AboutAndFAQ
