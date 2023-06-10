import { AiFillBug } from "react-icons/ai"

const Playground = () => {
    return (
        <div>
            <div className="buttons">
                <button className="btn-rounded-full m-4">
                    Testing Button Full
                </button>
                <button className="btn-rounded-corner m-4">
                    Testing Button Corner
                </button>
                <button className="btn-rounded-gradient m-4">
                    Testing Button Gradient
                </button>
                <button className="btn-transluscent">
                    <AiFillBug />
                </button>
            </div>
            <div>
                <div className="card-transluscent"></div>
            </div>
            <div>
                <h1 className="text-title">Title</h1>
            </div>
        </div>
    )
}

export default Playground
