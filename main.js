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

let year = localStorage.getItem("year"); // annee sauvegardée
let group = localStorage.getItem("group"); // groupe sauvegardé
let displaystorage = localStorage.getItem("display"); // affichage des events day/week/month
let yearchecked = localStorage.getItem("yearchecked"); // checkbox mmi1 mmi2 mmi3
let currentEvents; // tableau des events actuellement affichés

V.uicalendar.createEvents(M.getEvents("mmi1")); //affiche le calendrier MMI1

V.uicalendar.createEvents(M.getEvents("mmi2")); //affiche le calendrier MMI2

V.uicalendar.createEvents(M.getEvents("mmi3")); //affiche le calendrier MMI3

let day = document.getElementById("today");
day.addEventListener("click", function () {
  V.uicalendar.today(); // affiche la date du jour
});

// event listener on click on button id week
let week = document.getElementById("prev");
week.addEventListener("click", function () {
  V.uicalendar.prev(); // affiche la semaine précédente
});

// event listener on click on button id month
let month = document.getElementById("next");
month.addEventListener("click", function () {
  V.uicalendar.next(); // affiche la semaine suivante
});

let display = document.getElementById("display");
display.addEventListener("change", function () {
  // change la vue du calendrier en fonction de la valeur de l'option
  let selectedOption = display.value;
  console.log(selectedOption);
  if (selectedOption === "month") {
    V.uicalendar.changeView("month");
    localStorage.setItem("display", "month");
  } else if (selectedOption === "week") {
    V.uicalendar.changeView("week");
    localStorage.setItem("display", "week");
  } else if (selectedOption === "day") {
    V.uicalendar.changeView("day");
    localStorage.setItem("display", "day");
  }
});

[mmi1, mmi2, mmi3].forEach(function (element) {
  // event listener on checkbox mmi1 mmi2 mmi3
  element.addEventListener("change", function () {
    if (mmi1.checked && mmi2.checked && mmi3.checked) {
      V.uicalendar.clear();
      V.uicalendar.createEvents(M.getEvents("mmi1"));
      V.uicalendar.createEvents(M.getEvents("mmi2"));
      V.uicalendar.createEvents(M.getEvents("mmi3"));
      localStorage.setItem("yearchecked", ["mmi1", "mmi2", "mmi3"]);
      currentEvents = M.getEvents("mmi1").concat(
        M.getEvents("mmi2"),
        M.getEvents("mmi3")
      );
      searchEvents(searchbar.value);
    } else if (mmi1.checked && mmi2.checked) {
      V.uicalendar.clear();
      V.uicalendar.createEvents(M.getEvents("mmi1"));
      V.uicalendar.createEvents(M.getEvents("mmi2"));
      localStorage.setItem("yearchecked", ["mmi1", "mmi2"]);
      currentEvents = M.getEvents("mmi1").concat(M.getEvents("mmi2"));
      searchEvents(searchbar.value);
    } else if (mmi1.checked && mmi3.checked) {
      V.uicalendar.clear();
      V.uicalendar.createEvents(M.getEvents("mmi1"));
      V.uicalendar.createEvents(M.getEvents("mmi3"));
      localStorage.setItem("yearchecked", ["mmi1", "mmi3"]);
      currentEvents = M.getEvents("mmi1").concat(M.getEvents("mmi3"));
      searchEvents(searchbar.value);
    } else if (mmi2.checked && mmi3.checked) {
      V.uicalendar.clear();
      V.uicalendar.createEvents(M.getEvents("mmi2"));
      V.uicalendar.createEvents(M.getEvents("mmi3"));
      localStorage.setItem("yearchecked", ["mmi2", "mmi3"]);
      currentEvents = M.getEvents("mmi2").concat(M.getEvents("mmi3"));
      searchEvents(searchbar.value);
    } else if (mmi1.checked) {
      V.uicalendar.clear();
      V.uicalendar.createEvents(M.getEvents("mmi1"));
      localStorage.setItem("yearchecked", ["mmi1"]);
      currentEvents = M.getEvents("mmi1");
      searchEvents(searchbar.value);
    } else if (mmi2.checked) {
      V.uicalendar.clear();
      V.uicalendar.createEvents(M.getEvents("mmi2"));
      localStorage.setItem("yearchecked", ["mmi2"]);
      currentEvents = M.getEvents("mmi2");
      searchEvents(searchbar.value);
    } else if (mmi3.checked) {
      V.uicalendar.clear();
      V.uicalendar.createEvents(M.getEvents("mmi3"));
      localStorage.setItem("yearchecked", ["mmi3"]);
      currentEvents = M.getEvents("mmi3");
      searchEvents(searchbar.value);
    }
  });
});

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
  searchEvents(searchbar.value);
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

function saveView() {
  let day = document.getElementById("day");
  let week = document.getElementById("week");
  let month = document.getElementById("month");
  if (displaystorage !== null) {
    V.uicalendar.changeView(displaystorage);
    if (displaystorage === "day") {
      day.setAttribute("selected", "selected");
      week.removeAttribute("selected");
      month.removeAttribute("selected");
    } else if (displaystorage === "week") {
      week.setAttribute("selected", "selected");
      day.removeAttribute("selected");
      month.removeAttribute("selected");
    } else if (displaystorage === "month") {
      month.setAttribute("selected", "selected");
      day.removeAttribute("selected");
      week.removeAttribute("selected");
    }
  } else {
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
}

saveView();

addEventListener("resize", (event) => {
  // lance la fonction si la taille de la fenêtre change
  saveView();
});

function saveFilter() {
  if (year !== null && group !== null) {
    let option = document.querySelector(
      `option[data-year="${year}"][data-group="${group}"]`
    );
    option.setAttribute("selected", "selected");
    filterEvents(year, group);
  }
}

saveFilter();

function classFilter() {
  if (yearchecked !== null) {
    let yearcheckedarray = yearchecked.split(",");
    yearcheckedarray.forEach(function (element) {
      let checkbox = document.getElementById(element);
      checkbox.setAttribute("checked", "checked");
    });
  }
}
classFilter();

// CSS REDUCE EXPAND

let reduce = document.getElementById("reduce");
let expand = document.getElementById("expand");

function Reduce() {
  let sidebar = document.getElementById("nav");
  sidebar.style.display = "none";
  expand.style.display = "block";
  reduce.style.display = "none";
}

// start reduce function on click on reduce button
reduce.addEventListener("click", function () {
  Reduce();
});

function Expand() {
  let sidebar = document.getElementById("nav");
  sidebar.style.display = "block";
  expand.style.display = "none";
  reduce.style.display = "block";
}

// start expand function on click on expand button

expand.addEventListener("click", function () {
  Expand();
});

Expand();
