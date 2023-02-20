import { Outlet } from 'react-router-dom'
import Background from './Background/Background.component'
import NavBar from './NavBar/NavBar.component'

// Outlet Component的用法可以参考https://reactrouter.com/en/main/components/outlet
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
