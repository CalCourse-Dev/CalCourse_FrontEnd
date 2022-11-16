from pydantic import BaseModel

# Below are the structure of our tables in DynamoDB. Listed here for convenience.
class EmailAuthentication(BaseModel):
    email_address: str  # Primary key
    authentication_code: str
    creation_time: str   # UTC time
    creation_timestamp: str  # UTC time


class MissingRecord(BaseModel):
    
    course_name: str   # Primary key, course_name = department_code + " " + course_code + " " + lecture_id
    course_term: str   # Secondary key
    lecture_id: str
    total_count: int


class GoogleSignIn(BaseModel):
    email_address: str  # Primary key
    user_name: str
    email_verified: str
    signin_time: str    # UTC time
    signin_timestamp: str  # UTC time


class AccessToken(BaseModel):
    email: str  # Primary key
    creation_time: str   # UTC time
    creation_timestamp: str  # UTC time
    access_token: str

class Event(BaseModel):
    title: str  # Primary Key
    date: str  # Secondary Key
    duration: str
    time_zone: str
    slots: dict  # {slot_time_1: number_seats_left, ...}
    location: str
    description: str    
    contact: str
    qr_code: str
    event_id: str
    registered_info: dict  # {slot_time_1: [user_1_email, user_2_email], ...}


class EventRegisterInfo(BaseModel):
    event_id: str  # Primary Key
    email: str  # Secondary Key
    name: str
    wechat_id: str
    time_slot: str
    image: list  # a list of url to S3 bucket
    description: str
    other_concern: str


class AcademicPanel(BaseModel):
    email: str  # Primary Key
    website_links: dict  # dict of dicts, {course1: {website_name1: website_link1, ...}, ...}
