import { Fragment, useEffect, useState } from 'react'
import CourseAPI from '../../../requests/CourseAPI'
import { Combobox, Transition } from '@headlessui/react'
import { MdOutlineCheckCircleOutline } from 'react-icons/md'
import { FiChevronsDown } from 'react-icons/fi'
import { process_search_string } from '../../../utils/functions/course_name_util'

// to-do: add additional parameter allTerms;
const RequestPage = () => {
    /** Successful request: push data to api */
    const onFinish = (values: any) => {
        let newMissingClassData = {
            department_code: values.deptCode,
            course_code: values.courseCode,
            lecture_id: values.lectureId,
            course_term: values.courseTerm
        }
        console.log(newMissingClassData)
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

    const [dept, set_dept] = useState(allDepts[0].label)
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
                                                        {dept.label}
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
                onMouseUp={onFinish}
            >
                Submit
            </button>
        </div>
    )
}

const allDepts: { value: string; label: string }[] = [
    { value: 'COMPSCI', label: 'COMPSCI' },
    { value: 'DATA', label: 'DATA' },
    { value: 'STAT', label: 'STAT' },
    { value: 'MATH', label: 'MATH' },
    { value: 'INTEGBI', label: 'INTEGBI' },
    { value: 'MCELLBI', label: 'MCELLBI' },
    { value: 'BIOLOGY', label: 'BIOLOGY' },
    { value: 'CHEM', label: 'CHEM' },
    { value: 'COG SCI', label: 'COG SCI' },
    { value: 'PSYCH', label: 'PSYCH' },
    { value: 'ECON', label: 'ECON' },
    { value: 'UGBA', label: 'UGBA' },
    { value: 'EECS', label: 'EECS' },
    { value: 'COM LIT', label: 'COM LIT' },
    { value: 'AERO ENG', label: 'AERO ENG' },
    { value: 'AEROSPC', label: 'AEROSPC' },
    { value: 'AFRICAM', label: 'AFRICAM' },
    { value: 'AGRS', label: 'AGRS' },
    { value: 'AHMA', label: 'AHMA' },
    { value: 'AMERSTD', label: 'AMERSTD' },
    { value: 'ANTHRO', label: 'ANTHRO' },
    { value: 'ARABIC', label: 'ARABIC' },
    { value: 'ARCH', label: 'ARCH' },
    { value: 'ARMENI', label: 'ARMENI' },
    { value: 'ART', label: 'ART' },
    { value: 'ASAMST', label: 'ASAMST' },
    { value: 'ASIANST', label: 'ASIANST' },
    { value: 'AST', label: 'AST' },
    { value: 'ASTRON', label: 'ASTRON' },
    { value: 'BANGLA', label: 'BANGLA' },
    { value: 'BIO ENG', label: 'BIO ENG' },
    { value: 'BIOPHY', label: 'BIOPHY' },
    { value: 'BOSCRSR', label: 'BOSCRSR' },
    { value: 'BUDDSTD', label: 'BUDDSTD' },
    { value: 'BULGARI', label: 'BULGARI' },
    { value: 'BURMESE', label: 'BURMESE' },
    { value: 'CATALAN', label: 'CATALAN' },
    { value: 'CELTIC', label: 'CELTIC' },
    { value: 'CHICANO', label: 'CHICANO' },
    { value: 'CHINESE', label: 'CHINESE' },
    { value: 'CHM ENG', label: 'CHM ENG' },
    { value: 'CIV ENG', label: 'CIV ENG' },
    { value: 'CLASSIC', label: 'CLASSIC' },
    { value: 'CMPBIO', label: 'CMPBIO' },
    { value: 'COLWRIT', label: 'COLWRIT' },
    { value: 'COMPBIO', label: 'COMPBIO' },
    { value: 'CRIT TH', label: 'CRIT TH' },
    { value: 'CRWRIT', label: 'CRWRIT' },
    { value: 'CUNEIF', label: 'CUNEIF' },
    { value: 'CY PLAN', label: 'CY PLAN' },
    { value: 'CYBER', label: 'CYBER' },
    { value: 'CZECH', label: 'CZECH' },
    { value: 'DANISH', label: 'DANISH' },
    { value: 'DATASCI', label: 'DATASCI' },
    { value: 'DEMOG', label: 'DEMOG' },
    { value: 'DES INV', label: 'DES INV' },
    { value: 'DEV ENG', label: 'DEV ENG' },
    { value: 'DEV STD', label: 'DEV STD' },
    { value: 'DEVP', label: 'DEVP' },
    { value: 'DIGHUM', label: 'DIGHUM' },
    { value: 'DUTCH', label: 'DUTCH' },
    { value: 'EA LANG', label: 'EA LANG' },
    { value: 'EDSTEM', label: 'EDSTEM' },
    { value: 'EDUC', label: 'EDUC' },
    { value: 'EGYPT', label: 'EGYPT' },
    { value: 'EL ENG', label: 'EL ENG' },
    { value: 'ENGIN', label: 'ENGIN' },
    { value: 'ENGLISH', label: 'ENGLISH' },
    { value: 'ENV DES', label: 'ENV DES' },
    { value: 'ENV SCI', label: 'ENV SCI' },
    { value: 'ENVECON', label: 'ENVECON' },
    { value: 'EPS', label: 'EPS' },
    { value: 'ESPM', label: 'ESPM' },
    { value: 'ETH STD', label: 'ETH STD' },
    { value: 'EUST', label: 'EUST' },
    { value: 'EWMBA', label: 'EWMBA' },
    { value: 'FILIPN', label: 'FILIPN' },
    { value: 'FILM', label: 'FILM' },
    { value: 'FINNISH', label: 'FINNISH' },
    { value: 'FOLKLOR', label: 'FOLKLOR' },
    { value: 'FRENCH', label: 'FRENCH' },
    { value: 'GEOG', label: 'GEOG' },
    { value: 'GERMAN', label: 'GERMAN' },
    { value: 'GLOBAL', label: 'GLOBAL' },
    { value: 'GMS', label: 'GMS' },
    { value: 'GPP', label: 'GPP' },
    { value: 'GREEK', label: 'GREEK' },
    { value: 'GSPDP', label: 'GSPDP' },
    { value: 'GWS', label: 'GWS' },
    { value: 'HEBREW', label: 'HEBREW' },
    { value: 'HINDI', label: 'HINDI' },
    { value: 'HISTART', label: 'HISTART' },
    { value: 'HISTORY', label: 'HISTORY' },
    { value: 'HMEDSCI', label: 'HMEDSCI' },
    { value: 'HUM', label: 'HUM' },
    { value: 'HUNGARI', label: 'HUNGARI' },
    { value: 'IAS', label: 'IAS' },
    { value: 'ICELAND', label: 'ICELAND' },
    { value: 'IND ENG', label: 'IND ENG' },
    { value: 'INDONES', label: 'INDONES' },
    { value: 'INFO', label: 'INFO' },
    { value: 'IRANIAN', label: 'IRANIAN' },
    { value: 'ISF', label: 'ISF' },
    { value: 'ITALIAN', label: 'ITALIAN' },
    { value: 'JAPAN', label: 'JAPAN' },
    { value: 'JEWISH', label: 'JEWISH' },
    { value: 'JOURN', label: 'JOURN' },
    { value: 'KHMER', label: 'KHMER' },
    { value: 'KOREAN', label: 'KOREAN' },
    { value: 'LAN PRO', label: 'LAN PRO' },
    { value: 'LATAMST', label: 'LATAMST' },
    { value: 'LATIN', label: 'LATIN' },
    { value: 'LAW', label: 'LAW' },
    { value: 'LD ARCH', label: 'LD ARCH' },
    { value: 'LEGALST', label: 'LEGALST' },
    { value: 'LGBT', label: 'LGBT' },
    { value: 'LINGUIS', label: 'LINGUIS' },
    { value: 'MAT SCI', label: 'MAT SCI' },
    { value: 'MBA', label: 'MBA' },
    { value: 'MEC ENG', label: 'MEC ENG' },
    { value: 'MED ST', label: 'MED ST' },
    { value: 'MEDIAST', label: 'MEDIAST' },
    { value: 'MELC', label: 'MELC' },
    { value: 'MFE', label: 'MFE' },
    { value: 'MIL AFF', label: 'MIL AFF' },
    { value: 'MIL SCI', label: 'MIL SCI' },
    { value: 'MONGOLN', label: 'MONGOLN' },
    { value: 'MPS', label: 'MPS' },
    { value: 'MUSIC', label: 'MUSIC' },
    { value: 'NAT RES', label: 'NAT RES' },
    { value: 'NATAMST', label: 'NATAMST' },
    { value: 'NAV SCI', label: 'NAV SCI' },
    { value: 'NEUROSC', label: 'NEUROSC' },
    { value: 'NORWEGN', label: 'NORWEGN' },
    { value: 'NSE', label: 'NSE' },
    { value: 'NUC ENG', label: 'NUC ENG' },
    { value: 'NUSCTX', label: 'NUSCTX' },
    { value: 'NWMEDIA', label: 'NWMEDIA' },
    { value: 'OPTOM', label: 'OPTOM' },
    { value: 'PACS', label: 'PACS' },
    { value: 'PB HLTH', label: 'PB HLTH' },
    { value: 'PERSIAN', label: 'PERSIAN' },
    { value: 'PHDBA', label: 'PHDBA' },
    { value: 'PHILOS', label: 'PHILOS' },
    { value: 'PHYS ED', label: 'PHYS ED' },
    { value: 'PHYSICS', label: 'PHYSICS' },
    { value: 'PLANTBI', label: 'PLANTBI' },
    { value: 'POL SCI', label: 'POL SCI' },
    { value: 'POLECON', label: 'POLECON' },
    { value: 'POLISH', label: 'POLISH' },
    { value: 'PORTUG', label: 'PORTUG' },
    { value: 'PUB AFF', label: 'PUB AFF' },
    { value: 'PUB POL', label: 'PUB POL' },
    { value: 'PUNJABI', label: 'PUNJABI' },
    { value: 'RDEV', label: 'RDEV' },
    { value: 'RHETOR', label: 'RHETOR' },
    { value: 'RUSSIAN', label: 'RUSSIAN' },
    { value: 'SANSKR', label: 'SANSKR' },
    { value: 'SASIAN', label: 'SASIAN' },
    { value: 'SCANDIN', label: 'SCANDIN' },
    { value: 'SCMATHE', label: 'SCMATHE' },
    { value: 'SEASIAN', label: 'SEASIAN' },
    { value: 'SEMITIC', label: 'SEMITIC' },
    { value: 'SLAVIC', label: 'SLAVIC' },
    { value: 'SOC WEL', label: 'SOC WEL' },
    { value: 'SOCIOL', label: 'SOCIOL' },
    { value: 'SPANISH', label: 'SPANISH' },
    { value: 'SSEASN', label: 'SSEASN' },
    { value: 'STRELIG', label: 'STRELIG' },
    { value: 'STS', label: 'STS' },
    { value: 'SWEDISH', label: 'SWEDISH' },
    { value: 'TAMIL', label: 'TAMIL' },
    { value: 'TELUGU', label: 'TELUGU' },
    { value: 'THAI', label: 'THAI' },
    { value: 'THEATER', label: 'THEATER' },
    { value: 'TIBETAN', label: 'TIBETAN' },
    { value: 'TURKISH', label: 'TURKISH' },
    { value: 'UGIS', label: 'UGIS' },
    { value: 'UKRAINI', label: 'UKRAINI' },
    { value: 'URDU', label: 'URDU' },
    { value: 'VIETNMS', label: 'VIETNMS' },
    { value: 'VIS SCI', label: 'VIS SCI' },
    { value: 'VIS STD', label: 'VIS STD' },
    { value: 'X', label: 'X' },
    { value: 'XMBA', label: 'XMBA' },
    { value: 'YIDDISH', label: 'YIDDISH' }
]

export default RequestPage
