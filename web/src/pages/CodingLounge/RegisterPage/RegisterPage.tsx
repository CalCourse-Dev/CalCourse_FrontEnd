import React from 'react'
import { useForm } from "react-hook-form";
import { MdAccessTimeFilled, MdLocationOn } from "react-icons/md"
import { GiEarthAmerica } from "react-icons/gi"
import { HiOutlineArrowLeft } from "react-icons/hi"
import { AiTwotoneCalendar } from "react-icons/ai"
import codingLoungeGroup from './CodingLounge.png'
import EventAPI from "../../../requests/EventAPI";

interface registerPageProps{
    info: {
        contact: string,
        description: string,
        duration: string,
        location: string,
        time_zone: string
    },
    confirmDate: string,
    eventID: string,
    confirmTimeKey: string,
    setConfirm: (status: boolean) => void,
    setIsSubmitSuccessful: (status: boolean) => void
}

const RegisterPage = (props: registerPageProps) => {

    const {info, confirmDate, eventID, confirmTimeKey, setConfirm, setIsSubmitSuccessful} = props;
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmitResponseHandler = (data: any) => {
        console.log("response data")
        setIsSubmitSuccessful(true);
    }

    const onSubmitErrorHandler = (error: any) => {
        alert("Failed to register. Please try again later")
        setIsSubmitSuccessful(false);
    }

    const onSubmit = (data:any) => {
        console.log("RESULT", data);
        console.log("time key", confirmTimeKey);
        EventAPI.registerEvent({
            event_id: eventID,
            email: data.email,
            name: data.username,
            wechat_id: data.wechatId,
            time_slot: confirmTimeKey,
            image: [data.wechatGroup],
            description: data.description,
            other_concern: data.otherQuestions
        }, onSubmitResponseHandler, onSubmitErrorHandler)
    };

    return (
        <div className="w-auto h-[40rem] bg-white border-[#e8e8e8] border-[1px] rounded-lg shadow-md flex lg:flex-col lg:h-auto md:flex-col md:h-auto">
            <div
            className="w-[27rem] md:w-[100%] lg:w-[46rem] h-full xl:border-r-[1.2px] p-7 font-semibold 
                                flex flex-col lg:items-center lg:border-b-[1.2px] md:items-center md:border-b-[1.2px] sm:items-center
                                lg:relative md:relative sm:relative"
            >
            <button
                type="button"
                className="text-[#297bff] w-[3rem] h-[3rem] border border-[#e8e8e8] hover:bg-[#dfe8ff] 
                                        focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full 
                                        text-sm p-2.5 text-center inline-flex items-center
                                        lg:absolute lg:left-6 top-[10.8rem] tall:top-[3vh] md:absolute md:left-4 sm:w-[2.4rem] sm:h-[2.4rem] sm:p-1.5
                                        justify-center mb-5"
                            onClick={() => setConfirm(false)}>
                        <HiOutlineArrowLeft size={28}></HiOutlineArrowLeft>
                    </button>
                    <span className='text-[#767676] text-lg mt-36 tall:mt-0 text-ellipsis overflow-hidden'>{info.contact}</span>
                    <h1 className='text-2xl text-[#1d1d1d] text-ellipsis overflow-hidden'>{info.description}</h1>
                    <div className='w-full h-auto lg:flex lg:justify-center lg:gap-x-5 lg:flex-wrap'>
                        <div className='flex items-center gap-2 mt-5 text-[#737373] lg:mt-3'>
                            <MdAccessTimeFilled size={28}/>
                            <span>{info.duration} min</span>
                        </div>
                        <div className='flex gap-2 mt-3 text-[#737373] items-center'>
                            <AiTwotoneCalendar size={28} />
                            <span>{confirmDate}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-3 text-[#737373]">
                            <MdLocationOn size={28} />
                            <span>{info.location.includes("http") ? "Online" : "In person"}</span>
                        </div>
                        <div className='flex gap-2 items-center mt-3 text-[#737373]'>
                            <GiEarthAmerica size={28} />
                            <span>{info.time_zone}</span>
                        </div>
                    </div>
                </div>
                <div className='flex lg:w-auto flex-col md:items-center p-7 lg:items-center'>
                    <p className='text-xl font-semibold'>Enter Details</p>
                    <div className='flex flex-col w-[30rem] overflow-y-auto overflow-x-auto mt-3 lg:w-[40rem] md:w-auto sm:w-auto'>
                        <form className='mr-3' onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex w-full justify-between gap-10 md:flex-col md:gap-0'>
                                <div className="mb-5 w-full">
                                    <label id="username" className="block mb-2 text-sm font-medium text-gray-900">Name *</label>
                                    <input type="text" className={`${errors.username && `error`} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                                    {...register("username", {
                                        required: true
                                        })}/>
                                    {errors.username && <h1 className='mt-2 text-sm font-medium text-red-700'>Can't be blank!</h1>}
                                </div>

                                <div className="mb-5 w-full">
                                    <label id="wechatId" className="block mb-2 text-sm font-medium text-gray-900">Wechat ID *</label>
                                    <input type="text" className={`${errors.wechatId && `error`} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                                    {...register("wechatId", {
                                        required: true,
                                        validate: (value) => value.length !== 0
                                        })}/>
                                    {errors.wechatId && <h1 className='mt-2 text-sm font-medium text-red-700'>Can't be blank!</h1>}
                                </div>
                            </div>

                            <div className="mb-6">
                                <label id="email" className="block mb-2 text-sm font-medium text-gray-900">Email (@berkeley.edu email) *</label>
                                <input type="email" className={`${errors.email && `error`} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                                {...register("email", {
                                    required: true,
                                    pattern: /.+@berkeley\.edu/
                                    })}/>
                                {errors.email && <h1 className='mt-2 text-sm font-medium text-red-700'>Please enter your @berkeley.edu email! </h1>}

                            </div>

                            <div className="mb-6">
                                <label id="description" className="block mb-2 text-sm font-medium text-gray-900">描述下想在这期Coding Lounge里解决什么问题？（至少 80字，我们会根据回答分配合适的mentor。举个例子，如果是career planning，请描述更具体一点，比方说是关于graduate school的问题还是研究方向，etc) *</label>
                                <textarea className={`${errors.description && `error`} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-[13vh]`}
                                {...register("description", {
                                    required: true,
                                    validate: (value) => value.length >= 80
                                    })}/>
                                {errors.description && <h1 className='mt-2 text-sm font-medium text-red-700'>Please enter at least 80 words!</h1>}
                            </div>

                            <div className="mb-5 gap-7">
                                <label id="wechatGroup" className="mb-3 block text-sm font-medium text-gray-900">有加Coding Lounge Q&A 微信群吗? *</label>
                                <div className='mb-3'>
                                    <img src={codingLoungeGroup} height={180} width={180} />
                                </div>
                                <div className="flex items-center h-5">
                                    <input id="wechatGroup" type="radio" value="yes" className="w-4 h-4"
                                    {...register("wechatGroup", {
                                        required: true,
                                        })}/>
                                    <label className="ml-2 text-sm font-medium text-gray-900">有! </label>                                    
                                </div>
                                <div className='flex'>
                                    {errors.wechatGroup && <h1 className='mt-2 text-sm font-medium text-red-700'>Please select this field!</h1>}
                                </div>
                            </div>

                            <div className="mb-6">
                                <label id="otherQuestions" className="block mb-2 text-sm font-medium text-gray-900">Any questions? Any concerns?</label>
                                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                {...register("otherQuestions")}/>
                            </div>
                            <div className='w-full flex justify-center'>
                                <button type="submit" className="w-[10rem] text-white bg-[#0069ff] hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                    // onClick={() => setScheduled(true)}
                                    >
                                    <span className='font-bold'>Schedule Event</span>
                                </button>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
    )
}

export default RegisterPage