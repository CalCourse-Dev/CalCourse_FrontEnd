import CourseAPI from '../../../requests/CourseAPI'


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

    /** Unsuccessful request. */
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    /** Search field methods. */
    const onChange = (value: string) => {
        console.log(`selected ${value}`)
    }

    const onSearch = (value: string) => {
        console.log('search:', value)
    }

    const onFilter = (input: any, option: any) => {
        let upperInput = input.toUpperCase()
        if (upperInput === 'CS') {
            input = 'COMPSCI'
        } else if (upperInput === 'NST') {
            input = 'NUSCTX'
        } else if (upperInput === 'ENG') {
            input = 'ENGLISH'
        } else if (upperInput === 'DS') {
            input = 'DATA'
        } else if (upperInput === 'BIO') {
            input = 'BIOLOGY'
        } else if (upperInput === 'MCB') {
            input = 'MCELLBI'
        } else if (upperInput === 'IB') {
            input = 'INTEGBI'
        }
        return (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }

    /** Renders the page. */
    return (
        <div className="request-header">
            <div>
                <h1 className="site-page-header">申请建群</h1>

                <div style={{ padding: '0 50px' }}>
                    <div className="request-main">
                        <form name="basic" autoComplete="off">
                            <input name="courseTerm"></input>
                            <input name="deptCode">
                                {/* <Select
                                    showSearch
                                    placeholder="COMPSCI"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onSearch={onSearch}
                                    filterOption={onFilter}
                                    options={allDepts}
                                /> */}
                            </input>
                            <input name="courseCode" placeholder="61A"></input>

                            <button>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

const allDepts = [
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
