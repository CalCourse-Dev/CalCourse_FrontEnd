import React, { useState, useEffect } from 'react'
import { MdAccessTimeFilled } from "react-icons/md"
import { IoEarth } from "react-icons/io5"
import { AiTwotoneCalendar } from "react-icons/ai"
import { format } from "date-fns";

import { Button, Image, Form, Input, Radio } from 'antd';
import 'antd/dist/antd.css';
import "./SignupInfo.css";

const { TextArea } = Input;
const onFinish = (values: any) => {
    console.log(values);
};

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
  
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
    }
};

const SignupInfo = () => {

    return (
        <div className="w-[100vw] h-[100vh] h-auto bg-[#fbfcfd] flex justify-center items-center">
            <div className="w-auto h-[50rem] lg:my-20 md:my-20 bg-white flex lg:flex-row md:flex-col md:h-auto md:mx-16 sm:flex-col sm:h-auto content-center border-[#e8e8e8] border-[1px] rounded-lg shadow-md">
                <div className='lg:w-[27rem] md:w-[100%] xl:border-r-[1.2px] p-7 font-semibold flex flex-col items-center border-b-[1.2px]'>
                    <span className='text-[#767676] text-lg'>Hans Mao</span>
                    <h1 className='text-3xl text-[#1d1d1d] font-bold mt-1'>30 Minute Meeting</h1>
                    <div className='flex items-center gap-2 mt-8 text-[#737373]'>
                        <MdAccessTimeFilled size={28} />
                        <span className='text-lg'>30 min</span>
                    </div>

                    <div className='flex items-center gap-2 mt-5 text-[#737373]'>
                        <AiTwotoneCalendar size={28} />
                        <span className='text-lg'>Date</span>
                    </div>

                    <div className='flex items-center gap-2 mt-5 text-[#737373]'>
                        <IoEarth size={28} />
                        <span>Pacific Time - US & Canada</span>
                    </div>
                </div>


                <div className='flex flex-row lg:w-auto md:flex-col'>
                    <div className='w-[35rem] h-full p-7 flex flex-col md:w-[100%] sm:w-[100%]'>
                        <span className='font text-xl font-semibold w-full mb-3'>Enter Details</span>
                        <div className='theForm'>
                            <Form {...layout} className='place-content-center' layout="vertical" labelAlign="left" name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                                <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                                    <Input placeholder="Please enter your name" allowClear />
                                </Form.Item>
                                <Form.Item name={['user', 'email']} label="Email (@berkeley.edu email)" rules={[{ type: 'email', required: true }]}>
                                <Input placeholder="Please enter your @berkeley.edu email" allowClear />
                                </Form.Item>
                                <Form.Item name={['user', 'wechat']} label="Wechat ID" rules={[{ required: true }]}>
                                    <Input placeholder="Please enter your WeChat ID" allowClear required />
                                </Form.Item>
                                <Form.Item name={['user', 'question']} label="描述下想在这期Coding Lounge里解决什么问题？（至少 80字，我们会根据回答分配合适的mentor。举个例子，如果是career planning，请描述更具体一点，比方说是关于graduate school的问题还是研究方向，etc)" rules={[{required: true}]}>
                                    <TextArea allowClear required />
                                </Form.Item>

                                <Form.Item name={['user', 'groupAdded']} label="有加Coding Lounge Q&A 微信群吗" rules={[{ required: true }]}>
                                {/* <Image
                                    width={200}
                                    src="CalCourseGroup.png"
                                /> */}
                                    <Radio.Group>
                                        <Radio value="apple"> 有! </Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item name={['user', 'otherQuestions']} label="Anything questions, concerns?" >
                                    <TextArea allowClear />
                                </Form.Item>

                                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                    <Button type="primary" htmlType="submit">
                                    Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SignupInfo;