import React, { useState, useEffect } from 'react'
import {FiChevronLeft, FiChevronRight} from "react-icons/fi"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, isThisMonth } from "date-fns";
import "./Calendar.css"
import { calendarProps } from '../../../utils/interfaces';
/** This is the calendar component for the event signup page */ 


// FIXME: We put all inerfaces at utils/interfaces.ts
// export interface calendarProps {
//     setSelectedDate: (date: Date) => void
// }

const Calendar = (props: calendarProps) => {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentDay, setCurrentDay] = useState(0);
    const [selectedDay, setSelectedDay] = useState(0);
    const [firstRowDays, setFirstRowDays] = useState(0);
    const [endDay, setEndDay] = useState(0);

    const dateFormat = "MMMM yyyy";
    const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

    const nextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    }

    const prevMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    }

    const updateFirstRowDays = (monthStart: Date) => {
        setFirstRowDays((7 - weekdays.indexOf(format(monthStart, "E").toUpperCase())) % 7)
    }

    const passSelectedDate = (day: number) => {
        if (day == currentDay) {
            props.setSelectedDate(currentDate)
        } else {
            let year = parseInt(format(currentDate, "yyyy"))
            let month = parseInt(format(currentDate, "L"))
            let date = new Date(year, month, day)
            props.setSelectedDate(date)
        }
    }

    const updateAllInfo = () => {
        let monthStart = startOfMonth(currentDate);
        updateFirstRowDays(monthStart);
        let endDay = endOfMonth(monthStart);
        setEndDay(parseInt(format(endDay, "d")));
        setSelectedDay(0)
        if (isThisMonth(currentDate)) {
            setCurrentDay(parseInt(format(currentDate, "d")))
        } else {
            setCurrentDay(32)
        }
    }

    useEffect(() => {
        updateAllInfo()
        // console.log("current date", currentDate);
        // console.log("firstRowDays", firstRowDays);
        // console.log("endDay", endDay)
        // console.log("current day", currentDay)
    }, [currentDate])

  return (
    <div className='w-auto h-auto flex flex-col'>
        <div className='w-full flex justify-between p-2 pl-3 pr-3 mb-1 items-center'>
            <span className='text-[#262626]'>{ format(currentDate, dateFormat) }</span>
            <div className='flex gap-2'>
                <button className='hover:bg-[#dfe8ff] w-[2.7rem] h-[2.7rem] rounded-full flex justify-center items-center text-[#2279ff]' onClick={prevMonth}>
                    <FiChevronLeft size={22}/>
                </button>
                <button className='hover:bg-[#dfe8ff] w-[2.7rem] h-[2.7rem] rounded-full flex justify-center items-center text-[#2279ff]' onClick={nextMonth}>
                    <FiChevronRight size={22}/>
                </button>
            </div>
        </div>
        <div className='grid grid-rows gap-1.5'>
            <div className='grid grid-cols-7 text-sm gap-1.5'>
                {
                    weekdays.map((day, index) => (
                        <button key={`weekday-${index}`} className='w-[3rem] h-[3rem] sm:w-[2.5rem] sm:h-[2.5rem]'>{day}</button>
                    ))
                }
            </div>
            {
                firstRowDays > 0 && 
                (
                    <div className='grid grid-cols-7 justify-end gap-1.5 text-[#828282] font-[500]'>
                    {
                        [...new Array<number>(7 - firstRowDays)].map((_, day) => day + 1).map((day, index) => (
                            <button key={`weekday-block-${index}`}
                                    disabled = {day < currentDay}
                                    className={`w-[3rem] h-[3rem] text-lg sm:w-[2.5rem] sm:h-[2.5rem] sm:text-md
                                                ${day >= currentDay && "available"}
                                                ${day == selectedDay && "selected"}`}>
                            </button>
                        ))
                    }
                    {
                        [...new Array<number>(firstRowDays)].map((_, day) => day + 1).map((day, index) => (
                            <button key={`weekday-${index}`}
                                    onClick={() => { 
                                        setSelectedDay(day)
                                        passSelectedDate(day)
                                    }
                                    } 
                                    disabled = {day < currentDay}
                                    className={`w-[3rem] h-[3rem] text-lg sm:w-[2.5rem] sm:h-[2.5rem] sm:text-md
                                                ${day >= currentDay && "available"}
                                                ${day == selectedDay && "selected"}`}>
                                        {day}
                            </button>
                        ))
                    }
                    </div> 
                )
            }
            <div className='grid grid-cols-7 gap-1.5 text-[#828282] font-[500]'>
                {
                    [...new Array<number>(endDay - firstRowDays)].map((_, day) => day + firstRowDays + 1).map((day, index) => (
                        <div className='relative' 
                            onClick={() => { 
                                setSelectedDay(day)
                                passSelectedDate(day)
                            }}>
                            <button key={`weekday-in-month-${index}`} 
                                disabled = {day < currentDay}
                                className={`w-[3rem] h-[3rem] text-lg sm:w-[2.5rem] sm:h-[2.5rem] sm:text-md
                                            ${day >= currentDay && day != selectedDay && "available"}
                                            ${day == selectedDay && "selected"}`}>
                                    {day}
                            </button>
                            {day == currentDay && <span className={`absolute w-full left-0 bottom-0.5 sm:bottom-0 text-center text-3xl
                                                                    ${day != selectedDay && "text-[#0069ff]"}
                                                                    ${day == selectedDay && "text-white"}`}>.</span>}
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Calendar