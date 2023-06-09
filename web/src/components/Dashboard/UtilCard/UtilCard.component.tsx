interface IUtilCard {
    label: string
    onClickHandler: () => void
}

const UtilCard = ({ label, onClickHandler }: IUtilCard) => {
    return (
        <div
            className={`${'card-transluscent'} h-64 w-full duration-300 overflow-hidden flex justify-center items-center flex-col cursor-pointer`}
            onClick={onClickHandler}
        >
            <h1
                className={`absolute text-center text-lg h-min mx-auto font-bold text-graphite`}
            >
                {label}
            </h1>
        </div>
    )
}

export default UtilCard
