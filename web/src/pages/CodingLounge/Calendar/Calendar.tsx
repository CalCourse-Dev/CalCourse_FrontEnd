import React, { useState, useEffect } from 'react'
import {FiChevronLeft, FiChevronRight} from "react-icons/fi"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, isThisMonth, isThisYear, isFuture, isSameDay } from "date-fns";
import "./Calendar.css"

export interface calendarProps {
    dateConfirmed: null | Date,
    availableDate: Date,
    setSelectedDate: (date: Date) => void
}

const Calendar = (props: calendarProps) => {

    const availableDate = props.availableDate;
    const availableDay = parseInt(format(availableDate, "d"))

    const [navDate, setNavDate] = useState(availableDate);
    // const [currentDay, setCurrentDay] = useState(parseInt(format(new Date(), "d")));
    const currentDate = new Date();
    const currentDay = parseInt(format(currentDate, "d"))
    
    const [selectedDay, setSelectedDay] = useState(props.dateConfirmed ? parseInt(format(props.dateConfirmed, "d")) : 0);
    const [firstRowDays, setFirstRowDays] = useState(0);
    const [endDay, setEndDay] = useState(0);

    const dateFormat = "MMMM yyyy";
    const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

    const nextMonth = () => {
        setNavDate(addMonths(navDate, 1));
    }

    const prevMonth = () => {
        setNavDate(subMonths(navDate, 1));
    }

    const updateFirstRowDays = (monthStart: Date) => {
        setFirstRowDays((7 - weekdays.indexOf(format(monthStart, "E").toUpperCase())) % 7)
    }

    const passSelectedDate = (day: number) => {
        if (day === currentDay) {
            props.setSelectedDate(navDate)
        } else {
            let year = parseInt(format(navDate, "yyyy"))
            let month = parseInt(format(navDate, "L"))
            let date = new Date(year, (month + 11) % 12, day)
            props.setSelectedDate(date)
        }
    }

    const updateAllInfo = () => {
        let monthStart = startOfMonth(navDate);
        updateFirstRowDays(monthStart);
        let endDay = endOfMonth(monthStart);
        setEndDay(parseInt(format(endDay, "d")));
    }


    const isAvailable = (day: number) => {
        let year = parseInt(format(navDate, "yyyy"));
        let month = parseInt(format(navDate, "L"));
        let date = new Date(year, (month + 11) % 12, day);
        return (isSameDay(date, currentDate) || isFuture(date)) && isSameDay(date, availableDate);
    }

    useEffect(() => {
        updateAllInfo()
        console.log("current date", navDate);
        // console.log("firstRowDays", firstRowDays);
        // console.log("endDay", endDay)
        console.log("current day", currentDay)
    }, [navDate])

  return (
    <div className='w-auto h-auto flex flex-col'>
        <div className='w-full flex justify-between p-2 pl-3 pr-3 mb-1 items-center'>
            <span className='text-[#262626] text-[1rem]'>{ format(navDate, dateFormat) }</span>
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
                                    className={`w-[3rem] h-[3rem] text-lg sm:w-[2.5rem] sm:h-[2.5rem] sm:text-md`}>
                            </button>
                        ))
                    }
                    {
                        [...new Array<number>(firstRowDays)].map((_, day) => day + 1).map((day, index) => (
                            <button key={`weekday-first-row-${index}`}
                                    onClick={() => { 
                                        if (day === availableDay && isThisMonth(navDate) && isThisYear(navDate)) {
                                            setSelectedDay(day)
                                            passSelectedDate(day)
                                        }
                                    }
                                    } 
                                    disabled = {!(day === availableDay && isThisMonth(navDate) && isThisYear(navDate))}
                                    className={`w-[3rem] h-[3rem] text-lg sm:w-[2.35rem] sm:h-[2.35rem] sm:text-md
                                            ${isAvailable(day) && (day === selectedDay ? "selected" : "available")}`}>
                                        {day}
                                        {day === currentDay && isThisMonth(navDate) && isThisYear(navDate) && <p className={`h-[1.5rem] absolute w-full sm:w-[2.35rem] bottom-[-1.1rem] text-center text-3xl sm:text-2xl
                                                                    ${day !== availableDay && "text-[#828282]"}
                                                                    ${day !== selectedDay && day === availableDay && "text-[#0069ff]"}
                                                                    ${day === selectedDay && day === availableDay && "text-white"}`}>.</p>}
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
                            key={`weekday-in-month-${index}`} 
                            onClick={() => { 
                                setSelectedDay(day)
                                passSelectedDate(day)
                            }}>
                            <button
                                disabled = {!isAvailable(day)}
                                className={`w-[3rem] h-[3rem] text-lg sm:w-[2.35rem] sm:h-[2.35rem] sm:text-md
                                            ${isAvailable(day) && (day === selectedDay ? "selected" : "available")}`}>
                                    {day}
                                    {day === currentDay && isThisMonth(navDate) && isThisYear(navDate) && <p className={`h-[1.5rem] absolute w-full sm:w-[2.35rem] bottom-[-1.1rem] text-center text-3xl sm:text-2xl
                                                                    ${day !== availableDay && "text-[#828282]"}
                                                                    ${day !== selectedDay && day === availableDay && "text-[#0069ff]"}
                                                                    ${day === selectedDay && day === availableDay && "text-white"}`}>.</p>}
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Calendar