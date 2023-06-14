import { Dispatch, SetStateAction, useCallback, useState } from 'react'

export const useToggle = (
    defaultValue?: boolean
): [
    value: boolean,
    toggle: () => void,
    setValue: Dispatch<SetStateAction<boolean>>
] => {
    const [value, setValue] = useState<boolean>(!!defaultValue)

    const toggle = useCallback(() => setValue(x => !x), [])

    return [value, toggle, setValue]
}
