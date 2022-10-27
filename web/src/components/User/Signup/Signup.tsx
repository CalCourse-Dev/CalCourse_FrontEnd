import React, { useState } from 'react'
import { MdAccessTimeFilled } from "react-icons/md"
import { GiEarthAmerica } from "react-icons/gi"
import { format } from "date-fns";
import Calendar from './Calendar/Calendar'
import "./Signup.css";

const Signup = () => {

    const timeData = ["9:00am", "9:30am", "10:00am", "10:30am", "11:00am", "11:30am", "12:00pm", "12:30pm", "1:00pm"]
    const [selectedDate, _setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("")
    const [lastSelectedTime, setLastSelectedTime] = useState("")

    const setSelectedDate = (date:any) => {
        _setSelectedDate(date);
        setSelectedTime("");
        setLastSelectedTime("");
    }

  return (
    <div className="w-[100vw] h-[100vh] lg:h-[100vh] md:h-auto bg-[#fbfcfd] flex justify-center items-start tall:items-center">
      <div className="w-auto h-[40rem] bg-white border-[#e8e8e8] border-[1px] rounded-lg shadow-md flex lg:flex-col lg:h-auto md:flex-col md:h-auto">
        <div className='w-[27rem] md:w-[100%] lg:w-[46rem] h-full xl:border-r-[1.2px] p-7 font-semibold flex flex-col lg:items-center lg:border-b-[1.2px] md:items-center md:border-b-[1.2px]'>
            <span className='text-[#767676] text-lg'>Hans Mao</span>
            <h1 className='text-3xl text-[#1d1d1d]'>30 Minute Meeting</h1>
            <div className='flex items-center gap-2 mt-5 text-[#737373]'>
                <MdAccessTimeFilled size={28}/>
                <span className='text-lg'>30 min</span>
            </div>
        </div>
        <div className='flex justify-center lg:w-auto md:flex-col md:items-center'>
          <div className='w-[27rem] h-full p-7 flex flex-col items-center md:w-[100%]'>
              <span className='text-xl font-semibold w-full mb-3'>Select a Date & Time</span>
              <Calendar setSelectedDate={setSelectedDate}/>
              <div className='flex flex-col w-full mt-5'>
                  <span className='font-bold'>Time Zone</span>
                  <div className='p-2 flex gap-3 items-center text-[#1a1a1a]'>
                      <GiEarthAmerica />
                      <span>Pacific Time - US & Canada</span>
                  </div>
              </div>
          </div>
          {
              selectedDate !== null && (
                  <div className='flex flex-col w-[19rem] md:w-[100%] pt-[4rem] h-full lg:h-[35rem] md:h-[26rem] md:pt-[0rem]'>
                      <span className='mb-5 text-[1.05rem] md:text-[1.5rem] md:text-center sm:text-center'>{format(selectedDate, "EEEE, LLLL d")}</span>
                      <div className='flex flex-col gap-2 overflow-y-auto overflow-x-hidden md:items-center'>
                          {timeData.map((time, index) => selectedTime !== time ? (
                              <div className='w-[16rem] flex justify-between'>
                                  <button key={ `time-first-row-time-${index}`}
                                      onClick = {() => { 
                                          setLastSelectedTime(selectedTime);
                                          setSelectedTime(time) 
                                      }}
                                      className={`w-[16rem] pt-3.5 pb-3.5 border-[1.3px] border-[#89b5ff] rounded-md flex justify-center items-center hover:border-blue-500 hover:border-[1.6px]
                                                  ${lastSelectedTime === time && 'expand-origin-left'}`}>
                                      <span className='text-[#0069ff] font-bold'>{time}</span>
                                  </button>
                                  <button key={ `time-first-row-confirm-${index}`}
                                      className={`pt-3.5 pb-3.5 border-[1.3px] bg-[#0069ff] rounded-md flex justify-center items-center
                                                  ${lastSelectedTime != time && 'hidden'}
                                                  ${lastSelectedTime == time && 'w-[0rem] shrink-confirm border-none'}`}>
                                      <span className='text-white font-bold'>Confirm</span>
                                  </button>
                              </div>
                          ) : (
                              <div className='w-[16rem] flex justify-between'>
                                  <div key={ `time-rest-rows-time-${index}`}
                                      className={`w-[7.85rem] pt-3.5 pb-3.5 border-[1.3px] bg-[#696969] rounded-md flex justify-center items-center shrink-origin-left`}>
                                      <span className='text-white font-bold'>{time}</span>
                                  </div>
                                  <button key={ `time-rest-rows-confirm-${index}`}
                                      className={`w-[7.85rem] pt-3.5 pb-3.5 border-[1.3px] bg-[#0069ff] rounded-md flex justify-center items-center expand-origin-right`}>
                                      <span className='text-white font-bold'>Confirm</span>
                                  </button>
                              </div>
                          ))}
                      </div>
                  </div>
              )
          }
        </div>
      </div>
    </div>
  );
};
export default Signup;
