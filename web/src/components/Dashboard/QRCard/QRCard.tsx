import "./QRCard.css"
import { QRCodeSVG } from "qrcode.react"
import type { CourseData } from "../../../utils/interfaces"

const QRCard = (props: CourseData) => {
    return (
        <div id="card-container" key={props["course_name"]}>
            <div className="card">
                <div className="id-wrapper">
                    <div className="id">
                        <span>
                            <span>
                                {props["course_name"].replace("/", " / ")}
                            </span>
                        </span>
                    </div>
                </div>
                <div className="qrcode">
                    <QRCodeSVG
                        className="img"
                        value={props["course_qr_code_url"]}
                        size={280}
                        bgColor="transparent"
                        fgColor="#333"
                    />
                </div>
                <div className="desc">{props["course_id"]}</div>
            </div>
        </div>
    )
}
export default QRCard
