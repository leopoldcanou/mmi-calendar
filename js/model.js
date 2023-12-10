
import ical from 'ical';
import { EventManager } from './class/event-manager';


let M = {
    events: {
        mmi1: null,
        mmi2: null,
        mmi3: null
    }
 }

M.getEvents = function(annee) {
    if ( annee in M.events ) {
        return M.events[annee].toObject();
    }
    return null;
}

M.init = async function() {
    let data = await fetch('./data/mmi1.ics');
    data = await data.text();
    data = ical.parseICS(data);
    M.events.mmi1 = new EventManager('mmi1', 'MMI 1', 'Agenda des MMI 1');
    M.events.mmi1.addEvents(data);
}

export { M };