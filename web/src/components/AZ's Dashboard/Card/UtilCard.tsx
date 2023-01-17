// @audit 这个 page 的结构和 css 我是真没读懂，放弃了，等有时间再来 fix 吧
const UtilCard = (props: { icon: string; label: string }) => {
    return (
        <div key={props.label}>
            <h1>{props.icon}</h1>
            <h1>{props.label}</h1>
        </div>
    )
}
export default UtilCard
