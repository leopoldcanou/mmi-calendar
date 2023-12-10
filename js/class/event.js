

class Event {
    #id;
    #summary;
    #description;
    #start;
    #end;
    #location;

    constructor(id, summary, description, start, end, location) {
        this.#id = id;
        this.#summary = summary;
        this.#description = description;
        this.#start = new Date(start);
        this.#end = new Date(end);
        this.#location = location;
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

    

    toObject() {
        return {
            id: this.#id,
            title: this.#summary,
            body: this.#description,
            start: this.#start,
            end: this.#end,
            location: this.#location 
        }
    }
}

export {Event};