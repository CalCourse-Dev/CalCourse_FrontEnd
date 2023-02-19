import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar.component'

const Navigation = () => {
    return (
        <div className='min-h-min'>
            <NavBar />
            <main className="ml-[20vw]">
                <Outlet />
            </main>
        </div>
    )
}

export default Navigation
