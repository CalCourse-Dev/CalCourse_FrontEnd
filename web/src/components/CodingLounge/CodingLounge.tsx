import React, { useEffect, useState } from 'react'
import EventAPI from "../../requests/EventAPI";
import CalendarPage from './CalendarPage/CalendarPage'
import RegisterPage from './RegisterPage/RegisterPage'
import SuccessPage from './SuccessPage/SuccessPage'
import "./CodingLounge.css";

const CodingLounge = () => {
    
    const [confirm, setConfirm] = useState(false)
    const [confirmDate, setConfirmDate] = useState("")
    const [confirmTimeKey, setConfirmTimeKey] = useState("")

    const [eventID, setEventID] = useState("Coding Lounge_20221220");
    const [info, setInfo] = useState({
      contact: '',
      description: '',
      duration: '',
      location: '',
      time_zone: ''
    });
    const [availableDate, setAvailableDate] = useState<null | Date>(null);
    const [timeSlots, setTimeSlots] = useState<string[][]>([]);

    const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

    const convertTimeKey = (key: string) => {
        let hour = parseInt(key.slice(0, Math.floor(key.length / 2)), 10)
        let minutes = key.slice(Math.floor(key.length / 2), key.length)
        if (hour < 12) {
          return hour + ":" + minutes + "am"
        } else if (hour == 12) {
          return hour + ":" + minutes + "pm"
        }
        return (hour - 12) + ":" + minutes + "pm"
    }

    const processTimeSlots = (timeSlots: any) => {
        let slots: string[][] = [];
        Object.keys(timeSlots).forEach(function(key) {
            var remainingSlots = timeSlots[key];
            if (parseInt(remainingSlots) > 0) {
                slots.push([key, convertTimeKey(key)])
            }
        })
        return slots;
    }

    const processAvailableDateFromID = (dateID: string) => {
        let year = parseInt(dateID.slice(0, 4))
        let month = parseInt(dateID.slice(4, 6))
        let day = parseInt(dateID.slice(6, 8))
        let date = new Date(year, (month + 11) % 12, day)
        return date
    }

    const responseHandler = (data: any) => {
        console.log(data)
        setInfo({
          ...info,
          contact: data.contact,
          description: data.description,
          duration: data.duration,
          location: data.location,
          time_zone: data.time_zone
        })
        setTimeSlots(processTimeSlots(data.slots))
        setAvailableDate(processAvailableDateFromID(eventID.slice(-8)))
    }

    const errorHandler = (error: any) => {
        console.log(error)
    }

    useEffect(() => {
      EventAPI.getEventInfo(eventID, responseHandler, errorHandler)
    }, []);

    return (
      <div className="w-[100vw] h-[100vh] lg:h-auto md:h-auto bg-[#fbfcfd] flex justify-center items-start tall:items-center">
        {!confirm &&
          <CalendarPage info={info} availableDate={availableDate} timeSlots={timeSlots} setConfirm={setConfirm} setConfirmDate={setConfirmDate} setConfirmTimeKey={setConfirmTimeKey}></CalendarPage>
        }
        {confirm && !isSubmitSuccessful &&
          <RegisterPage info={info} eventID={eventID} confirmDate={confirmDate} confirmTimeKey={confirmTimeKey} setConfirm={setConfirm} setIsSubmitSuccessful={setIsSubmitSuccessful}></RegisterPage>
        }
        {isSubmitSuccessful &&
          <SuccessPage info={info} confirmDate={confirmDate}></SuccessPage>
        }
      </div>
    );
};

export default CodingLounge;
