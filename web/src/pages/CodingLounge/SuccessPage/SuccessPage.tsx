import React from 'react'
import { GiEarthAmerica } from "react-icons/gi"
import { AiTwotoneCalendar } from "react-icons/ai"
import { MdLocationOn } from 'react-icons/md';

interface successPageProps{
    info: {
        contact: string,
        description: string,
        duration: string,
        location: string,
        time_zone: string
    },
    confirmDate: string,
}

const SuccessPage = (props: successPageProps) => {

    const {info, confirmDate} = props;

    return (
        <div className="w-[100vw] h-[100vh] lg:h-[100vh] bg-[#fbfcfd] flex justify-center items-start tall:items-center">
            <div className="w-[50%] lg:w-[70%] md:w-[100%] h-[40rem] lg:h-[30rem] bg-white border-[#e8e8e8] border-[1px] rounded-lg shadow-md flex flex-col md:h-screen">
                <div className="ml-auto mr-auto py-14 items-center">
                <div className='pb-5 mb-5 mx-6 border-b-[1px] text-center'>
                    <p className="text-xl font-semibold mb-2">Confirmed</p>
                    <p className='text-sm text-gray-700 text-ellipsis overflow-hidden'>You are scheduled with {info.contact}!</p>
                </div>

                <div className='pb-5 mb-5 mx-6 border-b-[1px] text-start'>
                    <div className='flex gap-2 mt-3 items-center'>
                        <div className='bg-indigo-600 w-5 h-5 gap-2 rounded-full'></div>
                            <span className="inline-block text-xl font-semibold">{info.duration} Minute Meeting</span>
                        </div>
                        <div className='flex gap-2 mt-3.5 text-[#737373]'>
                            <AiTwotoneCalendar size={25} />
                            <span className='font-semibold'>{confirmDate}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-3.5 text-[#737373]">
                            <MdLocationOn size={28} />
                            <span className="font-semibold">{info.location}</span>
                        </div>
                        <div className='flex gap-2 items-center my-3.5 text-[#737373]'>
                            <GiEarthAmerica size={25} />
                            <span className='font-semibold'>{info.time_zone}</span>
                        </div>
                        <div className='flex gap-2 items-center mt-5'>
                            <p className='font-semibold text-center'>A calendar invitation has been sent to your email address.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuccessPage