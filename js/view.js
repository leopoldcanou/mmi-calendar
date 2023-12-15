import Calendar from "@toast-ui/calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";

let V = {};

V.uicalendar = new Calendar("#calendar", {
  defaultView: "week", // vue par défaut
  isReadOnly: true, // on ne peut pas modifier les événements
  usageStatistics: false, // colecte des données
  useDetailPopup: true, // affiche les détails d'un événement dans une popup
  week: {
    startDayOfWeek: 1, // premier jour de la semaine
    dayNames: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"], // nom des jours
    workweek: true, // affiche uniquement les jours de la semaine
    hourStart: 8, // heure de début
    hourEnd: 20, // heure de fin
    taskView: false, // affiche les tâches
    eventView: ["time"], // affiche les événements
  },
  month: {
    startDayOfWeek: 1, // premier jour de la semaine
    dayNames: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"], // nom des jours
    workweek: true, // affiche uniquement les jours de la semaine
    hourStart: 8, // heure de début
    hourEnd: 20, // heure de fin
    taskView: false, // affiche les tâches
    eventView: ["time"], // affiche les événements
  },
  template: {
    // permet de modifier l'affichage des événements
    time: function (event) {
      return `<span style="color: white;">${event.title}</span>`;
    },
  },
});

export { V };
