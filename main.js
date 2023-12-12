import { M } from "./js/model.js";
import { V } from "./js/view.js";

window.M = M; // permet d'accéder a M dans la console
/*
   Ce fichier correspond au contrôleur de l'application. Il est chargé de faire le lien entre le modèle et la vue.
   Le modèle et la vue sont définis dans les fichiers js/model.js et js/view.js et importés (M et V, parties "publiques") dans ce fichier.
   Le modèle contient les données (les événements des 3 années de MMI).
   La vue contient tout ce qui est propre à l'interface et en particulier le composant Toast UI Calendar.
   Le principe sera toujours le même : le contrôleur va récupérer les données du modèle et les passer à la vue.
   Toute opération de filtrage des données devra être définie dans le modèle.
   Et en fonction des actions de l'utilisateur, le contrôleur pourra demander au modèle de lui retourner des données filtrées
   pour ensuite les passer à la vue pour affichage.

   Exception : Afficher 1, 2 ou les 3 années de formation sans autre filtrage peut être géré uniquement au niveau de la vue.
*/

// loadind data (and wait for it !)
await M.init();

// sample events for testing
let edt = [
  {
    id: "1",
    calendarId: "1",
    title: "my event",
    category: "time",
    start: "2023-12-11T08:30:00",
    end: "2023-12-11T10:30:00",
  },
  {
    id: "2",
    calendarId: "1",
    title: "second event",
    category: "time",
    start: "2023-12-13T14:00:00",
    end: "2023-12-13T15:30:00",
  },
];

// creating events in the calendar
// V.uicalendar.createEvents(edt);
function mediaQuery() {
  let day = document.getElementById("day");
  let week = document.getElementById("week");
  if (window.matchMedia("(min-width: 450px)").matches) {
    /* the view port is at least 450 pixels wide */
    V.uicalendar.changeView("week");
    // add atribute selected to week
    week.setAttribute("selected", "selected");
    day.removeAttribute("selected");
  } else {
    /* the view port is less than 400 pixels wide */
    V.uicalendar.changeView("day");
    // add atribute selected to day
    day.setAttribute("selected", "selected");
    week.removeAttribute("selected");
  }
}
mediaQuery();

addEventListener("resize", (event) => {
  mediaQuery();
});

V.uicalendar.createEvents(M.getEvents("mmi1")); //affiche le calendrier MMI1

V.uicalendar.createEvents(M.getEvents("mmi2")); //affiche le calendrier MMI2

V.uicalendar.createEvents(M.getEvents("mmi3")); //affiche le calendrier MMI3

//change la couleur du calendrier MMI1
// event listener on click on button id day

let day = document.getElementById("today");
day.addEventListener("click", function () {
  V.uicalendar.today();
});

// event listener on click on button id week
let week = document.getElementById("prev");
week.addEventListener("click", function () {
  V.uicalendar.prev();
});

// event listener on click on button id month
let month = document.getElementById("next");
month.addEventListener("click", function () {
  V.uicalendar.next();
});

let display = document.getElementById("display");
display.addEventListener("change", function () {
  let selectedOption = display.value;
  console.log(selectedOption);
  if (selectedOption === "month") {
    V.uicalendar.changeView("month");
  } else if (selectedOption === "week") {
    V.uicalendar.changeView("week");
  } else if (selectedOption === "day") {
    V.uicalendar.changeView("day");
  }
});

// check checkbox mmi1 mmi2 mmi3 and if checked display the calendar
let mmi1 = document.getElementById("mmi1");
mmi1.addEventListener("change", function () {
  if (mmi1.checked) {
    V.uicalendar.setCalendarVisibility("mmi1", true);
  } else {
    V.uicalendar.setCalendarVisibility("mmi1", false);
  }
});

let mmi2 = document.getElementById("mmi2");
mmi2.addEventListener("change", function () {
  if (mmi2.checked) {
    V.uicalendar.setCalendarVisibility("mmi2", true);
  } else {
    V.uicalendar.setCalendarVisibility("mmi2", false);
  }
});

let mmi3 = document.getElementById("mmi3");
mmi3.addEventListener("change", function () {
  if (mmi3.checked) {
    V.uicalendar.setCalendarVisibility("mmi3", true);
  } else {
    V.uicalendar.setCalendarVisibility("mmi3", false);
  }
});

let currentEvents;

function filterEvents(year, group) {
  let events = M.getEvents(year);
  let filteredEvents = events.filter((event) =>
    event.group.toString().includes(group)
  );
  V.uicalendar.clear(); // Clear existing events
  V.uicalendar.createEvents(filteredEvents); // Recreate events based on the filter
  currentEvents = filteredEvents;
}

let data = document.getElementById("group");
data.addEventListener("change", function () {
  let selectedOption = data.options[data.selectedIndex];
  let selectedDataId = selectedOption.getAttribute("data-year");
  let selectedValue = selectedOption.getAttribute("data-group");
  localStorage.setItem("year", selectedDataId);
  localStorage.setItem("group", selectedValue);
  //groupfilters(selectedDataId, selectedValue);
  filterEvents(selectedDataId, selectedValue);
});

function searchEvents(content) {
  console.log(year, group);
  // Divise le contenu en mots-clés distincts
  const keywords = content.trim().toLowerCase().split(" ");

  // Regroupe les événements mmi1, mmi2 et mmi3 dans un seul tableau
  let events;
  if (currentEvents === undefined) {
    events = M.getEvents("mmi1").concat(
      M.getEvents("mmi2"),
      M.getEvents("mmi3")
    );
  } else {
    events = currentEvents;
  }

  // Filtrer les événements pour ceux qui contiennent tous les mots-clés saisis
  let filteredEvents = events.filter((event) =>
    keywords.every(
      (keyword) =>
        event.title.toString().toLowerCase().includes(keyword) ||
        event.location.toString().toLowerCase().includes(keyword)
    )
  );

  console.log(filteredEvents);

  // Effacer les événements existants et mettre à jour le calendrier avec les événements filtrés
  V.uicalendar.clear();
  V.uicalendar.createEvents(filteredEvents);
}

let searchbar = document.getElementById("searchbar");
searchbar.addEventListener("keyup", function () {
  let searchValue = searchbar.value;
  searchEvents(searchValue);
});

let year = localStorage.getItem("year");
let group = localStorage.getItem("group");
