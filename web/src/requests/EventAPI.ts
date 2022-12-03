import { getEventInfo } from './Event-API/get-event-info';
import { getAllEvents } from './Event-API/get-all-events';
import { createEvent } from './Event-API/create-event';
import { registerEvent } from './Event-API/register-event';
import { getRegistrationInfo } from './Event-API/get-registration-info';
import { getSingleRegistrationInfo } from './Event-API/get-single-registration-info';

const EventAPI = {
    getEventInfo,
    getAllEvents,
    createEvent,
    registerEvent,
    getRegistrationInfo,
    getSingleRegistrationInfo,
};

export default EventAPI;
