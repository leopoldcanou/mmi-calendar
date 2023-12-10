import {Event} from './event.js';

class EventManager {
    #id;
    #name;
    #description;
    #events;

    constructor(id, name, description) {
        this.#id = id;
        this.#name = name;
        this.#description = description;
        this.#events = [];
    }

    addEvents(events) {
        for(let uid in events) {
            let event = events[uid];
            this.#events.push(new Event(uid, event.summary, event.description, event.start, event.end, event.location));
        }
    }   

    toObject() {
        return this.#events.map(event => {
            let obj = event.toObject();
            obj.calendarId = this.#id;
            return obj;
        });
    }
}

export {EventManager};