export interface UserData {
  email: string;
  wechat_id: string;
}

export interface CourseData {
  course_name: string;
  course_term: string;
  course_id: string;
  course_qr_code_url: string;
}

export interface MissingRecord {
  department_code: string;
  course_code: string;
  lecture_id: string;
  course_term: string;
}