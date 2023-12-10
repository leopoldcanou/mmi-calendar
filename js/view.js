import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

let V = {};

V.uicalendar = new Calendar('#calendar', {
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
    time: function(event) {
      return `<span style="color: white;">${event.title}</span>`;
    }
  },
 
 
});

export { V };

/*
    On notera que si tout ce qui est dans ce fichier concerne la Vue, seul ce qui est dans V est exporté (et donc accessible depuis l'extérieur).
    C'est une façon de faire qui permet de garder privé tout ce qui n'est pas dans V.
    Donc il faut voir V comme la partie publique de la vue et le reste comme la partie privée.
*/