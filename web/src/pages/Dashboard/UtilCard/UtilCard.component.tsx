import { IUtilCard } from '../../../utils/interfaces/interfaces'

const UtilCard = ({ label, onClickHandler }: IUtilCard) => {
    return (
        <div
            className="card-transluscent h-64 w-42 duration-300 overflow-hidden flex justify-center items-center flex-col cursor-pointer"
            onClick={onClickHandler}
        >
            <h1
                className={`absolute text-center text-lg h-min mx-auto font-bold`}
            >
                {label}
            </h1>
        </div>
    )
}

export default UtilCard
