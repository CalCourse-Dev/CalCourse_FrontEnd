import { deleteCourse } from './course-api/delete-course';
import { getAllCourses } from './course-api/get-all-courses';
import { reportMissingClass } from './course-api/report-missing-class';
import { updateCourse } from './course-api/update-course';
import { uploadCourse } from './course-api/upload-course';


const CourseAPI = {
    deleteCourse,
    getAllCourses,
    reportMissingClass,
    updateCourse,
    uploadCourse
};

export default CourseAPI;
