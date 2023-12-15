class Event {
  #id;
  #summary;
  #description;
  #start;
  #end;
  #location;
  #groups;
  #year;
  #backgroundColor = {
    mmi1: {
      CM: "#FDCA9B",
      TD: "#FCAB5F",
      TP: "#FB8B23",
      SAE: "#F07605",
    },
    mmi2: {
      CM: "#FE9AC9",
      TD: "#FD499D",
      TP: "#F20272",
      SAE: "#B60256",
    },
    mmi3: {
      CM: "#ADF7FF",
      TD: "#47EDFF",
      TP: "#00CAE0",
      SAE: "#00818F",
    },
  };

  constructor(id, summary, description, start, end, location, year) {
    this.#id = id;
    this.#summary = summary.slice(0, summary.lastIndexOf(","));
    this.#description = description;
    this.#start = new Date(start);
    this.#end = new Date(end);
    this.#location = location;
    this.#year = year;

    this.#groups = summary.slice(summary.lastIndexOf(",") + 1);
    this.#groups = this.#groups.split(".");
    this.#groups = this.#groups.map((gr) => gr.replace(/\s/g, ""));
  }

  get id() {
    return this.#id;
  }

  get summary() {
    return this.#summary;
  }

  get description() {
    return this.#description;
  }

  get start() {
    return this.#start;
  }

  get end() {
    return this.#end;
  }

  get location() {
    return this.#location;
  }

  get groups() {
    return this.#groups.map((gr) => gr); // retourne une copie du tableau
  }

  get color() {
    const colorMap = {
      TP: this.#backgroundColor[this.#year].TP,
      TD: this.#backgroundColor[this.#year].TD,
      CM: this.#backgroundColor[this.#year].CM,
      SAÉ: this.#backgroundColor[this.#year].SAE,
    };

    for (let words in colorMap) {
      if (this.#summary.includes(words)) {
        return colorMap[words];
      }
    }
    return this.#backgroundColor[this.#year].SAE;
  }

  // retourne un objet contenant les informations de l'événement
  // dans un format compatible avec Toast UI Calendar (voir https://nhn.github.io/tui.calendar/latest/EventObject)
  toObject() {
    return {
      id: this.#id,
      title: this.#summary,
      body: this.#description,
      start: this.#start,
      end: this.#end,
      location: this.#location,
      backgroundColor: this.color,
      borderColor: this.color,
      group: this.#groups,
    };
  }
}

export { Event };
