import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import Background from './Background.component'
import NavBar from './NavBar.component'

const Navigation = () => {
    return (
        <div className='min-h-min'>
            <NavBar />
            <main className="ml-[20vw] z-10">
                <Outlet />
            </main>
            <Background />
        </div>
    )
}

export default Navigation
