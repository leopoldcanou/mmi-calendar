
import ical from 'ical';
import { EventManager } from './class/event-manager';


let content = await fetch('./data/mmi1.ics');
content = await content.text();

const data = ical.parseICS(content);

//console.log(data);

export let mmi1 = new EventManager('MMI1', 'MMI1', 'Calendrier des cours MMI1');
mmi1.addEvents(data);
console.log(mmi1.toObject());