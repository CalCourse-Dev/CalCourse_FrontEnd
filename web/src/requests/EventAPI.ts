import { getEventInfo } from './Event-API/get-event-info';
import { getAllEvents } from './Event-API/get-all-events';
import { createEvent } from './Event-API/create-event';
import { registerEvent } from './Event-API/register-event';

const EventAPI = {
    getEventInfo,
    getAllEvents,
    createEvent,
    registerEvent
};

export default EventAPI;
