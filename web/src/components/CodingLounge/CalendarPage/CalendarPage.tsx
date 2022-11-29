import React, { useState } from 'react'
import { MdAccessTimeFilled, MdEmail, MdLocationOn} from "react-icons/md"
import { GiEarthAmerica } from "react-icons/gi"
import Calendar from '../Calendar/Calendar'
import { format, parse, addMinutes } from "date-fns";
import "./CalendarPage.css";

interface calendarPageProps{
    info: {
        contact: string,
        description: string,
        duration: string,
        location: string,
        time_zone: string
    },
    availableDate: null | Date,
    timeSlots: string[][],
    setConfirm: (status: boolean) => void,
    setConfirmDate: (date: string) => void,
    setConfirmTimeKey: (timeKey: string) => void
}

const CalendarPage = (props: calendarPageProps) => {

    const [selectedDate, _setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [lastSelectedTime, setLastSelectedTime] = useState("");
    const {info, availableDate, timeSlots, setConfirm, setConfirmDate, setConfirmTimeKey} = props;
    const leftPos = info.contact.indexOf( "(" );
    const rightPos = info.contact.indexOf( ")" );
    const name = info.contact.slice(0, leftPos);
    const email = info.contact.slice(leftPos+1, rightPos);

    const setSelectedDate = (date:any) => {
        _setSelectedDate(date);
        setSelectedTime("");
        setLastSelectedTime("");
    }

    const calculateDate = () => {
        if (selectedDate) {
            let startTime = parse(selectedTime, "hh:mma", selectedDate);
            let endTime = addMinutes(startTime, 30);
            return selectedTime + format(endTime, ' - h:mmaaa, EEEE, LLLL d, yyyy')
        }
        return ""
    }

    return (
        <div className="w-auto h-[40rem] bg-white border-[#e8e8e8] border-[1px] rounded-lg shadow-md flex lg:flex-col lg:h-auto md:flex-col md:h-auto">
            <div className="w-[27rem] md:w-[100%] lg:w-[46rem] h-full xl:border-r-[1.2px] p-7 font-semibold flex flex-col lg:items-center lg:border-b-[1.2px] md:items-center md:border-b-[1.2px]">
                <span className="text-[#767676] text-lg text-ellipsis overflow-hidden">{name}</span>
                <h1 className="text-2xl text-[#1d1d1d] text-ellipsis overflow-hidden">{info.description}</h1>
                <div className="flex items-center gap-2 mt-5 text-[#737373]">
                    <MdAccessTimeFilled size={28} />
                    <span className="text-lg">{info.duration} min</span>
                </div>
                <div className="flex items-center gap-2 mt-3.5 text-[#737373]">
                    <MdEmail size={28} />
                    <span className="text-lg text-ellipsis overflow-hidden">{email}</span>
                </div>
                <div className="flex items-center gap-2 mt-3.5 text-[#737373]">
                    <MdLocationOn size={28} />
                    <span className="text-lg">{info.location.includes("http") ? "Online" : "In person"}</span>
                </div>
            </div>
            <div className="flex justify-center lg:w-auto md:flex-col md:items-center">
            <div className="w-[27rem] h-full p-7 flex flex-col items-center md:w-[100%] sm:p-3">
                <span className="text-xl font-semibold w-full mb-3">
                Select a Date & Time
                </span>
                {
                    availableDate != null && (
                        <Calendar
                            availableDate={availableDate}
                            setSelectedDate={setSelectedDate}
                            dateConfirmed={selectedDate}
                        />
                    )
                }
                <div className="flex flex-col w-full mt-5">
                <span className="font-bold">Time Zone</span>
                <div className="p-2 flex gap-3 items-center text-[#1a1a1a]">
                    <GiEarthAmerica />
                    <span>{info.time_zone}</span>
                </div>
                </div>
            </div>
            {selectedDate !== null && (
                <div className="flex flex-col w-[18rem] md:w-[100%] pt-[4rem] h-full lg:h-[35rem] md:h-[26rem] md:pt-[0rem]">
                <span className="mb-5 text-[1.05rem] md:text-[1.5rem] md:text-center sm:text-center">
                    {format(selectedDate, "EEEE, LLLL d")}
                </span>
                <div className="flex flex-col gap-2 overflow-y-auto overflow-x-hidden md:items-center text-[1rem]">
                    {timeSlots.map((time, index) =>
                    selectedTime !== time[1] ? (
                        <div className="w-[15rem] flex justify-between">
                        <button
                            key={`time-first-row-time-${index}`}
                            onClick={() => {
                                setLastSelectedTime(selectedTime);
                                setSelectedTime(time[1]);
                            }}
                            className={`w-[15rem] pt-3.5 pb-3.5 border-[1.3px] border-[#89b5ff] rounded-md flex justify-center items-center hover:border-blue-500 hover:border-[1.6px]
                                                            ${
                                                                lastSelectedTime ===
                                                                time[1] &&
                                                                "expand-origin-left"
                                                            }`}
                        >
                            <span className="text-[#0069ff] font-bold">
                            {time[1]}
                            </span>
                        </button>
                        <button
                            key={`time-first-row-confirm-${index}`}
                            className={`pt-3.5 pb-3.5 border-[1.3px] bg-[#0069ff] rounded-md flex justify-center items-center
                                                            ${
                                                                lastSelectedTime !==
                                                                time[1] && "hidden"
                                                            }
                                                            ${
                                                                lastSelectedTime ===
                                                                time[1] &&
                                                                "w-[0rem] shrink-confirm border-none"
                                                            }`}
                        >
                            <span className="text-white font-bold">Confirm</span>
                        </button>
                        </div>
                    ) : (
                        <div className="w-[15rem] flex justify-between">
                        <div
                            key={`time-rest-rows-time-${index}`}
                            className={`w-[7.5rem] pt-3.5 pb-3.5 border-[1.3px] bg-[#696969] rounded-md flex justify-center items-center shrink-origin-left`}
                        >
                            <span className="text-white font-bold">{time[1]}</span>
                        </div>
                        <button
                            key={`time-rest-rows-confirm-${index}`}
                            className={`w-[7.5rem] pt-3.5 pb-3.5 border-[1.3px] bg-[#0069ff] rounded-md flex justify-center items-center expand-origin-right`}
                            onClick={() => {
                                setConfirm(true);
                                setConfirmDate(calculateDate());
                                setConfirmTimeKey(time[0])
                                setLastSelectedTime("");
                                setSelectedTime("");
                            }}
                        >
                            <span className="text-white font-bold">Confirm</span>
                        </button>
                        </div>
                    )
                    )}
                </div>
                </div>
            )}
            </div>
        </div>
    )
}

export default CalendarPage