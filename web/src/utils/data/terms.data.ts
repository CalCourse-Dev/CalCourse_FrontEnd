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
        return month <= 6 || month >= 12;
    } else if (term.slice(0, 2) === 'Su') {
        return month >= 4 && month <= 9;
    } else if (term.slice(0, 2) === 'Wi') {
        return month >= 10 || month <= 3;  // TODO: This is a temp fix. It should be month >= 11
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
    // Terms are in the format of "Fall", "Spring", "Summer", "Winter"
    // Decide by comparing the current month
    let termListArray = Array.from(termList);
    termListArray = termListArray.filter((term) => filterCorrectTerm(term, currentMonth));

    // normal terms come first, then special terms
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
