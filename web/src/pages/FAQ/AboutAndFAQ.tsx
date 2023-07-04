import { FC } from 'react'

const AboutAndFAQ = () => {
    return (
        <div>
            <h1>About Us</h1>
            <h1>Frequently Asked Questions</h1>
            <FAQ />
        </div>
    )
}

const questions: { question: string; Answer: FC<{ className: string }> }[] = [
    {
        question: "What's your cookies policy?",
        Answer: ({ className }: { className: string }) => (
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
        Answer: () => (
            <p>
                All of our data is currently housed on AWS (that's Amazon Web
                Services if you are wondering, it's also the largest cloud
                computing and storage service on our Earth), so everything
                should be rather secure. In the case someone did hack into AWS,
                we doubt they will come for us.
            </p>
        )
    }
]

const FAQ = () => {
    return (
        <div>
            {questions.map(({ question, Answer }) => {
                return (
                    <div className="">
                        <h2 className="">{question}</h2>
                        <Answer className="" />
                    </div>
                )
            })}
        </div>
    )
}

const CookiesPolicy = () => {
    return (
        <div id="cookies-policy-container">
            <h1>Our Cookies Policies</h1>
            <p>
                As of Jun. 20, the rendition currently published is not using
                Cookies. We have migrated all of our Cookies-based
                functionalities to either sessionStorage, localStorage, or our
                secure AWS server.
            </p>
        </div>
    )
}

const DataSecurity = () => {}

export default AboutAndFAQ
