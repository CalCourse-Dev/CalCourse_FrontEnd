import { deleteCourse } from "./Course-API/delete-course";
import { getAllCourses } from "./Course-API/get-all-courses";
import { reportMissingClass } from "./Course-API/report-missing-class";
import { updateCourse } from "./Course-API/update-course";
import { uploadCourse } from "./Course-API/upload-course";

const CourseAPI = {
  deleteCourse,
  getAllCourses,
  reportMissingClass,
  updateCourse,
  uploadCourse,
};

export default CourseAPI;
