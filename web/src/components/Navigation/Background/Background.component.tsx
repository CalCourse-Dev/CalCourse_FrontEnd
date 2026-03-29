import './Background.css'

interface BackgroundProps {
    gradientClass: string
}

const Background = ({ gradientClass }: BackgroundProps) => (
    <div
        id="bg-gradient"
        className={`fixed ${gradientClass} top-0 block w-screen h-screen z-[-999]`}
    />
)

export default Background
