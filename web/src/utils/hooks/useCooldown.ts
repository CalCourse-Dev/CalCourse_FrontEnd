import { useEffect, useState } from 'react'

export const useCooldown = (
    cooldownTime: number
): [number, () => void] => {
    const [cooldown, set_cooldown] = useState<number>(cooldownTime)
    const [cooling_down, set_cooling_down] = useState(false)
    useEffect(() => {
        let cooldownTimer: number
        if (cooldown > 0 && cooling_down) {
            cooldownTimer = window.setTimeout(
                () => set_cooldown(value => value - 1),
                1000
            )
        }
        if (cooldown === 0) {
            set_cooling_down(false)
            set_cooldown(cooldownTime)
        }
        return () => window.clearTimeout(cooldownTimer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cooldown, cooling_down])

    return [
        cooldown,
        () => {
            set_cooling_down(true)
        }
    ]
}
