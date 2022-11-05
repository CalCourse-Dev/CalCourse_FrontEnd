import * as React from "react";
import { Component, useState } from "react";
import { constants } from "fs/promises";
import {
  PageHeader,
  message,
  Layout,
  Form,
  Input,
  Button,
  Select,
} from "antd";
import CourseAPI from "../../../requests/CourseAPI";

const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;

const RequestPage = () => {
  /** Successful request: push data to api */
  const onFinish = (values: any) => {
    let newClass = {
      department_code: values.deptCode,
      course_code: values.courseCode,
      lecture_id: values.lectureId,
      course_term: values.courseTerm,
    };
    console.log(newClass);
    CourseAPI.reportMissingClass(
      newClass,
      (newClass) => {
        message.success("Request successful.", 5);
        console.log("Success");
      },
      (newClass) => {
        console.log("Error");
      }
    );
  };

  /** Unsuccessful request. */
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="request-main">
      <Layout>
        <PageHeader
          className="site-page-header"
          onBack={() => window.history.back()}
          title="Cal Course"
          subTitle="申请建群"
        />

        <div>
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
              rules={[{ required: true, message: "Please choose a semester" }]}
            >
              <Select placeholder="Spring 2023" allowClear>
                <Option value="FA22">Fall 2022</Option>
                <Option value="Spring 2023">Spring 2023</Option>
              </Select>
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
              <Input placeholder="COMPSCI" />
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

        <Footer>
          <div>
            <button className="button small-button about-toggle w-10">
              <div>👥</div>
            </button>
            <button className="button small-button cookies-toggle w-10">
              <div>🍪</div>
            </button>
            <button className="button small-button help-toggle w-10">
              <div>?</div>
            </button>
          </div>
        </Footer>
      </Layout>
    </div>
  );
};

export default RequestPage;
