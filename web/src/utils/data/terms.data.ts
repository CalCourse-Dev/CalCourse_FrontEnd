import { t } from 'i18next';
import type { ITerm } from '../interfaces/interfaces'
import { tr } from 'date-fns/locale';

// This flag is used to prevent the terms from being updated multiple times
// we only want to update the terms once, when the API response is received
let stateFlag = false; 

// Change this from const to let, so that we can change the values when processing the API repsonse data
export let TERMS: ITerm[] = [
    { school_name_and_term: 'Fa23', label: 'Go Bears!', hidden: false }  // This is a dummy term, to be replaced by the real terms.
    // { school_name_and_term: 'UCB Mj01', label: '专业群' },
    // { school_name_and_term: 'UCB Fa23', label: 'Fall 课群' },
    // {
    //     school_name_and_term: 'UCB Sp24',
    //     label: 'Spring 2024 课群',
    //     hidden: true
    // },
    // { school_name_and_term: 'UCB Fa24', label: 'Fall 2024 课群', hidden: true },
    // {
    //     school_name_and_term: 'UCB Sp25',
    //     label: 'Spring 2025 课群',
    //     hidden: true
    // },
    // { school_name_and_term: 'UCB Lf01', label: 'Cal Life' }
];

const specialTermMapping: { [key: string]: string } = {
    'Mj01': '专业群',
    'Lf01': 'Cal Life',
};

const normalTermMapping: { [key: string]: string } = {
    'Fa': 'Fall',
    'Sp': 'Spring',
    'Su': 'Summer',
    'Wi': 'Winter',
};

function getCorrectYear(term: string, year: number, month: number): string {
    // Check if the last two characters are digits, if so, we should use them as the year
    const lastTwoDigits = term.slice(-2);
    if (!isNaN(Number(lastTwoDigits))) {
        const fullYear = 2000 + Number(lastTwoDigits);
        return `${fullYear}`;
    }

    // If the year number is not provided, we need to infer it from the current month
    if (term.slice(0, 2) === 'Sp' && month >= 5) {
        return `${year + 1}`;
    } else if (term.slice(0, 2) === 'Wi' && month >= 11) {
        return `${year + 1}`;
    } else {
        return `${year}`;
    }
}

function filterCorrectTerm(term: string, month: number): boolean {
    if (term.slice(0, 2) === 'Fa') {
        return month >= 5;
    } else if (term.slice(0, 2) === 'Sp') {
        return month >= 1 && month <= 6;
    } else if (term.slice(0, 2) === 'Su') {
        return month >= 4 && month <= 9;
    } else if (term.slice(0, 2) === 'Wi') {
        return month >= 11 || month <= 2;  
    } else {
        return true;
    }
}

export function updateTerms(TERMS: ITerm[], termList: Set<string>): void {
    if (stateFlag) {
        return;
    }
    
    let modifyFlag = true; // Need to modify the first term so that it is automatically selected, otherwise no term will be selected 

    // Get the current year in string format
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth() + 1; // getMonth() returns 0-11, so we need to add 1

    // Choose to display only the relevant terms
    // Terms are coded like "Fa25", "Sp26" etc.
    // We only want to display the current term (e.g. Fa25 when now is Sep-2025)
    // and any terms in the future. Anything earlier than the current term
    // should be hidden.

    // Helper for ordering the seasons within a year
    const seasonOrder: { [key: string]: number } = { 'Wi': 0, 'Sp': 1, 'Su': 2, 'Fa': 3 };

    // Determine what we consider to be the *current* term code based on month
    let currentSeasonCode: string;
    if (currentMonth >= 11 || currentMonth <= 2) {
        currentSeasonCode = 'Wi'; // Nov-Dec-Jan-Feb
    } else if (currentMonth >= 9) {
        currentSeasonCode = 'Fa'; // Sep-Oct
    } else if (currentMonth >= 5) {
        currentSeasonCode = 'Su'; // May-Aug
    } else {
        currentSeasonCode = 'Sp'; // Mar-Apr (fallback Jan-Feb handled above)
    }

    const currentTermValue = currentYear * 10 + seasonOrder[currentSeasonCode];

    // Convert a term string into a comparable numeric value
    const termToNumeric = (term: string): number => {
        const seasonCode = term.slice(0, 2);
        const yearDigits = term.slice(-2);
        const seasonVal = seasonOrder[seasonCode] ?? 0;
        let yearVal = currentYear;
        if (!isNaN(Number(yearDigits))) {
            yearVal = 2000 + Number(yearDigits);
        }
        return yearVal * 10 + seasonVal;
    };

    // Build the filtered list: keep special terms always; keep normal terms only
    // if they are current or in the future.
    let termListArray = Array.from(termList).filter((term) => {
        if (term in specialTermMapping) {
            return true;
        }
        return termToNumeric(term) >= currentTermValue;
    });

    termListArray.forEach((term) => {
        if (term.slice(0, 2) in normalTermMapping) {
            if (modifyFlag) {
                TERMS[0].school_name_and_term = term;
                TERMS[0].label = `${normalTermMapping[term.slice(0, 2)]} ${getCorrectYear(term, currentYear, currentMonth)} 课群`;
                modifyFlag = false;
            } else {
                TERMS.push({
                school_name_and_term: term,
                label: `${normalTermMapping[term.slice(0, 2)]} ${getCorrectYear(term, currentYear, currentMonth)} 课群`,
                });
            }
        }
    })

    termListArray.forEach((term) => {
        if (term in specialTermMapping) {
            TERMS.push({
                school_name_and_term: term,
                label: specialTermMapping[term],
            })
        }
    })

    stateFlag = true;
}
