const navbar_items: INavBarItem[] = [
    {
        label: 'Hub',
        icon: 'Hub',
    },
    {
        label: '群聊查找',
        icon: 'groupchats',
        link: 'dashboard',
    },
    {
        label: '学术资源',
        icon: 'academic-resouces',
    },
    {
        label: 'FAQ & 帮助',
        icon: 'faq',
    },
]

interface INavBarItem {
    label: string
    icon: string
    link?: string
}

const NavBar = () => {
    return (
        <nav className="fixed bg-slate-500 w-[20vw] min-h-screen min-w-[250px] p-4">
            <h1 className="mx-auto w-full text-4xl mt-10 text-center font-logo font-black text-[#030944] opacity-[.87]">
                CalCourse
            </h1>
            <ul className="right-0">
                {navbar_items.map(item => NavBarItem(item))}
            </ul>
        </nav>
    )
}

export default NavBar

const NavBarItem = (item: INavBarItem) => {
    return (
        <li className="right-0">
            <h2 className="">{item.label}</h2>
        </li>
    )
}
