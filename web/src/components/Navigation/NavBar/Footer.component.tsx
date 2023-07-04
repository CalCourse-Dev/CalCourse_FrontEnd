const Footer = () => {
    return (
        <footer className="align-baseline h-min absolute bottom-0 w-full text-center text-sm mb-4 px-4 text-graphite opacity-60">
            {/* @audit fix the link */}
            Learn more about the team <a href="/" className="underline decoration-1 decoration-dotted underline-offset-2">here</a>
        </footer>
    )
}
export default Footer
