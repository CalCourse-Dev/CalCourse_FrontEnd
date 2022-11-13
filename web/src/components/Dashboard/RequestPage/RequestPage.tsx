import React, { useContext } from "react";
import { constants } from "fs/promises";
import {
  PageHeader,
  message,
  Layout,
  Form,
  Input,
  Button,
  Select,
  Radio,
  Space,
  Card,
} from "antd";
import CourseAPI from "../../../requests/CourseAPI";
import { getAllCourses } from "../../../requests/Course-API/get-all-courses";
import {
  defaultErrorHandler,
  defaultResponseHandler,
} from "../../../requests/base-requests";
import { valueType } from "antd/lib/statistic/utils";

const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;


// to-do: add additional parameter allTerms;
const RequestPage = () => { 
  /** Successful request: push data to api */
  const onFinish = (values: any) => {
    let newMissingClassData = {
      department_code: values.deptCode,
      course_code: values.courseCode,
      lecture_id: values.lectureId,
      course_term: values.courseTerm,
    };
    console.log(newMissingClassData);
    CourseAPI.reportMissingClass(
      newMissingClassData,
      (data) => {
        message.success("Request successful.", 5);
        console.log(data.message);
      },
      (e) => {
        console.log(e);
      }
    );
  };

  /** Unsuccessful request. */
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  /** Search field methods. */
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };
  
  const onFilter = (input: any, option: any) => {
    if (input.toUpperCase() == "CS") {
      input = "COMPSCI";
    }
    return (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  }

  /** Renders the page. */
  return (
    <div className="request-header">
      <Layout>
        <PageHeader
          className="site-page-header"
          onBack={() => window.history.back()}
          title="Cal Course"
          subTitle="申请建群"
        />
        <Content style={{ padding: "0 50px" }}>
          <div className="request-main">
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Semester"
                name="courseTerm"
                rules={[
                  { required: true, message: "Please choose a semester" },
                ]}
              >
                <Radio.Group>
                  <Radio.Button value="FA22">Fall 2022</Radio.Button>
                  <Radio.Button value="SP23">Spring 2023</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="Department Code"
                name="deptCode"
                rules={[
                  {
                    required: true,
                    message: "Please enter a department code (e.g. COMPSCI)",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="COMPSCI"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={onFilter}
              
                  options={allDepts}
                />
              </Form.Item>
              <Form.Item
                label="Course code"
                name="courseCode"
                rules={[
                  {
                    required: true,
                    message: "Please enter a course number (e.g. 61A)",
                  },
                ]}
              >
                <Input placeholder="61A" />
              </Form.Item>
              <Form.Item
                label="LEC"
                name="lectureId"
                rules={[
                  {
                    required: true,
                    message: "Please enter a course number (e.g. 61A)!",
                  },
                ]}
              >
                <Input placeholder="001" />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    </div>
  );
};

const allDepts = [
  { value: "AERO ENG", label: "AERO ENG" },
  { value: "AEROSPC", label: "AEROSPC" },
  { value: "AFRICAM", label: "AFRICAM" },
  { value: "AMERSTD", label: "AMERSTD" },
  { value: "AGRS", label: "AGRS" },
  { value: "AHMA", label: "AHMA" },
  { value: "ANTHRO", label: "ANTHRO" },
  { value: "AST", label: "AST" },
  { value: "ARABIC", label: "ARABIC" },
  { value: "ARCH", label: "ARCH" },
  { value: "ARMENI", label: "ARMENI" },
  { value: "HISTART", label: "HISTART" },
  { value: "ART", label: "ART" },
  { value: "HUM", label: "HUM" },
  { value: "ASAMST", label: "ASAMST" },
  { value: "ASIANST", label: "ASIANST" },
  { value: "ASTRON", label: "ASTRON" },
  { value: "BANGLA", label: "BANGLA" },
  { value: "BIO ENG", label: "BIO ENG" },
  { value: "BIOLOGY", label: "BIOLOGY" },
  { value: "BIOPHY", label: "BIOPHY" },
  { value: "BOSCRSR", label: "BOSCRSR" },
  { value: "BUDDSTD", label: "BUDDSTD" },
  { value: "BULGARI", label: "BULGARI" },
  { value: "BURMESE", label: "BURMESE" },
  { value: "EWMBA", label: "EWMBA" },
  { value: "XMBA", label: "XMBA" },
  { value: "MBA", label: "MBA" },
  { value: "PHDBA", label: "PHDBA" },
  { value: "UGBA", label: "UGBA" },
  { value: "EDSTEM", label: "EDSTEM" },
  { value: "CATALAN", label: "CATALAN" },
  { value: "CELTIC", label: "CELTIC" },
  { value: "CHM ENG", label: "CHM ENG" },
  { value: "CHEM", label: "CHEM" },
  { value: "CHICANO", label: "CHICANO" },
  { value: "CHINESE", label: "CHINESE" },
  { value: "CY PLAN", label: "CY PLAN" },
  { value: "CIV ENG", label: "CIV ENG" },
  { value: "CLASSIC", label: "CLASSIC" },
  { value: "COG SCI", label: "COG SCI" },
  { value: "COLWRIT", label: "COLWRIT" },
  { value: "COMPBIO", label: "COMPBIO" },
  { value: "COM LIT", label: "COM LIT" },
  { value: "CMPBIO", label: "CMPBIO" },
  { value: "COMPSCI", label: "COMPSCI" },
  { value: "CRWRIT", label: "CRWRIT" },
  { value: "CRIT TH", label: "CRIT TH" },
  { value: "CUNEIF", label: "CUNEIF" },
  { value: "CZECH", label: "CZECH" },
  { value: "DANISH", label: "DANISH" },
  { value: "DATASCI", label: "DATASCI" },
  { value: "DATA", label: "DATA" },
  { value: "DEMOG", label: "DEMOG" },
  { value: "DES INV", label: "DES INV" },
  { value: "DEV ENG", label: "DEV ENG" },
  { value: "DEVP", label: "DEVP" },
  { value: "DEV STD", label: "DEV STD" },
  { value: "DIGHUM", label: "DIGHUM" },
  { value: "DUTCH", label: "DUTCH" },
  { value: "EPS", label: "EPS" },
  { value: "EA LANG", label: "EA LANG" },
  { value: "ECON", label: "ECON" },
  { value: "EDUC", label: "EDUC" },
  { value: "EGYPT", label: "EGYPT" },
  { value: "EECS", label: "EECS" },
  { value: "EL ENG", label: "EL ENG" },
  { value: "ENGIN", label: "ENGIN" },
  { value: "ENGLISH", label: "ENGLISH" },
  { value: "ENV DES", label: "ENV DES" },
  { value: "ENVECON", label: "ENVECON" },
  { value: "ESPM", label: "ESPM" },
  { value: "ENV SCI", label: "ENV SCI" },
  { value: "ETH STD", label: "ETH STD" },
  { value: "EUST", label: "EUST" },
  { value: "X", label: "X" },
  { value: "FILIPN", label: "FILIPN" },
  { value: "FILM", label: "FILM" },
  { value: "MFE", label: "MFE" },
  { value: "FINNISH", label: "FINNISH" },
  { value: "FOLKLOR", label: "FOLKLOR" },
  { value: "FRENCH", label: "FRENCH" },
  { value: "GWS", label: "GWS" },
  { value: "GEOG", label: "GEOG" },
  { value: "GERMAN", label: "GERMAN" },
  { value: "GMS", label: "GMS" },
  { value: "GPP", label: "GPP" },
  { value: "GLOBAL", label: "GLOBAL" },
  { value: "GSPDP", label: "GSPDP" },
  { value: "GREEK", label: "GREEK" },
  { value: "HMEDSCI", label: "HMEDSCI" },
  { value: "HEBREW", label: "HEBREW" },
  { value: "HINDI", label: "HINDI" },
  { value: "HISTORY", label: "HISTORY" },
  { value: "HUNGARI", label: "HUNGARI" },
  { value: "ICELAND", label: "ICELAND" },
  { value: "INDONES", label: "INDONES" },
  { value: "IND ENG", label: "IND ENG" },
  { value: "CYBER", label: "CYBER" },
  { value: "INFO", label: "INFO" },
  { value: "INTEGBI", label: "INTEGBI" },
  { value: "ISF", label: "ISF" },
  { value: "IAS", label: "IAS" },
  { value: "IRANIAN", label: "IRANIAN" },
  { value: "ITALIAN", label: "ITALIAN" },
  { value: "JAPAN", label: "JAPAN" },
  { value: "JEWISH", label: "JEWISH" },
  { value: "JOURN", label: "JOURN" },
  { value: "KHMER", label: "KHMER" },
  { value: "KOREAN", label: "KOREAN" },
  { value: "LD ARCH", label: "LD ARCH" },
  { value: "LAN PRO", label: "LAN PRO" },
  { value: "LATAMST", label: "LATAMST" },
  { value: "LATIN", label: "LATIN" },
  { value: "LAW", label: "LAW" },
  { value: "LEGALST", label: "LEGALST" },
  { value: "LGBT", label: "LGBT" },
  { value: "LINGUIS", label: "LINGUIS" },
  { value: "MAT SCI", label: "MAT SCI" },
  { value: "MPS", label: "MPS" },
  { value: "MATH", label: "MATH" },
  { value: "MEC ENG", label: "MEC ENG" },
  { value: "MEDIAST", label: "MEDIAST" },
  { value: "MED ST", label: "MED ST" },
  { value: "MELC", label: "MELC" },
  { value: "MIL AFF", label: "MIL AFF" },
  { value: "MIL SCI", label: "MIL SCI" },
  { value: "MCELLBI", label: "MCELLBI" },
  { value: "MONGOLN", label: "MONGOLN" },
  { value: "MUSIC", label: "MUSIC" },
  { value: "NSE", label: "NSE" },
  { value: "NATAMST", label: "NATAMST" },
  { value: "NAT RES", label: "NAT RES" },
  { value: "NAV SCI", label: "NAV SCI" },
  { value: "NEUROSC", label: "NEUROSC" },
  { value: "NWMEDIA", label: "NWMEDIA" },
  { value: "NORWEGN", label: "NORWEGN" },
  { value: "NUC ENG", label: "NUC ENG" },
  { value: "NUSCTX", label: "NUSCTX" },
  { value: "OPTOM", label: "OPTOM" },
  { value: "PACS", label: "PACS" },
  { value: "PERSIAN", label: "PERSIAN" },
  { value: "PHILOS", label: "PHILOS" },
  { value: "PHYS ED", label: "PHYS ED" },
  { value: "PHYSICS", label: "PHYSICS" },
  { value: "PLANTBI", label: "PLANTBI" },
  { value: "POLISH", label: "POLISH" },
  { value: "POLECON", label: "POLECON" },
  { value: "POL SCI", label: "POL SCI" },
  { value: "PORTUG", label: "PORTUG" },
  { value: "PSYCH", label: "PSYCH" },
  { value: "PUB AFF", label: "PUB AFF" },
  { value: "PB HLTH", label: "PB HLTH" },
  { value: "PUB POL", label: "PUB POL" },
  { value: "PUNJABI", label: "PUNJABI" },
  { value: "RDEV", label: "RDEV" },
  { value: "RHETOR", label: "RHETOR" },
  { value: "RUSSIAN", label: "RUSSIAN" },
  { value: "SANSKR", label: "SANSKR" },
  { value: "SCANDIN", label: "SCANDIN" },
  { value: "SCMATHE", label: "SCMATHE" },
  { value: "STS", label: "STS" },
  { value: "SEMITIC", label: "SEMITIC" },
  { value: "SLAVIC", label: "SLAVIC" },
  { value: "SOC WEL", label: "SOC WEL" },
  { value: "SOCIOL", label: "SOCIOL" },
  { value: "SSEASN", label: "SSEASN" },
  { value: "SASIAN", label: "SASIAN" },
  { value: "SEASIAN", label: "SEASIAN" },
  { value: "SPANISH", label: "SPANISH" },
  { value: "STAT", label: "STAT" },
  { value: "STRELIG", label: "STRELIG" },
  { value: "SWEDISH", label: "SWEDISH" },
  { value: "TAMIL", label: "TAMIL" },
  { value: "TELUGU", label: "TELUGU" },
  { value: "THAI", label: "THAI" },
  { value: "THEATER", label: "THEATER" },
  { value: "TIBETAN", label: "TIBETAN" },
  { value: "TURKISH", label: "TURKISH" },
  { value: "UKRAINI", label: "UKRAINI" },
  { value: "UGIS", label: "UGIS" },
  { value: "URDU", label: "URDU" },
  { value: "VIETNMS", label: "VIETNMS" },
  { value: "VIS SCI", label: "VIS SCI" },
  { value: "VIS STD", label: "VIS STD" },
  { value: "YIDDISH", label: "YIDDISH" },
];

export default RequestPage;
