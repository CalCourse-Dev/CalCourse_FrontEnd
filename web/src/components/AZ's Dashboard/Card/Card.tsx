import "./Card.scss";
import { CourseData } from "../../../utils/interfaces";

const Card = (props: CourseData) => {

  return (
    <div id="card-container" key={props["course_name"]}>
      <div className="card">
        <div className="id-wrapper">
          <div className="id">
            <span>
              <span>{props["course_name"]}</span>
            </span>
          </div>
        </div>
        <div className="qrcode">
        </div>
        <div className="desc">{props["course_id"]}</div>
      </div>
    </div>
  );
};
export default Card;