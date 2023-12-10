import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

export const uicalendar = new Calendar('#calendar', {
  defaultView: 'week',
  isReadOnly: true,
  usageStatistics: false,
  useDetailPopup: true,
  week: {
    startDayOfWeek: 1,
    dayNames: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    workweek: true,
    hourStart: 8,
    hourEnd: 20,
    taskView: false,
    eventView: ['time'],
  },
  template: {
    time(event) {
      const { start, body, title } = event;

      return `<span style="color: white;">${title}</span><br><span style="color: white;">${body}</span>`;
    }
  },
 
 
});


let $ = function (selector) {
  return document.querySelector(selector);
}

let today = $('button');
today.addEventListener('click', function () {
  uicalendar.today();
});

let prev = $('#prev');
prev.addEventListener('click', function () {
  uicalendar.prev();
});

let next = $('#next');
next.addEventListener('click', function () {
  uicalendar.next();
});

