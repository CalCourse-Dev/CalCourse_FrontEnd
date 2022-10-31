import "./QRCard.css";
import { QRCodeSVG } from "qrcode.react";

const QRCard = (props: any) => {

  return (
    <div id="card-container">
      <div className="card">
        <div className="id-wrapper">
          <div className="id">
            <span>
              <span>{props["course_name"]}</span>
            </span>
          </div>
        </div>
        <div className="qrcode">
          <QRCodeSVG
            className="img"
            value={props["course_qr_code_url"]}
            size={280}
          />
        </div>
        <div className="desc">{props["course_id"]}</div>
      </div>
    </div>
  );
};
export default QRCard;
